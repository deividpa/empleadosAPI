# API de Empleados

# Aplicación con Docker Compose

Este proyecto consiste en un backend, un frontend y una base de datos Postgres, todos configurados para ejecutarse en contenedores Docker utilizando `docker-compose`.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estructura del Proyecto

La aplicación tiene la siguiente estructura de directorios:

/backend - Código fuente del backend

/frontend - Código fuente del frontend 

/db_init - Scripts de inicialización de la base de datos

/docker-compose.yml - Definición de los servicios Docker


### Configuración del Backend

Asegúrate de que el archivo `.env` dentro de la carpeta `backend` contenga las configuraciones de entorno necesarias para la API. Ejemplo:

```bash
DATABASE_URL="postgresql://empleadosapiuser:empleadosAPIpassword@db:5432/empleadosapidb"
JWT_SECRET="empleadosAPIsecreto"
PORT=3001
```

## Inicialización de la Aplicación

Para iniciar la aplicación utilizando `docker-compose`, sigue los siguientes pasos:

### 1. Clona el repositorio

```bash
git clone https://github.com/deividpa/empleadosAPI
```

### 2. Construir y levantar los contenedores
Ejecuta el siguiente comando para construir las imágenes de Docker y levantar todos los servicios (backend, frontend y base de datos):

```bash
docker-compose up --build
```

#### Esto hará lo siguiente:

- Construir el backend y frontend a partir de sus respectivos Dockerfile.
- Levantar la base de datos Postgres con las credenciales y el nombre de base de datos especificados.
- Configurar la red app-network entre los servicios.


### 3. Acceder a la aplicación
Una vez que los contenedores estén en ejecución:

1. El backend estará disponible en http://localhost:3001
2. El frontend estará disponible en http://localhost:5173
3. La base de datos Postgres estará escuchando en http://localhost:5432


### 4. Verificación de la base de datos
Para acceder a la base de datos Postgres y verificar que está configurada correctamente, ejecuta:

```bash
docker exec -it <nombre-del-contenedor-db> psql -U empleadosapiuser -d empleadosapidb
```
**Nota** Reemplaza <nombre-del-contenedor-db> con el nombre de tu contenedor (o el id) de base de datos (con el comando  **docker ps** se puede visualizar, o bien en **Docker desktop**)

### 5. Detener los contenedores

Para detener y eliminar los contenedores, ejecuta:

```bash
docker-compose down
```

Esto detendrá los contenedores y liberará los recursos. Si deseas eliminar también los volúmenes creados, puedes ejecutar:

```bash
docker-compose down -v
```

**Sobre los volúmenes**
Los datos de la base de datos se almacenan en un volumen persistente llamado pgdata. Este volumen asegura que los datos no se pierdan al detener los contenedores.

## Nota importante
Asegúrate de que los puertos 3001 (backend), 5173 (frontend) y 5432 (Postgres) estén libres antes de ejecutar la aplicación.