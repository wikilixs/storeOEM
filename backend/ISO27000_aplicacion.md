# Aplicación de la Norma ISO 27000 en el Proyecto Django + Vue.js

## 1. Introducción a la Norma ISO 27000

La familia de normas ISO/IEC 27000 proporciona un marco internacionalmente reconocido para la gestión de la seguridad de la información. Su objetivo es ayudar a las organizaciones a proteger sus activos de información mediante la implementación de un Sistema de Gestión de Seguridad de la Información (SGSI). La norma ISO 27000 define los términos y conceptos fundamentales, mientras que ISO 27001 establece los requisitos para el SGSI y otras normas de la familia (como ISO 27002) ofrecen controles y buenas prácticas.

### Principios Clave de ISO 27000
- **Confidencialidad:** Garantizar que la información solo sea accesible a quienes estén autorizados.
- **Integridad:** Salvaguardar la exactitud y completitud de la información y los métodos de procesamiento.
- **Disponibilidad:** Asegurar que los usuarios autorizados tengan acceso a la información y a los activos asociados cuando lo requieran.

## 2. Aplicación de ISO 27000 en el Proyecto

Este proyecto, basado en Django (backend) y Vue.js (frontend), implementa diversos controles y prácticas alineadas con los principios de la familia ISO 27000. A continuación, se detallan los aspectos más relevantes:

### a) **Gestión de Usuarios y Autenticación Segura**
- **Hashing de contraseñas:** Las contraseñas de los usuarios se almacenan de forma cifrada usando los métodos `set_password` y `check_password` del modelo `Cliente`, evitando el almacenamiento de contraseñas en texto plano.
- **Autenticación basada en tokens:** Se utiliza JWT (JSON Web Token) mediante la librería SimpleJWT, lo que permite una autenticación robusta y la gestión segura de sesiones.
- **Validación de credenciales:** El backend valida cuidadosamente las credenciales recibidas, devolviendo errores claros y evitando la exposición de información sensible.

### b) **Control de Acceso y Permisos**

El control de acceso es un pilar fundamental de la seguridad de la información según la norma ISO 27000, ya que garantiza que solo los usuarios autorizados puedan acceder a los recursos y datos sensibles del sistema. En este proyecto, el control de acceso se implementa de la siguiente manera:

#### 1. Autenticación de Usuarios
- El sistema requiere que los usuarios se autentiquen mediante credenciales únicas (correo electrónico y contraseña).
- Las contraseñas se almacenan de forma segura utilizando algoritmos de hash robustos, evitando el almacenamiento en texto plano.
- El backend valida las credenciales y, si son correctas, emite un token JWT que representa la sesión del usuario.

#### 2. Autorización y Permisos Granulares
- Se utilizan las clases de permisos de Django REST Framework para definir quién puede acceder a cada recurso:
  - `IsAuthenticated`: Solo permite el acceso a usuarios autenticados.
  - `AllowAny`: Permite el acceso público a ciertos endpoints, como el registro o el login.
  - `IsAdminUser`: Restringe el acceso a usuarios con privilegios de administrador.
- Los endpoints críticos, como la gestión de ventas, pagos y datos de usuario, requieren autenticación, asegurando que solo los usuarios legítimos puedan operar sobre su propia información.

#### 3. Separación de Roles y Principio de Mínimos Privilegios
- El sistema diferencia entre usuarios normales y administradores, asignando permisos según el rol.
- Los usuarios normales solo pueden acceder y modificar sus propios datos y operaciones.
- Los administradores pueden gestionar recursos globales, como productos, claves y usuarios.
- Se aplica el principio de mínimos privilegios, otorgando a cada usuario solo los permisos estrictamente necesarios para su función.

#### 4. Protección de Endpoints y Recursos
- Los endpoints de la API están protegidos mediante decoradores y clases de permisos, evitando el acceso no autorizado.
- Las vistas y métodos que manipulan información sensible verifican la identidad y los permisos del usuario antes de ejecutar cualquier acción.
- Se implementan filtros en las consultas para asegurar que los usuarios solo puedan acceder a los datos que les corresponden (por ejemplo, un usuario solo puede ver sus propias ventas).

#### 5. Gestión de Sesiones y Tokens
- El uso de JWT permite validar la autenticidad de cada petición, ya que el token debe ser enviado en la cabecera de autorización.
- Los tokens tienen una expiración definida, lo que limita el tiempo de acceso en caso de compromiso.
- Se recomienda implementar mecanismos de revocación de tokens y cierre de sesión para mayor seguridad.

#### 6. Auditoría y Registro de Accesos
- El sistema registra los intentos de acceso, tanto exitosos como fallidos, permitiendo la detección de patrones sospechosos o intentos de intrusión.
- Los logs de acceso pueden ser revisados periódicamente para identificar y responder a incidentes de seguridad.

#### 7. Recomendaciones Adicionales
- Implementar autenticación multifactor (MFA) para usuarios con privilegios elevados.
- Revisar y actualizar periódicamente las políticas de acceso y los permisos asignados.
- Limitar el acceso a la infraestructura (servidores, base de datos) solo a personal autorizado y mediante canales seguros.

**En resumen:**
El control de acceso en este proyecto está alineado con las mejores prácticas de la norma ISO 27000, garantizando que solo los usuarios autorizados puedan acceder y operar sobre los recursos, minimizando el riesgo de accesos no autorizados y protegiendo la confidencialidad e integridad de la información.

### c) **Gestión de Sesiones y Tokens**
- **Expiración y revocación:** Los tokens JWT tienen una expiración definida, lo que reduce el riesgo de uso indebido en caso de compromiso.
- **Almacenamiento seguro:** El frontend almacena los tokens en `localStorage` y los envía en las cabeceras de las peticiones, evitando exponerlos en URLs o formularios.

### d) **Protección de Datos en Tránsito y en Reposo**
- **HTTPS:** El proyecto puede configurarse para usar HTTPS, asegurando que los datos transmitidos entre frontend y backend estén cifrados.
- **Cifrado en base de datos:** Las contraseñas y otros datos sensibles se almacenan cifrados, cumpliendo con la confidencialidad.

### e) **Gestión de Errores y Registro de Eventos (Logging)**
- **Registro de intentos de acceso:** El backend registra los intentos de inicio de sesión, errores y eventos relevantes, permitiendo la detección y análisis de incidentes de seguridad.
- **Mensajes de error controlados:** Los mensajes de error no revelan información sensible sobre la existencia de usuarios o detalles internos del sistema.

### f) **Validación y Saneamiento de Datos**
- **Validación de entradas:** Todos los datos recibidos en los endpoints son validados y saneados, previniendo ataques como inyección de SQL, XSS o CSRF.
- **Uso de ORM:** El uso del ORM de Django evita la manipulación directa de consultas SQL, reduciendo riesgos de inyección.

### g) **Gestión de Cambios y Actualizaciones**
- **Actualización de dependencias:** Se recomienda mantener actualizado el software y las dependencias para mitigar vulnerabilidades conocidas.
- **Control de versiones:** El uso de sistemas de control de versiones (como Git) permite rastrear cambios y restaurar versiones seguras en caso de incidentes.

### h) **Respaldo y Recuperación**
- **Backups periódicos:** Se recomienda realizar copias de seguridad regulares de la base de datos y archivos críticos, permitiendo la recuperación ante incidentes.

### i) **Concienciación y Capacitación**
- **Documentación:** El proyecto debe contar con documentación clara sobre las políticas y procedimientos de seguridad.
- **Capacitación:** Se recomienda capacitar al equipo de desarrollo y usuarios sobre buenas prácticas de seguridad y manejo de información.

### j) **Gestión de Incidentes**
- **Detección y respuesta:** El registro de eventos y errores facilita la detección temprana de incidentes y la respuesta oportuna.
- **Planes de contingencia:** Se recomienda definir procedimientos para la gestión y notificación de incidentes de seguridad.

## 3. Recomendaciones para Mejorar la Conformidad con ISO 27000
- Implementar autenticación multifactor (MFA) para usuarios administrativos.
- Realizar auditorías de seguridad periódicas y pruebas de penetración.
- Definir y documentar políticas de gestión de contraseñas y acceso.
- Configurar alertas automáticas ante eventos sospechosos o intentos de acceso no autorizados.
- Revisar y limitar los permisos de los servicios y usuarios en el servidor.

## 4. Conclusión

El proyecto aplica los principios de la norma ISO 27000 mediante controles técnicos y organizativos que protegen la confidencialidad, integridad y disponibilidad de la información. La mejora continua y la concienciación del equipo son claves para mantener un entorno seguro y alineado con los estándares internacionales.
