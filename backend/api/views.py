from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import Cliente, Producto, Clave, Venta, DetalleVenta, Pago
from .serializers import (
    ClienteSerializer, ClienteRegistroSerializer,
    ProductoSerializer, ClaveSerializer,
    VentaSerializer, DetalleVentaSerializer, PagoSerializer,
    UserRegistrationSerializer
)
import requests
from django.conf import settings
from rest_framework.views import APIView

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserRegistrationSerializer(user, context=self.get_serializer_context()).data,
            "message": "Usuario registrado exitosamente",
        }, status=status.HTTP_201_CREATED)

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
            