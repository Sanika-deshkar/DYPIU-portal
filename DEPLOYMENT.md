# DYPIU Portal - Linux VM Deployment Guide

This guide provides step-by-step instructions to deploy the **DYPIU Portal** on a Linux Virtual Machine (Ubuntu, Debian, RHEL, Rocky Linux, AWS EC2, GCP, Azure, DigitalOcean, etc.).

---

## 📋 Prerequisites

Ensure your Linux VM has open ports:
- **Port 80** (HTTP)
- **Port 443** (HTTPS - optional for SSL)
- **Port 22** (SSH for management)

On Ubuntu/Debian, configure firewall rules using UFW:
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🚀 Option 1: Docker Deployment (Recommended)

Docker provides the easiest, isolated, single-command deployment.

### Step 1: Install Docker & Docker Compose
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```
*(Logout and log back in for docker group changes to take effect)*

### Step 2: Clone & Deploy
```bash
# 1. Clone repository onto the VM
git clone https://github.com/Sam2485/DYPIU-portal.git
cd DYPIU-portal

# 2. Make deployment script executable
chmod +x scripts/deploy.sh

# 3. Run automated deployment script
./scripts/deploy.sh docker
```

Alternatively, run manually:
```bash
docker compose up -d --build
```

### Step 3: Verify Deployment
Check running container:
```bash
docker compose ps
docker logs -f dypiu-portal
```
Open your browser at `http://<YOUR_VM_IP>` or `http://localhost`.

---

## 🌐 Option 2: Native Nginx Deployment (No Docker)

### Step 1: Install Node.js & Nginx
```bash
sudo apt update
sudo apt install -y curl nginx git

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Step 2: Build & Copy Assets
```bash
# Clone project
git clone https://github.com/Sam2485/DYPIU-portal.git
cd DYPIU-portal

# Install dependencies and build
npm ci
npm run build

# Deploy to /var/www/dypiu-portal
sudo mkdir -p /var/www/dypiu-portal
sudo cp -r dist/* /var/www/dypiu-portal/
sudo chown -R www-data:www-data /var/www/dypiu-portal
```

### Step 3: Configure Nginx Site
```bash
# Copy site configuration
sudo cp deploy/nginx/dypiu-portal.conf /etc/nginx/sites-available/dypiu-portal

# Enable the site
sudo ln -sf /etc/nginx/sites-available/dypiu-portal /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default # remove default site

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate Setup (Let's Encrypt / Certbot)

To enable HTTPS (`https://your-domain.com`):

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d portal.dypiu.ac.in
```

Certbot will automatically configure SSL certificates and enable automatic renewals.

---

## ⚙️ Environment Variables (Optional)

If portal URLs change, copy `.env.example` to `.env` before building:

```bash
cp .env.example .env
```
Edit `.env`:
```env
VITE_FACULTY_PORTAL_URL=https://pbas.dypiu.ac.in/login
VITE_SCHOOL_PORTAL_URL=https://pbas.dypiu.ac.in/AAA/login
```
Rebuild project after changing environment variables:
```bash
npm run build
```

---

## 🔍 Health Check & Troubleshooting

- **Check Nginx Status**: `sudo systemctl status nginx`
- **Nginx Error Logs**: `sudo tail -f /var/log/nginx/error.log`
- **Docker Logs**: `docker logs dypiu-portal`
- **Test Local Endpoint**: `curl http://localhost/health`

---

## 📁 Repository Structure Overview

```
.
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Docker compose configuration
├── nginx.conf                  # Container Nginx config
├── deploy/
│   └── nginx/
│       └── dypiu-portal.conf  # Native Nginx host config
├── scripts/
│   └── deploy.sh               # Automated deployment script
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD GitHub Actions pipeline
└── DEPLOYMENT.md               # Deployment Documentation
```
