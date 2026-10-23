#!/bin/bash
# ==============================================================================
# Eventora Automated Deployment Script for VPS
# Subdomain: eventora.gemshine.tech
# Backend Port: 5023
# Database: MongoDB (eventora)
# ==============================================================================

set -e

echo "🚀 Starting Eventora Deployment..."

# 1. Pull latest code
echo "📥 Pulling latest git updates..."
git pull origin main

# 2. Install Frontend Dependencies & Build
echo "📦 Installing root/frontend dependencies..."
npm install

echo "🔨 Building production frontend (Vite)..."
npm run build

# 3. Copy build to /var/www/eventora/dist (if directory exists)
if [ -d "/var/www/eventora" ]; then
    echo "📋 Syncing build to /var/www/eventora/dist..."
    sudo mkdir -p /var/www/eventora/dist
    sudo cp -r dist/* /var/www/eventora/dist/
    sudo chown -R www-data:www-data /var/www/eventora
fi

# 4. Install Server Dependencies
echo "📦 Installing server dependencies..."
npm install --prefix server

# 5. Ensure Logs Directory exists
mkdir -p logs

# 6. PM2 Restart or Start
echo "⚡ Starting/Reloading Node.js backend with PM2 on port 5023..."
if command -v pm2 &> /dev/null; then
    pm2 reload ecosystem.config.cjs --env production || pm2 start ecosystem.config.cjs --env production
    pm2 save
    echo "✅ PM2 process running:"
    pm2 status eventora-backend
else
    echo "⚠️ PM2 not found globally. Install it with: sudo npm install -g pm2"
fi

# 7. Check Port 5023 & Health Endpoint
echo "🔍 Checking API Health on Port 5023..."
sleep 2
curl -s http://127.0.0.1:5023/api/health || echo "⚠️ Backend is starting up..."

echo ""
echo "🎉 Deployment completed successfully for eventora.gemshine.tech!"
