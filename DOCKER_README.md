# 🐳 Docker Setup - Lightning Quest

Este proyecto está dockerizado con soporte para **desarrollo** (hot reload) y **producción**.

---

## 📋 Requisitos Previos

- Docker instalado ([Descargar aquí](https://www.docker.com/products/docker-desktop))
- Docker Compose instalado (viene con Docker Desktop)

---

## 🚀 Modo Desarrollo (con Hot Reload)

### Iniciar el proyecto

```bash
docker-compose up app-dev
```

O en modo detached (en segundo plano):

```bash
docker-compose up -d app-dev
```

### Acceder a la aplicación

Abre tu navegador en: **http://localhost:5173**

### Hot Reload Automático

Los cambios que hagas en tu código se actualizarán **automáticamente** en el contenedor. No necesitas reiniciar Docker. ✨

### Ver logs

```bash
docker-compose logs -f app-dev
```

### Detener el contenedor

```bash
docker-compose down
```

---

## 🏭 Modo Producción

### Build y ejecutar

```bash
docker-compose --profile production up app-prod
```

O construir la imagen manualmente:

```bash
docker build -t lightning-quest-prod -f Dockerfile.prod .
docker run -p 8080:80 lightning-quest-prod
```

### Acceder a la aplicación

Abre tu navegador en: **http://localhost:8080**

---

## 🛠️ Comandos Útiles

### Reconstruir la imagen (si instalas nuevas dependencias)

```bash
docker-compose build app-dev
```

### Ejecutar comandos dentro del contenedor

```bash
# Instalar una nueva dependencia
docker-compose exec app-dev npm install <paquete>

# Ejecutar lint
docker-compose exec app-dev npm run lint

# Acceder a la terminal del contenedor
docker-compose exec app-dev sh
```

### Limpiar todo (contenedores, imágenes, volúmenes)

```bash
docker-compose down -v
docker system prune -a
```

---

## 📂 Estructura de archivos Docker

```
.
├── Dockerfile              # Imagen de desarrollo
├── Dockerfile.prod         # Imagen de producción (multi-stage con nginx)
├── docker-compose.yml      # Orquestación de contenedores
├── nginx.conf              # Configuración de nginx para producción
├── .dockerignore           # Archivos excluidos del contexto Docker
└── DOCKER_README.md        # Esta documentación
```

---

## 🔧 Configuración de Vite

El archivo `vite.config.ts` está configurado para funcionar con Docker:

```typescript
server: {
  host: true,              // Escucha en todas las interfaces
  port: 5173,
  watch: {
    usePolling: true,      // Necesario para hot reload en Docker
  },
}
```

---

## ⚠️ Troubleshooting

### Los cambios no se reflejan (no hay hot reload)

1. Verifica que el volumen esté montado correctamente:
   ```bash
   docker-compose config
   ```

2. Reinicia el contenedor:
   ```bash
   docker-compose restart app-dev
   ```

### Error de permisos en node_modules

Si tienes problemas con permisos, elimina node_modules local:

```bash
rm -rf node_modules
docker-compose up --build app-dev
```

### Puerto 5173 ya está en uso

Cambia el puerto en `docker-compose.yml`:

```yaml
ports:
  - "3000:5173"  # Ahora accede por localhost:3000
```

---

## 📊 Monitoreo

### Ver uso de recursos

```bash
docker stats lightning-quest-dev
```

### Inspeccionar contenedor

```bash
docker inspect lightning-quest-dev
```

---

## 🎯 Mejores Prácticas

✅ **Desarrollo**: Usa `docker-compose up app-dev` para trabajar con hot reload  
✅ **Producción**: Usa `Dockerfile.prod` para builds optimizados con nginx  
✅ **Dependencias**: Si instalas nuevas dependencias, reconstruye: `docker-compose build`  
✅ **Limpieza**: Limpia imágenes antiguas regularmente: `docker system prune`  

---

¡Listo para desarrollar! 🚀⚡
