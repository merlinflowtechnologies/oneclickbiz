# OneClickBiz Dedicated VPS Server Setup & Deployment Guide

This guide walks you through setting up and deploying **OneClickBiz** on a dedicated Linux VPS (Ubuntu 22.04 / 24.04 LTS) with **PostgreSQL 16, Node.js 20 LTS, Nginx Reverse Proxy, Let's Encrypt SSL, and PM2 Process Manager**.

---

## 1. Initial Server Preparation

Log in to your server as `root` via SSH:
```bash
ssh root@YOUR_SERVER_IP
```

Update system repositories:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw fail2ban build-essential nginx
```

### Configure Firewall (UFW)
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 2. Install Node.js 20 LTS & PM2

```bash
# Install Node.js 20 from NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v  # Expected: v20.x.x
npm -v

# Install PM2 globally
sudo npm install -g pm2
```

---

## 3. Install & Configure PostgreSQL 16

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and create database & user
sudo -u postgres psql
```

Inside the PostgreSQL terminal:
```sql
CREATE DATABASE oneclickbiz_db;
CREATE USER oneclickbiz_user WITH ENCRYPTED PASSWORD 'YOUR_STRONG_DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE oneclickbiz_db TO oneclickbiz_user;
ALTER DATABASE oneclickbiz_db OWNER TO oneclickbiz_user;
\q
```

---

## 4. Clone & Configure Application

```bash
# Create directory for app
sudo mkdir -p /var/www/oneclickbiz
sudo chown -R $USER:$USER /var/www/oneclickbiz

# Clone repository into folder
cd /var/www/oneclickbiz
# git clone <YOUR_GIT_REPO_URL> .

# Install dependencies
npm install --production=false
```

### Configure Production Environment Variables
Create `/var/www/oneclickbiz/.env`:
```bash
cp .env.production.example .env
nano .env
```

Set your production values:
```ini
DATABASE_URL="postgresql://oneclickbiz_user:YOUR_STRONG_DB_PASSWORD@localhost:5432/oneclickbiz_db?schema=public"
JWT_SECRET="GENERATE_A_64_CHAR_HEX_SECRET"
NEXT_PUBLIC_APP_URL="https://oneclickbiz.in"
NODE_ENV="production"
PORT=3000
```

---

## 5. Run Database Migrations & Initial Seeding

```bash
# Push schema to PostgreSQL database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed Super Admin and default platform settings
npx prisma db seed
```

*(Default Super Admin credentials seeded: `admin@oneclickbiz.in` / `oneclickbiz2026@`)*

---

## 6. Build the Application

```bash
npm run build
```

---

## 7. Start the Service with PM2 (Cluster Mode)

Start PM2 cluster:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*(Copy and paste the command outputted by `pm2 startup` to enable automatic reboots).*

Check status:
```bash
pm2 status
pm2 logs oneclickbiz-app
```

---

## 8. Configure Nginx Reverse Proxy & SSL

Copy example Nginx configuration:
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/oneclickbiz.in
sudo nano /etc/nginx/sites-available/oneclickbiz.in
```

Replace `oneclickbiz.in` with your domain name.

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/oneclickbiz.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Install SSL Certificate (Certbot Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d oneclickbiz.in -d www.oneclickbiz.in
```

Certbot will automatically configure auto-renewal via systemd timers.

---

## 9. Verification & Maintenance Commands

| Action | Command |
| :--- | :--- |
| **Check App Logs** | `pm2 logs oneclickbiz-app` |
| **Restart App** | `pm2 reload oneclickbiz-app` |
| **Monitor Performance**| `pm2 monit` |
| **1-Click Pull & Update** | `cd /var/www/oneclickbiz && git pull origin main && npm run build && pm2 restart all` |
| **Database Backup** | `pg_dump -U oneclickbiz_user -d oneclickbiz_db -F c -b -v -f backup_$(date +%F).dump` |
| **Database Restore**| `pg_restore -U oneclickbiz_user -d oneclickbiz_db -v backup_file.dump` |
| **Prisma Studio (GUI)**| `npx prisma studio --port 5555` |

---

🚀 **Your OneClickBiz production server is now active, ultra-fast, and running on dedicated bare-metal infrastructure!**
