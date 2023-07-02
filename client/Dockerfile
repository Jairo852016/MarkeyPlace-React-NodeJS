# client/Dockerfile

FROM node:16.13-alpine

# Establecer el directorio de trabajo dentro del contenedor
RUN [ "mkdir", "-p", "/usr/src/app" ]

WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package.json /usr/src/app/package.json

COPY package-lock.json /usr/src/app/package-lock.json

# Instalar las dependencias
RUN npm install

# Copiar los archivos de la aplicación
COPY . .

# Construir la aplicación de React
#RUN npm run build

# Instalar el servidor HTTP de producción
RUN npm install -g serve

# Exponer el puerto en el que se ejecutará la aplicación (por defecto, el puerto 3000)
EXPOSE 3014

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["serve", "-s", "build"]