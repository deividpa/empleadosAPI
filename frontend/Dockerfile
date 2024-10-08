# Etapa de construcción
FROM node:alpine AS build

WORKDIR /app

# Copia los archivos necesarios
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copia el resto de la aplicación y construye el proyecto
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos de la construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configuración de Nginx
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]