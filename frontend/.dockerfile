# Usar una imagen base de Node.js para construir la app
FROM node:20.18.0 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Compilar la app para producción
RUN npm run build

# Usar una imagen base de Nginx para servir la aplicación
FROM nginx:1.23.1-alpine

# Copiar los archivos compilados de React al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]