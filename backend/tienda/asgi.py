# Configuración ASGI para el proyecto Django

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tienda.settings')

application = get_asgi_application()
