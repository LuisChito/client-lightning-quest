#!/bin/bash

# Script de ayuda para Docker - Lightning Quest
# Uso: ./docker-helper.sh [comando]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de ayuda
print_help() {
    echo -e "${BLUE}⚡ Lightning Quest - Docker Helper${NC}"
    echo ""
    echo "Uso: ./docker-helper.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo ""
    echo -e "  ${GREEN}dev${NC}              - Iniciar en modo desarrollo (con hot reload)"
    echo -e "  ${GREEN}prod${NC}             - Iniciar en modo producción"
    echo -e "  ${GREEN}stop${NC}             - Detener todos los contenedores"
    echo -e "  ${GREEN}restart${NC}          - Reiniciar el contenedor de desarrollo"
    echo -e "  ${GREEN}logs${NC}             - Ver logs del contenedor de desarrollo"
    echo -e "  ${GREEN}build${NC}            - Reconstruir la imagen de desarrollo"
    echo -e "  ${GREEN}clean${NC}            - Limpiar contenedores, imágenes y volúmenes"
    echo -e "  ${GREEN}shell${NC}            - Acceder al shell del contenedor"
    echo -e "  ${GREEN}install [paquete]${NC} - Instalar una dependencia npm"
    echo -e "  ${GREEN}status${NC}           - Ver estado de los contenedores"
    echo ""
}

# Verificar que Docker esté instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker no está instalado${NC}"
        echo "Descarga Docker desde: https://www.docker.com/products/docker-desktop"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose no está instalado${NC}"
        exit 1
    fi
}

# Comandos
case "$1" in
    dev)
        echo -e "${GREEN}🚀 Iniciando Lightning Quest en modo desarrollo...${NC}"
        docker-compose up app-dev
        ;;
    
    prod)
        echo -e "${GREEN}🏭 Iniciando Lightning Quest en modo producción...${NC}"
        docker-compose --profile production up app-prod
        ;;
    
    stop)
        echo -e "${YELLOW}⏹️  Deteniendo contenedores...${NC}"
        docker-compose down
        echo -e "${GREEN}✓ Contenedores detenidos${NC}"
        ;;
    
    restart)
        echo -e "${YELLOW}🔄 Reiniciando contenedor de desarrollo...${NC}"
        docker-compose restart app-dev
        echo -e "${GREEN}✓ Contenedor reiniciado${NC}"
        ;;
    
    logs)
        echo -e "${BLUE}📋 Mostrando logs (Ctrl+C para salir)...${NC}"
        docker-compose logs -f app-dev
        ;;
    
    build)
        echo -e "${YELLOW}🔨 Reconstruyendo imagen...${NC}"
        docker-compose build app-dev
        echo -e "${GREEN}✓ Imagen reconstruida${NC}"
        ;;
    
    clean)
        echo -e "${RED}🧹 Limpiando Docker...${NC}"
        read -p "¿Estás seguro? Esto eliminará contenedores, imágenes y volúmenes (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose down -v
            docker system prune -af
            echo -e "${GREEN}✓ Limpieza completada${NC}"
        else
            echo -e "${YELLOW}Limpieza cancelada${NC}"
        fi
        ;;
    
    shell)
        echo -e "${BLUE}🐚 Accediendo al shell del contenedor...${NC}"
        docker-compose exec app-dev sh
        ;;
    
    install)
        if [ -z "$2" ]; then
            echo -e "${RED}❌ Debes especificar un paquete${NC}"
            echo "Uso: ./docker-helper.sh install <paquete>"
            exit 1
        fi
        echo -e "${YELLOW}📦 Instalando $2...${NC}"
        docker-compose exec app-dev npm install --legacy-peer-deps "$2"
        echo -e "${GREEN}✓ Paquete instalado${NC}"
        echo -e "${YELLOW}⚠️  Recuerda reconstruir la imagen: ./docker-helper.sh build${NC}"
        ;;
    
    status)
        echo -e "${BLUE}📊 Estado de contenedores:${NC}"
        docker-compose ps
        echo ""
        echo -e "${BLUE}💾 Uso de recursos:${NC}"
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
        ;;
    
    help|--help|-h|"")
        print_help
        ;;
    
    *)
        echo -e "${RED}❌ Comando desconocido: $1${NC}"
        echo ""
        print_help
        exit 1
        ;;
esac

exit 0
