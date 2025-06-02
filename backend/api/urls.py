from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ClienteViewSet, ProductoViewSet, ClaveViewSet,
    VentaViewSet, DetalleVentaViewSet, PagoViewSet,
    RegisterView, UserView,
    ProductoListView,
    ProductoDetailView,
    ClienteRegistroView,
    ClienteLoginView,
    VentaCreateView,
    VentaListView,
    VentaDetailView,
    test_password_hashing
)

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'claves', ClaveViewSet)
router.register(r'ventas', VentaViewSet, basename='venta')
router.register(r'detalles-venta', DetalleVentaViewSet)
router.register(r'pagos', PagoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserView.as_view(), name='user'),
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='producto-detail'),
    path('auth/registro/', ClienteRegistroView.as_view(), name='cliente-registro'),
    path('auth/login/', ClienteLoginView.as_view(), name='cliente-login'),
    path('ventas/', VentaCreateView.as_view(), name='venta-create'),
    path('ventas/lista/', VentaListView.as_view(), name='venta-list'),
    path('ventas/<int:pk>/', VentaDetailView.as_view(), name='venta-detail'),
    path('test-password-hashing/', test_password_hashing, name='test_password_hashing'),
]