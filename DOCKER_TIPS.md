# 🎯 Tips y Mejores Prácticas - Docker Development

## 🚀 Inicio Rápido

### Forma más simple (recomendada)
```bash
./docker-helper.sh dev
```

### Forma manual
```bash
docker-compose up app-dev
```

---

## 💡 Tips de Desarrollo

### 1️⃣ Hot Reload funciona automáticamente
Los cambios que hagas en tu código se reflejan **instantáneamente** sin reiniciar Docker. Si no funciona:

```bash
# Reinicia el contenedor
./docker-helper.sh restart
```

### 2️⃣ Instalar nuevas dependencias

**Dentro del contenedor:**
```bash
docker-compose exec app-dev npm install --legacy-peer-deps nombre-paquete
```

**Con el helper:**
```bash
./docker-helper.sh install nombre-paquete
```

**Nota:** Este proyecto usa React 19, que puede tener conflictos de peer dependencies con algunas librerías. Por eso usamos `--legacy-peer-deps`.

Después, reconstruye la imagen:
```bash
./docker-helper.sh build
```

### 3️⃣ Ver logs en tiempo real
```bash
./docker-helper.sh logs
```

O manualmente:
```bash
docker-compose logs -f app-dev
```

### 4️⃣ Acceder al terminal del contenedor
```bash
./docker-helper.sh shell
```

Dentro puedes ejecutar cualquier comando npm:
```bash
npm run lint
npm run build
```

---

## 🐛 Troubleshooting

### ❌ Los cambios no se reflejan

**Causa:** El volumen no está montando correctamente

**Solución:**
```bash
# Detener todo
docker-compose down

# Reconstruir y reiniciar
docker-compose up --build app-dev
```

### ❌ Error: "node_modules" not found

**Causa:** Los node_modules no están en el contenedor

**Solución:**
```bash
# Reconstruir la imagen
docker-compose build app-dev

# Iniciar de nuevo
docker-compose up app-dev
```

### ❌ Puerto 5173 en uso

**Opción 1:** Detén el proceso que usa el puerto
```bash
lsof -ti:5173 | xargs kill -9
```

**Opción 2:** Cambia el puerto en `docker-compose.yml`
```yaml
ports:
  - "3000:5173"  # Ahora accede por localhost:3000
```

### ❌ Problemas de permisos en archivos

**Causa:** Docker crea archivos con usuario root

**Solución rápida:**
```bash
sudo chown -R $USER:$USER .
```

---

## 🔧 Comandos útiles del helper

```bash
./docker-helper.sh dev       # Iniciar desarrollo
./docker-helper.sh stop      # Detener contenedores
./docker-helper.sh restart   # Reiniciar
./docker-helper.sh logs      # Ver logs
./docker-helper.sh build     # Reconstruir imagen
./docker-helper.sh clean     # Limpiar todo
./docker-helper.sh shell     # Acceder al terminal
./docker-helper.sh status    # Ver estado
```

---

## 📊 Monitoreo de recursos

### Ver uso de CPU y RAM
```bash
./docker-helper.sh status
```

O manualmente:
```bash
docker stats lightning-quest-dev
```

---

## 🎨 Development Workflow Recomendado

### 1. Iniciar proyecto
```bash
./docker-helper.sh dev
```

### 2. Abrir en navegador
```
http://localhost:5173
```

### 3. Hacer cambios en código
Los cambios se reflejan automáticamente ✨

### 4. Instalar dependencia (si necesitas)
```bash
./docker-helper.sh install paquete-nuevo
./docker-helper.sh build
./docker-helper.sh restart
```

### 5. Ver logs si hay errores
```bash
./docker-helper.sh logs
```

### 6. Al terminar el día
```bash
./docker-helper.sh stop
```

---

## 🏭 Producción

### Build para producción
```bash
./docker-helper.sh prod
```

Accede en: http://localhost:8080

La versión de producción usa:
- ✅ Build optimizado de Vite
- ✅ Servidor nginx
- ✅ Compresión gzip
- ✅ Cache de assets
- ✅ Seguridad headers

---

## 🧹 Limpieza

### Limpiar todo (cuidado: elimina datos)
```bash
./docker-helper.sh clean
```

Esto eliminará:
- Contenedores detenidos
- Imágenes sin usar
- Volúmenes
- Cache de build

---

## 📝 Notas importantes

⚠️ **node_modules**: Los node_modules del contenedor están separados de tu máquina local  
⚠️ **Volúmenes**: El código se monta desde tu máquina, los cambios son bidireccionales  
⚠️ **Performance**: En Mac/Windows, Docker puede ser más lento que ejecución nativa  
✅ **Consistencia**: Todos los desarrolladores usan el mismo entorno  

---

¿Problemas? Consulta [DOCKER_README.md](DOCKER_README.md) o crea un issue en GitHub.
