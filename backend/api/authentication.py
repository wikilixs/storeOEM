from rest_framework import authentication
from rest_framework import exceptions
from django.conf import settings
import jwt
from .models import Cliente

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            # Obtener el token del header
            token = auth_header.split(' ')[1]
            # Decodificar el token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # Obtener el usuario
            user = Cliente.objects.get(id=payload['user_id'])
            return (user, token)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expirado')
        except (jwt.InvalidTokenError, Cliente.DoesNotExist):
            raise exceptions.AuthenticationFailed('Token inválido')
        except (IndexError, KeyError):
            raise exceptions.AuthenticationFailed('Token mal formado') 