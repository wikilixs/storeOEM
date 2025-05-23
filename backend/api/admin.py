from django.contrib import admin
from .models import Cliente, Producto, Clave, Venta, DetalleVenta

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'fecha_registro')
    search_fields = ('nombre', 'email')
    ordering = ('-fecha_registro',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'precio')
    list_filter = ('tipo',)
    search_fields = ('nombre', 'descripcion')
    ordering = ('nombre',)

@admin.register(Clave)
class ClaveAdmin(admin.ModelAdmin):
    list_display = ('clave', 'producto', 'estado', 'fecha_agregado')
    list_filter = ('estado', 'producto__tipo')
    search_fields = ('clave', 'producto__nombre')
    ordering = ('-fecha_agregado',)
    raw_id_fields = ('producto',)

@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'fecha', 'total')
    list_filter = ('fecha',)
    search_fields = ('cliente__nombre', 'cliente__email')
    ordering = ('-fecha',)
    raw_id_fields = ('cliente',)

@admin.register(DetalleVenta)
class DetalleVentaAdmin(admin.ModelAdmin):
    list_display = ('venta', 'clave', 'precio_unitario')
    list_filter = ('venta__fecha',)
    search_fields = ('venta__cliente__nombre', 'clave__producto__nombre')
    raw_id_fields = ('venta', 'clave')
