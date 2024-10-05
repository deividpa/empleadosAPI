-- Paso 1: Limpieza previa
DO $$
BEGIN
    -- Desconectar todas las conexiones activas
    PERFORM pg_terminate_backend(pid) 
    FROM pg_stat_activity 
    WHERE datname = 'empleadosapidb';
    
    -- Eliminar base de datos si existe
    DROP DATABASE IF EXISTS empleadosapidb;
    
    -- Eliminar usuario si existe
    DROP USER IF EXISTS empleadosapiuser;
END
$$;

-- Paso 2: Crear el usuario con los permisos necesarios
CREATE USER empleadosapiuser WITH PASSWORD 'empleadosAPIpassword' CREATEDB;

-- Paso 3: Crear la base de datos
CREATE DATABASE empleadosapidb OWNER empleadosapiuser;

-- Paso 4: Conectar a la base de datos para configurar permisos
\c empleadosapidb postgres;

-- Paso 5: Configurar permisos correctamente
ALTER SCHEMA public OWNER TO empleadosapiuser;
GRANT ALL PRIVILEGES ON DATABASE empleadosapidb TO empleadosapiuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO empleadosapiuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO empleadosapiuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO empleadosapiuser;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO empleadosapiuser;

-- Paso 6: Establecer permisos por defecto
ALTER DEFAULT PRIVILEGES FOR USER empleadosapiuser IN SCHEMA public 
GRANT ALL PRIVILEGES ON TABLES TO empleadosapiuser;

ALTER DEFAULT PRIVILEGES FOR USER empleadosapiuser IN SCHEMA public 
GRANT ALL PRIVILEGES ON SEQUENCES TO empleadosapiuser;

ALTER DEFAULT PRIVILEGES FOR USER empleadosapiuser IN SCHEMA public 
GRANT ALL PRIVILEGES ON FUNCTIONS TO empleadosapiuser;

-- Paso 7: Asegurarnos que el usuario puede crear el schema
GRANT CREATE ON DATABASE empleadosapidb TO empleadosapiuser;

-- Paso 8: Verificar los permisos
\du empleadosapiuser
\l empleadosapidb