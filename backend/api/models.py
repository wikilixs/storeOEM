# Definición de modelos para la aplicación API
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

User = get_user_model()

class Cliente(AbstractUser):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_registro = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'clientes'
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return f"{self.username} - {self.nombre} {self.apellido}"

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'productos'
        managed = False  # Indica que Django no debe gestionar esta tabla

    def __str__(self):
        return f"{self.nombre} - {self.tipo}"

class Clave(models.Model):
    clave = models.CharField(max_length=255)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='producto_id')
    estado = models.CharField(max_length=20, default='disponible')
    fecha_agregado = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'claves'
        managed = False  # Indica que Django no debe gestionar esta tabla

    def __str__(self):
        return f"Clave de {self.producto.nombre} - {self.estado}"

class Venta(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='cliente_id')
    fecha = models.DateTimeField(default=timezone.now)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'ventas'
        managed = False  # Indica que Django no debe gestionar esta tabla

    def __str__(self):
        return f"Venta {self.id} - {self.cliente.username}"

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, db_column='venta_id')
    clave = models.ForeignKey(Clave, on_delete=models.CASCADE, db_column='clave_id')
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'detalle_venta'
        managed = False  # Indica que Django no debe gestionar esta tabla

    def __str__(self):
        return f"Detalle de venta {self.venta.id} - {self.clave.producto.nombre}"

class Pago(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('procesando', 'Procesando'),
        ('completado_api1', 'Completado API 1'),
        ('completado_api2', 'Completado API 2'),
        ('completado_total', 'Completado Total'),
        ('fallido', 'Fallido')
    ]
    
    venta = models.OneToOneField(Venta, on_delete=models.CASCADE, related_name='pago')
    codigo = models.AutoField(primary_key=True)
    codigo_operacion_api1 = models.CharField(max_length=255, blank=True, null=True)
    codigo_operacion_api2 = models.CharField(max_length=255, blank=True, null=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Pago {self.codigo} - Venta {self.venta.id} - {self.estado}"

    def generar_payload_api(self, api_numero):
        detalles = []
        for detalle in self.venta.detalles.all():
            detalles.append({
                "codproducto": detalle.clave.producto.id,
                "cantidad": 1,  # Por defecto 1 ya que vendemos claves individuales
                "descripcion": detalle.clave.producto.nombre,
                "monto": float(detalle.precio_unitario)
            })
        
        codigo_operacion = self.codigo_operacion_api1 if api_numero == 1 else self.codigo_operacion_api2
        
        return {
            "codigo": self.codigo,
            "codigo_operacion": codigo_operacion or f"LOCAL_{self.codigo}_API{api_numero}",
            "fecha": self.fecha_creacion.strftime("%Y-%d-%m"),
            "montototal": float(self.monto),
            "detalle": detalles
        }
