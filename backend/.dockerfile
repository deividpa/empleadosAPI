# Usar la imagen base de Node.js
FROM node:20.18.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Ejecutar migraciones de Prisma antes de iniciar la aplicación
CMD ["npx", "prisma", "migrate", "dev", "--name", "init"]

# Iniciar la aplicación
CMD ["npm", "start"]