from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from .models import Cliente, Producto, Clave, Venta, DetalleVenta, Pago
from .serializers import (
    ClienteSerializer, ProductoSerializer, ClaveSerializer,
    VentaSerializer, DetalleVentaSerializer, PagoSerializer
)
import requests
from django.conf import settings

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

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
    
    def get_queryset(self):
        queryset = Clave.objects.all()
        estado = self.request.query_params.get('estado', None)
        producto = self.request.query_params.get('producto', None)
        
        if estado:
            queryset = queryset.filter(estado=estado)
        if producto:
            queryset = queryset.filter(producto_id=producto)
            
        return queryset

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # Extraer datos de la venta
        cliente_id = request.data.get('cliente')
        detalles_data = request.data.get('detalles', [])
        
        # Calcular el total de la venta
        total = sum(float(detalle['precio_unitario']) for detalle in detalles_data)
        
        # Crear la venta
        venta = Venta.objects.create(
            cliente_id=cliente_id,
            total=total
        )
        
        # Crear los detalles de la venta y actualizar el estado de las claves
        for detalle in detalles_data:
            DetalleVenta.objects.create(
                venta=venta,
                clave_id=detalle['clave'],
                precio_unitario=detalle['precio_unitario']
            )
            # Marcar la clave como vendida
            Clave.objects.filter(id=detalle['clave']).update(estado='vendida')
        
        serializer = self.get_serializer(venta)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
            
            # Esta sección se completará cuando se tengan las URLs de las APIs
            # api_url = settings.PAYMENT_API1_URL if api_numero == 1 else settings.PAYMENT_API2_URL
            # headers = {
            #     'Authorization': f'Bearer {settings.PAYMENT_API1_KEY if api_numero == 1 else settings.PAYMENT_API2_KEY}',
            #     'Content-Type': 'application/json'
            # }
            # response = requests.post(api_url, json=payload, headers=headers)
            # 
            # if response.status_code == 200:
            #     datos_respuesta = response.json()
            #     if api_numero == 1:
            #         pago.codigo_operacion_api1 = datos_respuesta.get('codigo_operacion')
            #         pago.estado = 'completado_api1'
            #     else:
            #         pago.codigo_operacion_api2 = datos_respuesta.get('codigo_operacion')
            #         pago.estado = 'completado_api2'
            #     
            #     # Si ambas APIs han respondido, marcar como completado total
            #     if pago.codigo_operacion_api1 and pago.codigo_operacion_api2:
            #         pago.estado = 'completado_total'
            # else:
            #     pago.estado = 'fallido'
            
            # Simulación de respuesta exitosa
            # Esto se reemplazará con la lógica real cuando se tengan las APIs
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