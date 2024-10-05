# API de Empleados

## Configuración de la Base de Datos

Este proyecto utiliza PostgreSQL como base de datos principal y Prisma como ORM.

### Prerequisitos
- PostgreSQL 17 instalado
- Node.js y npm

### Configuración de PostgreSQL

1. Navega hasta la carpeta del proyecto:
```bash
cd C:\Users\pc\Documents\GitHub\empleados-project\empleadosAPI\backend
```

2. Ejecuta el script de configuración de la base de datos:
```bash
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -f setup_database.sql
```

El script `setup_database.sql` contiene toda la configuración necesaria para:
- Crear el usuario de la base de datos
- Crear la base de datos
- Configurar todos los permisos necesarios para Prisma

### Configuración del Proyecto

1. Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:
```env
DATABASE_URL="postgresql://empleadosapiuser:empleadosAPIpassword@localhost:5432/empleadosapidb"
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate dev --name init
```

## Autenticación JWT

Este proyecto utiliza JSON Web Tokens (JWT) para la autenticación de usuarios.

### Rutas de Autenticación

#### Registro de Usuario
- **Endpoint**: `/api/auth/register`
- **Método**: `POST`
- **Descripción**: Registra un nuevo usuario en el sistema
- **Cuerpo de la solicitud**:
  ```json
  {
    "username": "nombre_usuario",
    "password": "contraseña",
    "role": "empleado"
  }
  ```
- **Roles disponibles**:
  - `admin`: Acceso completo al sistema (leer, escribir, eliminar)
  - `empleado`: Acceso limitado a operaciones básicas (leer y escribir)

#### Inicio de Sesión
- **Endpoint**: `/api/auth/login`
- **Método**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "username": "nombre_usuario",
    "password": "contraseña"
  }
  ```

## Medidas de Seguridad

### Prevención de SQL Injection
- El uso de Prisma ORM proporciona protección automática contra SQL Injection mediante:
  - Parámetros preparados
  - Escape automático de caracteres especiales
  - Validación de tipos

### Buenas Prácticas Implementadas
- Uso de variables de entorno para configuración sensible
- Validación de entrada en todas las rutas
- Manejo de errores centralizado
- Autenticación basada en tokens JWT

## TODOs y Mejoras Pendientes

### Prioridad Alta
- [ ] Implementar manejo de errores mejorado para operaciones CRUD
- [ ] Agregar validación detallada de roles y permisos
- [ ] Documentar roles disponibles y sus permisos específicos
- [ ] Mejorar mensajes de error para operaciones no autorizadas

### Prioridad Media
- [ ] Implementar paginación en endpoints que retornan listas
- [ ] Agregar filtrado de registros
- [ ] Mejorar la documentación de endpoints

### Prioridad Baja
- [ ] Agregar tests automatizados
- [ ] Implementar rate limiting
- [ ] Agregar logging detallado