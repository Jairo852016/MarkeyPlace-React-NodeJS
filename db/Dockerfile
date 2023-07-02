# Seleccionar una imagen base de MySQL
FROM mysql:latest

# Opcional: establecer las variables de entorno para la configuración de MySQL
ENV MYSQL_ROOT_PASSWORD='CASA'
ENV MYSQL_DATABASE='prueba'
ENV MYSQL_USER='prueba'
ENV MYSQL_PASSWORD='Vale2016'

# Opcional: copiar un archivo SQL al contenedor para ejecutar scripts adicionales
COPY script.sql /docker-entrypoint-initdb.d/

# Opcional: exponer el puerto de MySQL (3306 por defecto)
EXPOSE 3306

# CMD se encarga de iniciar automáticamente el servidor MySQL al iniciar el contenedor
CMD ["mysqld"]
