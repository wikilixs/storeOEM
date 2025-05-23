# Configuración de URLs principales del proyecto Django

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('docs/', include_docs_urls(title='API Documentation')),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]

# Configurar cabeceras CORS
from django.conf import settings
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
