## Configuración de la Base de Datos

Este proyecto utiliza PostgreSQL como base de datos principal. Para configurar y conectarse a la base de datos hay que seguir los siguientes pasos:

### Creación de Usuario y Base de Datos en PostgreSQL

1. Conectarse a PostgreSQL como superusuario (`postgres`):

    ```bash
    psql -U postgres
    ```

2. Ejecutar los siguientes comandos para crear el usuario, base de datos, y asignar permisos:

    ```sql
    CREATE USER empleadosapiuser WITH PASSWORD 'empleadosAPIpassword';
    CREATE DATABASE empleadosapidb;
    GRANT ALL PRIVILEGES ON DATABASE empleadosapidb TO empleadosapiuser;
    -- Otorgar permisos para crear bases de datos (para resolver posibles errores de Prisma)
    ALTER USER empleadosapiuser CREATEDB;
    -- Otorgar permisos completos en el esquema public
    GRANT ALL ON SCHEMA public TO empleadosapiuser;
    ```


### Migraciones con Prisma

Una vez que PostgreSQL está configurado, ejecutamos las migraciones de Prisma para crear las tablas en la base de datos:

```bash
npx prisma migrate dev --name init
```

## Autenticación JWT

Este proyecto utiliza JWT para la autenticación de usuarios. A continuación se detallan las rutas relacionadas con el proceso de autenticación:

### Registro de Usuario

- **Endpoint**: `/api/auth/register`
- **Método**: `POST`
- **Descripción**: Permite registrar un nuevo usuario.
- **Cuerpo de la solicitud**:
  ```json
  {
    "username": "nombre_usuario",
    "password": "contraseña",
    "role": "user"
  }


ToDo: Falta hacer mejores manejos de error, para ver por ejemplo cuando creo un empleado por qué falla.
También crear ENUMS de los roles (o documentar mejor esto: qué roles existen).
Falta manejar mensajes de error cuando se intentan realizar operaciones no aptas para el rol
Documentar mejor prácticas anti-SQL Injection con prisma ORM
Falta implementar paginación y filtrado
