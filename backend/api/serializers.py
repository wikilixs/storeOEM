# Serializadores para la aplicación API
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import Cliente, Producto, Clave, Venta, DetalleVenta, Pago

User = get_user_model()

class ClienteRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={
            'required': 'La contraseña es requerida',
            'blank': 'La contraseña no puede estar vacía'
        }
    )
    confirmar_password = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={
            'required': 'La confirmación de contraseña es requerida',
            'blank': 'La confirmación de contraseña no puede estar vacía'
        }
    )

    class Meta:
        model = Cliente
        fields = ['id', 'username', 'nombre', 'apellido', 'email', 'password', 'confirmar_password']
        read_only_fields = ['id', 'fecha_registro']
        extra_kwargs = {
            'username': {'required': True},
            'nombre': {'required': True},
            'apellido': {'required': True},
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmar_password']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirmar_password', None)
        password = validated_data.pop('password')
        cliente = Cliente(
            username=validated_data['username'],
            email=validated_data['email'],
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido']
        )
        cliente.set_password(password)
        cliente.save()
        return cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('id', 'username', 'email', 'nombre', 'apellido')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Cliente(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('id', 'nombre', 'tipo', 'precio', 'descripcion')

class ClaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clave
        fields = ('id', 'clave', 'estado')

class DetalleVentaSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(source='clave.producto', read_only=True)
    clave = ClaveSerializer(read_only=True)

    class Meta:
        model = DetalleVenta
        fields = ('id', 'producto', 'clave', 'precio_unitario')

class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True, source='detalleventa_set')
    
    class Meta:
        model = Venta
        fields = ('id', 'fecha', 'total', 'detalles')
        read_only_fields = ('fecha',)  # Solo la fecha es de solo lectura, total ya no

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
