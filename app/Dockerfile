# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de tu aplicación
RUN npm install

# Copia todos los archivos del directorio actual al directorio de trabajo en el contenedor
COPY . .

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 3000

# Comando que se ejecutará al iniciar el contenedor
CMD [ "npm", "start" ]