# Serializadores para la aplicación API
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import Cliente, Producto, Clave, Venta, DetalleVenta, Pago

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    contraseña = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = Cliente
        fields = ('username', 'email', 'contraseña', 'confirm_password', 'nombre', 'apellido')
        extra_kwargs = {
            'nombre': {'required': True},
            'apellido': {'required': True},
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['contraseña'] != attrs['confirm_password']:
            raise serializers.ValidationError({"contraseña": "Las contraseñas no coinciden"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('contraseña')
        cliente = Cliente(**validated_data)
        cliente.set_password(password)
        cliente.save()
        return cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'username', 'nombre', 'apellido', 'email']
        extra_kwargs = {
            'contraseña': {'write_only': True}
        }

class ClienteRegistroSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = Cliente
        fields = ['id', 'username', 'nombre', 'apellido', 'email', 'contraseña', 'confirm_password']
        extra_kwargs = {
            'contraseña': {'write_only': True}
        }

    def validate(self, data):
        if data['contraseña'] != data['confirm_password']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        cliente = Cliente(**validated_data)
        cliente.set_password(validated_data['contraseña'])
        cliente.save()
        return cliente

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'tipo', 'precio', 'descripcion']

class ClaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clave
        fields = ['id', 'clave', 'producto', 'estado', 'fecha_agregado']
        read_only_fields = ['fecha_agregado']

class DetalleVentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='clave.producto.nombre', read_only=True)
    
    class Meta:
        model = DetalleVenta
        fields = ['id', 'clave', 'precio_unitario', 'producto_nombre']

class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Venta
        fields = ['id', 'cliente', 'fecha', 'total', 'detalles']
        read_only_fields = ['fecha']

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
