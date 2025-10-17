#!/bin/bash

# Dar Lemlih Apiculture Deployment Script
# This script deploys the complete e-commerce application

set -e

echo "🍯 Dar Lemlih Apiculture - Production Deployment"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="darlemlih"
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo -e "${YELLOW}📝 Please copy env.example to .env and configure your settings:${NC}"
    echo "   cp env.example .env"
    echo "   nano .env"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running!${NC}"
    echo "Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Error: Docker Compose is not installed!${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 Checking system requirements...${NC}"

# Check available disk space (need at least 2GB)
AVAILABLE_SPACE=$(df . | tail -1 | awk '{print $4}')
if [ "$AVAILABLE_SPACE" -lt 2097152 ]; then
    echo -e "${YELLOW}⚠️  Warning: Low disk space. At least 2GB recommended.${NC}"
fi

# Check available memory
TOTAL_MEM=$(free -m | awk 'NR==2{printf "%.0f", $2}')
if [ "$TOTAL_MEM" -lt 2048 ]; then
    echo -e "${YELLOW}⚠️  Warning: Low memory. At least 2GB RAM recommended.${NC}"
fi

echo -e "${GREEN}✅ System requirements check completed${NC}"

# Create necessary directories
echo -e "${BLUE}📁 Creating necessary directories...${NC}"
mkdir -p ssl
mkdir -p uploads
mkdir -p logs

# Generate SSL certificates if they don't exist
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo -e "${YELLOW}🔐 Generating self-signed SSL certificates...${NC}"
    echo -e "${YELLOW}⚠️  For production, replace these with real certificates!${NC}"
    
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/key.pem \
        -out ssl/cert.pem \
        -subj "/C=MA/ST=Morocco/L=Casablanca/O=Dar Lemlih/CN=darlemlih.com"
    
    echo -e "${GREEN}✅ SSL certificates generated${NC}"
fi

# Stop existing containers
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker-compose -f $COMPOSE_FILE down --remove-orphans || true

# Pull latest images
echo -e "${BLUE}📥 Pulling latest images...${NC}"
docker-compose -f $COMPOSE_FILE pull

# Build custom images
echo -e "${BLUE}🔨 Building application images...${NC}"
docker-compose -f $COMPOSE_FILE build --no-cache

# Start services
echo -e "${BLUE}🚀 Starting services...${NC}"
docker-compose -f $COMPOSE_FILE up -d

# Wait for services to be healthy
echo -e "${BLUE}⏳ Waiting for services to be healthy...${NC}"
sleep 30

# Check service health
echo -e "${BLUE}🏥 Checking service health...${NC}"

# Check MySQL
if docker-compose -f $COMPOSE_FILE exec -T mysql mysqladmin ping -h localhost --silent; then
    echo -e "${GREEN}✅ MySQL is healthy${NC}"
else
    echo -e "${RED}❌ MySQL is not responding${NC}"
fi

# Check Redis
if docker-compose -f $COMPOSE_FILE exec -T redis redis-cli ping | grep -q PONG; then
    echo -e "${GREEN}✅ Redis is healthy${NC}"
else
    echo -e "${RED}❌ Redis is not responding${NC}"
fi

# Check API
if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API is healthy${NC}"
else
    echo -e "${RED}❌ API is not responding${NC}"
fi

# Check Web
if curl -f http://localhost > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Web application is healthy${NC}"
else
    echo -e "${RED}❌ Web application is not responding${NC}"
fi

# Show running containers
echo -e "${BLUE}📋 Running containers:${NC}"
docker-compose -f $COMPOSE_FILE ps

# Show logs
echo -e "${BLUE}📝 Recent logs:${NC}"
docker-compose -f $COMPOSE_FILE logs --tail=20

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}🌐 Your application is now running at:${NC}"
echo -e "   • Web Application: ${GREEN}https://localhost${NC}"
echo -e "   • API: ${GREEN}https://localhost/api${NC}"
echo -e "   • Admin Panel: ${GREEN}https://localhost/admin${NC}"
echo ""
echo -e "${BLUE}📊 Useful commands:${NC}"
echo -e "   • View logs: ${YELLOW}docker-compose -f $COMPOSE_FILE logs -f${NC}"
echo -e "   • Stop services: ${YELLOW}docker-compose -f $COMPOSE_FILE down${NC}"
echo -e "   • Restart services: ${YELLOW}docker-compose -f $COMPOSE_FILE restart${NC}"
echo -e "   • Update application: ${YELLOW}./deploy.sh${NC}"
echo ""
echo -e "${YELLOW}⚠️  Important:${NC}"
echo -e "   • Configure your domain DNS to point to this server"
echo -e "   • Replace self-signed SSL certificates with real ones"
echo -e "   • Set up regular backups of the MySQL database"
echo -e "   • Monitor application logs and performance"
echo ""
echo -e "${GREEN}🍯 Welcome to Dar Lemlih Apiculture!${NC}"
