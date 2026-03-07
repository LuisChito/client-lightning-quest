# Dockerfile para desarrollo con hot reload
FROM node:20-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache git

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias con legacy-peer-deps (necesario para React 19)
RUN npm install --legacy-peer-deps

# Copiar el resto del código (esto se sobreescribirá con el volumen)
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev"]
