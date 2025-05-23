# Serializadores para la aplicación API
from rest_framework import serializers
from .models import Cliente, Producto, Clave, Venta, DetalleVenta, Pago

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'email', 'fecha_registro']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'tipo', 'precio', 'descripcion']

class ClaveSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    
    class Meta:
        model = Clave
        fields = ['id', 'clave', 'producto', 'producto_nombre', 'estado', 'fecha_agregado']

class DetalleVentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='clave.producto.nombre', read_only=True)
    
    class Meta:
        model = DetalleVenta
        fields = ['id', 'venta', 'clave', 'producto_nombre', 'precio_unitario']

class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True)
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    
    class Meta:
        model = Venta
        fields = ['id', 'cliente', 'cliente_nombre', 'fecha', 'total', 'detalles']

class PagoSerializer(serializers.ModelSerializer):
    payload_api1 = serializers.SerializerMethodField()
    payload_api2 = serializers.SerializerMethodField()

    class Meta:
        model = Pago
        fields = ['codigo', 'venta', 'monto', 'estado', 
                 'codigo_operacion_api1', 'codigo_operacion_api2',
                 'fecha_creacion', 'fecha_actualizacion', 
                 'payload_api1', 'payload_api2']
        read_only_fields = ['codigo', 'estado', 
                          'codigo_operacion_api1', 'codigo_operacion_api2',
                          'fecha_creacion', 'fecha_actualizacion']
    
    def get_payload_api1(self, obj):
        return obj.generar_payload_api(1)
        
    def get_payload_api2(self, obj):
        return obj.generar_payload_api(2)
