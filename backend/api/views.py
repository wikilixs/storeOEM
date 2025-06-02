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
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Venta.objects.all()
        return Venta.objects.filter(cliente=self.request.user)
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # Validar que haya productos en el carrito
        if not request.data.get('detalles', []):
            return Response(
                {'error': 'El carrito está vacío'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Crear la venta
        venta_data = {
            'cliente': request.user.id,
            'total': 0
        }
        venta_serializer = self.get_serializer(data=venta_data)
        venta_serializer.is_valid(raise_exception=True)
        venta = venta_serializer.save()

        total = 0
        detalles = []

        # Procesar cada producto en el carrito
        for detalle in request.data['detalles']:
            producto_id = detalle['producto_id']
            
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
                clave=clave,
                precio_unitario=clave.producto.precio
            )
            detalles.append(detalle_venta)

            # Actualizar el estado de la clave
            clave.estado = 'vendida'
            clave.save()

            total += clave.producto.precio

        # Actualizar el total de la venta
        venta.total = total
        venta.save()

        return Response(
            self.get_serializer(venta).data,
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
    permission_classes = [IsAuthenticated]

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
            