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
- **Permisos granulares:** Se emplean clases de permisos de Django REST Framework (`IsAuthenticated`, `AllowAny`, etc.) para restringir el acceso a los recursos según el rol y autenticación del usuario.
- **Endpoints protegidos:** Los endpoints críticos requieren autenticación, asegurando que solo los usuarios autorizados puedan acceder o modificar información sensible.
- **Separación de roles:** El sistema diferencia entre usuarios normales y administradores, limitando las acciones según el perfil.

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
