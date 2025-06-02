# Definición de modelos para la aplicación API
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

class ClienteManager(models.Manager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario es obligatorio')
        if not email:
            raise ValueError('El correo electrónico es obligatorio')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        return self.create_user(username, email, password, **extra_fields)

    def normalize_email(self, email):
        """
        Normaliza la dirección de correo electrónico convirtiendo el dominio a minúsculas
        """
        email = email or ''
        try:
            email_name, domain_part = email.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            email = email_name + '@' + domain_part.lower()
        return email

class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    fecha_registro = models.DateTimeField(default=timezone.now)
    password = models.CharField(max_length=128, db_column='contraseña')

    objects = ClienteManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'nombre', 'apellido']

    class Meta:
        db_table = 'clientes'
        managed = False

    def __str__(self):
        return f"{self.username} - {self.nombre} {self.apellido}"

    def get_full_name(self):
        return f"{self.nombre} {self.apellido}"

    def get_short_name(self):
        return self.nombre

    def check_password(self, raw_password):
        """
        Verifica si la contraseña proporcionada coincide con la contraseña almacenada
        """
        return check_password(raw_password, self.password)

    def set_password(self, raw_password):
        """
        Establece la contraseña del usuario, hasheándola apropiadamente
        """
        self.password = make_password(raw_password)
        self.save(update_fields=['password'] if not self._state.adding else None)

    def save(self, *args, **kwargs):
        if self._state.adding:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return True

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    stock = models.IntegerField(default=0)  # Nuevo campo para el stock

    class Meta:
        db_table = 'productos'
        managed = False  # Revert to original setting

    def __str__(self):
        return f"{self.nombre} - {self.tipo}"

    @property
    def stock(self):
        """
        Devuelve un valor predeterminado para el campo 'stock' si no existe en la base de datos.
        """
        return 0  # Valor predeterminado

class Clave(models.Model):
    id = models.AutoField(primary_key=True)
    clave = models.CharField(max_length=255)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='producto_id')
    estado = models.CharField(max_length=20, default='disponible')
    fecha_agregado = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'claves'
        managed = False

    def __str__(self):
        return f"Clave de {self.producto.nombre} - {self.estado}"

class Venta(models.Model):
    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='cliente_id')
    fecha = models.DateTimeField(default=timezone.now)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'ventas'
        managed = False

    def __str__(self):
        return f"Venta {self.id} - {self.cliente.username}"

class DetalleVenta(models.Model):
    id = models.AutoField(primary_key=True)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, db_column='venta_id')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='producto_id')
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'detalle_ventas'
        managed = False

    def __str__(self):
        return f"Detalle de venta {self.venta.id} - {self.producto.nombre}"

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
                "codproducto": detalle.producto.id,
                "cantidad": detalle.cantidad,
                "descripcion": detalle.producto.nombre,
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
