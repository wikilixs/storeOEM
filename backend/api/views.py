from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db import transaction
from django.contrib.auth import get_user_model, authenticate
from .models import Cliente, Producto, Clave, Venta, DetalleVenta, Pago
from .serializers import (
    ClienteSerializer, ClienteRegistroSerializer,
    ProductoSerializer, ClaveSerializer,
    VentaSerializer, DetalleVentaSerializer, PagoSerializer
)
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
import jwt
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

def generate_token(user_id, username):
    """Genera un token JWT personalizado"""
    payload = {
        'user_id': user_id,
        'username': username,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

class RegisterView(generics.CreateAPIView):
    queryset = Cliente.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = ClienteRegistroSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        token = generate_token(user.id, user.username)

        return Response({
            "user": ClienteRegistroSerializer(user, context=self.get_serializer_context()).data,
            "message": "Usuario registrado exitosamente",
            "token": token
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = Cliente.objects.get(username=username)
        if not user.check_password(password):
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        
        token = generate_token(user.id, user.username)
        return Response({
            'token': token,
            'user': ClienteSerializer(user).data
        })
    except Cliente.DoesNotExist:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return ClienteRegistroSerializer
        return ClienteSerializer

    def get_queryset(self):
        if not self.request.user.is_staff:
            return Cliente.objects.filter(id=self.request.user.id)
        return Cliente.objects.all()

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
    def get_queryset(self):
        queryset = Producto.objects.all()
        tipo = self.request.query_params.get('tipo', None)
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        return queryset

class ClaveViewSet(viewsets.ModelViewSet):
    queryset = Clave.objects.all()
    serializer_class = ClaveSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_queryset(self):
        queryset = Clave.objects.all()
        estado = self.request.query_params.get('estado', None)
        producto_id = self.request.query_params.get('producto_id', None)
        
        if estado:
            queryset = queryset.filter(estado=estado)
        if producto_id:
            queryset = queryset.filter(producto_id=producto_id)
            
        return queryset

class VentaViewSet(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    # Permitir compra a cualquier usuario logueado (no staff ni admin requerido)
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Venta.objects.all()
        return Venta.objects.filter(cliente=self.request.user)
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        from .models import CodigoCompra
        import json
        from django.utils import timezone
        from io import BytesIO
        from reportlab.lib.pagesizes import letter
        from reportlab.pdfgen import canvas

        if not request.data.get('detalles', []):
            return Response(
                {'error': 'El carrito está vacío'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Crear la venta (sin total, que es read_only en el serializer)
        venta_data = {
            'cliente': request.user.id
        }
        venta_serializer = self.get_serializer(data=venta_data)
        venta_serializer.is_valid(raise_exception=True)
        venta = venta_serializer.save()

        total = 0
        detalles = []
        detalle_json = []

        for detalle in request.data['detalles']:
            producto_id = detalle['producto_id']
            cantidad = detalle.get('cantidad', 1)
            # Buscar una clave disponible
            clave = Clave.objects.filter(
                producto_id=producto_id,
                estado='disponible'
            ).first()
            if not clave:
                transaction.set_rollback(True)
                return Response(
                    {'error': f'No hay claves disponibles para el producto {producto_id}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Crear el detalle de venta
            detalle_venta = DetalleVenta.objects.create(
                venta=venta,
                producto_id=producto_id,
                cantidad=cantidad,
                precio_unitario=clave.producto.precio,
                subtotal=clave.producto.precio * cantidad
            )
            detalles.append(detalle_venta)
            clave.estado = 'vendida'
            clave.save()
            total += clave.producto.precio * cantidad
            detalle_json.append({
                "codproducto": producto_id,
                "cantidad": cantidad,
                "descripcion": clave.producto.nombre,
                "monto": float(clave.producto.precio)
            })

        venta.total = total
        venta.save()

        # Obtener el número incremental de operación
        last_codigo = CodigoCompra.objects.order_by('-id').first()
        codoperacion = (last_codigo.id + 1) if last_codigo else 1

        # Construir el JSON para la API externa
        compra_json = {
            "codigo": venta.id,
            "codoperacion": codoperacion,
            "fecha": timezone.now().strftime("%Y-%m-%d %H:%M:%S"),
            "montototal": float(venta.total),
            "detalle": detalle_json
        }

        # Enviar el JSON a la API externa
        codigo_compra = None
        try:
            response = requests.post(
                "http://192.168.1.105/public/api/invoices",
                data=json.dumps(compra_json),
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                codigo_compra = data.get("codigo_compra")
        except Exception as e:
            logger.error(f"Error enviando a API externa: {e}")

        # Guardar el codigo_compra en la base de datos
        if codigo_compra:
            CodigoCompra.objects.create(
                venta=venta,
                referencia_compra=codigo_compra,
                fecha_creacion=timezone.now()
            )

        # Generar PDF con la información de la compra
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.setFont("Helvetica", 12)
        y = 750
        p.drawString(50, y, f"Fecha: {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}")
        y -= 20
        p.drawString(50, y, f"Número de operación: {codoperacion}")
        y -= 20
        p.drawString(50, y, f"Código de compra: {codigo_compra if codigo_compra else 'N/A'}")
        y -= 30
        p.drawString(50, y, "Detalle de productos:")
        y -= 20
        for d in detalle_json:
            p.drawString(60, y, f"Producto: {d['descripcion']} | Cantidad: {d['cantidad']} | Monto: {d['monto']}")
            y -= 20
        y -= 10
        p.drawString(50, y, f"Total de la compra: {venta.total}")
        p.showPage()
        p.save()
        pdf = buffer.getvalue()
        buffer.close()
        # Aquí podrías guardar el PDF en el sistema de archivos o en la base de datos si lo deseas

        return Response(
            {
                "venta": self.get_serializer(venta).data,
                "codigo_compra": codigo_compra,
                "pdf_base64": pdf.hex()  # O usar base64 si prefieres
            },
            status=status.HTTP_201_CREATED
        )

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        venta_id = request.data.get('venta')
        try:
            venta = Venta.objects.get(id=venta_id)
            # Crear el pago
            pago = Pago.objects.create(
                venta=venta,
                monto=venta.total
            )
            serializer = self.get_serializer(pago)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Venta.DoesNotExist:
            return Response(
                {'error': 'Venta no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'])
    def procesar_pago_api1(self, request, pk=None):
        return self._procesar_pago(request, pk, api_numero=1)

    @action(detail=True, methods=['post'])
    def procesar_pago_api2(self, request, pk=None):
        return self._procesar_pago(request, pk, api_numero=2)

    def _procesar_pago(self, request, pk, api_numero):
        pago = self.get_object()
        
        try:
            # Preparar el payload para la API externa
            payload = pago.generar_payload_api(api_numero)
            
            # Simulación de respuesta exitosa
            if api_numero == 1:
                pago.estado = 'completado_api1'
            else:
                pago.estado = 'completado_api2'
            pago.save()
            
            return Response({
                'message': f'Pago procesado en API {api_numero}',
                'pago_id': pago.codigo,
                'estado': pago.estado,
                'payload_enviado': payload
            })
            
        except Exception as e:
            pago.estado = 'fallido'
            pago.save()
            return Response({
                'error': f'Error al procesar el pago en API {api_numero}',
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = ClienteSerializer(request.user)
        return Response(serializer.data)

class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class ClienteRegistroView(generics.CreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteRegistroSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Cliente.objects.get(email=email)
            if user.check_password(password):
                # Genera el token personalizado
                token = generate_token(user.id, user.username)
                return Response({
                    'access': token,
                    'user': ClienteSerializer(user).data
                })
            else:
                return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        except Cliente.DoesNotExist:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(f"Unexpected error during login: {e}")
            return Response({"detail": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ClienteLoginView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            user = Cliente.objects.get(username=username)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        except Cliente.DoesNotExist:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class VentaCreateView(generics.CreateAPIView):
    serializer_class = VentaSerializer
    # Permitir compra a cualquier usuario logueado (no staff ni admin requerido)
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)

class VentaListView(generics.ListAPIView):
    serializer_class = VentaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Venta.objects.filter(cliente=self.request.user)

class VentaDetailView(generics.RetrieveAPIView):
    serializer_class = VentaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Venta.objects.filter(cliente=self.request.user)

@csrf_exempt
def test_password_hashing(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        raw_password = request.POST.get('password')

        try:
            user = Cliente.objects.get(email=email)
            is_valid = user.check_password(raw_password)
            return JsonResponse({'is_valid': is_valid})
        except Cliente.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def authenticate_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = Cliente.objects.get(username=username)
        if user.check_password(password):
            return user
    except Cliente.DoesNotExist:
        pass
    return None
