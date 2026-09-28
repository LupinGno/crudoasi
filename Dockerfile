# 1. Usar Node.js
FROM node:18-alpine

# 2. Crear una carpeta dentro del contenedor
WORKDIR /app

# 3. Copiar configuración e instalar dependencias
COPY package.json .
RUN npm install

# 4. Copiar tu código (la carpeta src)
COPY . .

# 5. Exponer el puerto de tu servidor web
EXPOSE 3000

# 6. Comando para encender el servidor automáticamente
CMD ["node", "src/index.js"]