#!/usr/bin/env bash

# Exit immediately if a command fails
set -e

echo "=========================================="
echo "      DYPIU Portal Deployment Script      "
echo "=========================================="

MODE=${1:-"docker"}

if [ "$MODE" = "docker" ]; then
    echo "[+] Deploying with Docker Compose..."
    if ! command -v docker &> /dev/null; then
        echo "[-] Docker is not installed! Please install Docker & Docker Compose first."
        exit 1
    fi

    echo "[+] Building and starting Docker container..."
    docker compose down || true
    docker compose up -d --build

    echo "[+] Checking container status..."
    docker compose ps

    echo "=========================================="
    echo "[✓] Deployment completed successfully via Docker!"
    echo "=========================================="

elif [ "$MODE" = "nginx" ]; then
    echo "[+] Deploying with Nginx (Native)..."

    # Check node & npm
    if ! command -v node &> /dev/null; then
        echo "[-] Node.js is not installed!"
        exit 1
    fi

    echo "[+] Installing dependencies..."
    npm ci

    echo "[+] Building production dist..."
    npm run build

    TARGET_DIR="/var/www/dypiu-portal"

    echo "[+] Deploying dist to ${TARGET_DIR}..."
    sudo mkdir -p ${TARGET_DIR}
    sudo rm -rf ${TARGET_DIR}/*
    sudo cp -r dist/* ${TARGET_DIR}/
    sudo chown -R www-data:www-data ${TARGET_DIR}

    echo "[+] Testing Nginx configuration..."
    sudo nginx -t

    echo "[+] Reloading Nginx..."
    sudo systemctl reload nginx

    echo "=========================================="
    echo "[✓] Deployment completed successfully via Nginx!"
    echo "=========================================="

else
    echo "[-] Unknown deployment mode: ${MODE}"
    echo "Usage: ./scripts/deploy.sh [docker|nginx]"
    exit 1
fi
