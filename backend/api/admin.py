from django.contrib import admin
from .models import Cliente, Producto, Clave, Venta, DetalleVenta

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'fecha_registro')
    search_fields = ('nombre', 'email')
    ordering = ('-fecha_registro',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'precio', 'stock')  # Ensure 'stock' is included in list_display
    list_filter = ('tipo',)
    search_fields = ('nombre', 'tipo')

@admin.register(Clave)
class ClaveAdmin(admin.ModelAdmin):
    list_display = ('producto', 'estado', 'fecha_agregado')
    list_filter = ('estado', 'producto__tipo')
    search_fields = ('clave', 'producto__nombre')
    raw_id_fields = ('producto',)

@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'fecha', 'total')
    list_filter = ('fecha',)
    search_fields = ('cliente__username', 'cliente__email')
    raw_id_fields = ('cliente',)

@admin.register(DetalleVenta)
class DetalleVentaAdmin(admin.ModelAdmin):
    list_display = ('venta', 'producto', 'cantidad', 'precio_unitario', 'subtotal')
    list_filter = ('venta__fecha',)
    search_fields = ('venta__id', 'producto__nombre')
    raw_id_fields = ('venta', 'producto')
