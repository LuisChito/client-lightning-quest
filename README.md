# ⚡ lightning Game - Cliente Web

Juego educativo interactivo sobre Lightning Network construido con React, TypeScript y Vite.

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado) 🐳

**Desarrollo con hot reload:**
```bash
docker-compose up app-dev
```
Accede en: http://localhost:5173

**Producción:**
```bash
docker-compose --profile production up app-prod
```
Accede en: http://localhost:8080

📖 **[Ver documentación completa de Docker](DOCKER_README.md)**

### Opción 2: Local

**Requisitos:**
- Node.js 20+
- npm

**Instalación:**
```bash
npm install
```

**Desarrollo:**
```bash
npm run dev
```

**Build:**
```bash
npm run build
```

**Preview:**
```bash
npm run preview
```

## 📦 Tecnologías

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Material-UI** - Component Library
- **React Flow** - Network Visualization
- **Framer Motion** - Animations
- **Zustand** - State Management
- **React Router** - Routing

## 🏗️ Estructura del Proyecto

```
src/
├── application/      # Routing
├── components/       # Componentes reutilizables
├── features/         # Lógica por misiones y módulos de dominio
├── hooks/            # Custom hooks
├── pages/            # Páginas de la aplicación
├── store/            # Estado global (Zustand)
├── theme/            # Colores y diseño
└── types/            # Tipos TypeScript
```

## 🐳 Docker

Este proyecto está completamente dockerizado con soporte para:

✅ **Hot reload** en desarrollo  
✅ **Build optimizado** para producción con nginx  
✅ **Multi-stage builds**  
✅ **Configuración lista para deploy**  

Ver [DOCKER_README.md](DOCKER_README.md) para más detalles.

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter ESLint

## 🔧 Configuración

### Vite

El proyecto usa Vite con configuración optimizada para Docker:
- Hot reload con polling
- Host configurado para contenedores
- Alias de paths para imports limpios

### ESLint

Configuración estricta con reglas para React y TypeScript.

## 📄 Licencia

Este proyecto es de código abierto.

---

## 🔌 API Backend

Este cliente consume la API del proyecto:

- https://github.com/ObedDM/lightning-ai-assistant

La URL base se configura con variables de entorno de Vite.

## 🌱 Variables de Entorno

Usa un archivo `.env` (puedes partir desde `.env.example`).

Ejemplo:

```dotenv
VITE_API_BASE=http://localhost:3000/api
```

Que significa este valor:

- `VITE_API_BASE` es la URL base que usa el frontend para llamar al backend.
- `http://localhost:3000` es el host y puerto donde corre la API en local.
- `/api` es el prefijo de rutas del backend (por ejemplo, `http://localhost:3000/api/nodes`).

Si despliegas la API en otro servidor, cambia este valor por la URL real, por ejemplo:

```dotenv
VITE_API_BASE=https://tu-backend.com/api
```

---

Desarrollado con ⚡ por el equipo DivMid
