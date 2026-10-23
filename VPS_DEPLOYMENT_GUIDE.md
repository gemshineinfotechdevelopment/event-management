# 🚀 Eventora VPS Deployment Guide (Tamil & English)

- **Subdomain:** `eventora.gemshine.tech`
- **Backend Port:** `5023`
- **Database:** MongoDB (`eventora`)
- **Process Manager:** PM2 (`ecosystem.config.cjs`)
- **Web Server & Reverse Proxy:** Nginx with Certbot SSL

---

## 📋 Step-by-Step VPS Setup

### Step 1: Update Server & Install Node.js, Nginx & Git
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx ufw

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify versions
node -v
npm -v

# Install PM2 globally
sudo npm install -g pm2
```

---

### Step 2: Install & Start MongoDB on VPS
```bash
# Import MongoDB public GPG Key
sudo apt-get install gnupg curl -y
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and Enable MongoDB to run on boot
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

#### Create the `eventora` Database:
```bash
# Open mongosh shell
mongosh

# Inside mongosh:
use eventora
db.createCollection("enquiries")
db.enquiries.createIndex({ refCode: 1 }, { unique: true })
exit
```

---

### Step 3: Clone Project & Build
```bash
# Clone to /var/www or your home directory
sudo mkdir -p /var/www/eventora
sudo chown -R $USER:$USER /var/www/eventora

cd /var/www/eventora
git clone https://github.com/gemshineinfotechdevelopment/event-management.git .

# Install dependencies and build frontend
npm install
npm run build

# Install backend dependencies
npm install --prefix server
```

---

### Step 4: Configure Server Environment (.env)
```bash
nano server/.env
```
Ensure the file has:
```env
PORT=5023
NODE_ENV=production
CLIENT_URL=https://eventora.gemshine.tech
MONGODB_URI=mongodb://127.0.0.1:27017/eventora
DB_NAME=eventora

WHATSAPP_OWNER_NUMBER=919876543210
CALLMEBOT_API_KEY=
WHATSAPP_WEBHOOK_URL=
```
Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`).

---

### Step 5: Start Backend with PM2
```bash
# Start backend using ecosystem.config.cjs
pm2 start ecosystem.config.cjs --env production

# Save PM2 process list so it starts automatically on server reboot
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME

# Check status
pm2 status
pm2 logs eventora-backend
```

---

### Step 6: Configure Nginx for `eventora.gemshine.tech`
```bash
# Copy the provided Nginx configuration
sudo cp nginx/eventora.gemshine.tech.initial-http.conf /etc/nginx/sites-available/eventora.gemshine.tech

# Enable the site
sudo ln -s /etc/nginx/sites-available/eventora.gemshine.tech /etc/nginx/sites-enabled/

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### Step 7: Setup Free SSL with Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL for eventora.gemshine.tech
sudo certbot --nginx -d eventora.gemshine.tech
```
Certbot will automatically install the certificate, enable HTTPS, and configure HTTP to HTTPS redirect!

---

### Step 8: Allow Firewall Ports
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 🔄 Quick Update Command (Future Deployments)
Whenever you push changes to GitHub, on your VPS simply run:
```bash
cd /var/www/eventora
chmod +x deploy.sh
./deploy.sh
```
Or manually:
```bash
git pull origin main
npm install
npm run build
npm install --prefix server
pm2 reload eventora-backend
```
