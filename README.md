<div align="center">

# 🚀 OneClickBiz (Business Made Simpler)
**Next-Generation Digital Identity, WhatsApp Mini-Stores, Booking Calendars & Cloud SaaS Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Cashfree](https://img.shields.io/badge/Payment%20Gateway-Cashfree%20Live-brightgreen)](https://www.cashfree.com/)

[**Live Platform: oneclickbiz.in**](https://oneclickbiz.in) • [**Live Card Demo: oneclickbiz.in/v/alex-rivera**](https://oneclickbiz.in/v/alex-rivera)

</div>

---

## 🌟 Overview

**OneClickBiz** is a full-stack multi-tenant SaaS platform built to replace traditional paper business cards with high-converting, interactive smart digital profiles (`/v/[slug]`), conversational WhatsApp mini-stores, appointment scheduling calendars, business brochure makers, and blog publishing suites.

Developed and maintained by **Merlinflow Technologies Pvt Ltd**.

---

## ✨ Core Features & Capabilities

### 1. 📇 Interactive Smart Digital vCards (`/v/[slug]`)
* **1-Click Contact Save (`.vcf`)**: Instantly adds full contact cards (name, phone, email, company, designation, website, social handles) directly into iOS and Android address books without typing.
* **5 Curated Design Themes**:
  * `Modern Glass` (Indigo glow + dark glassmorphism)
  * `Deep Dark` (Obsidian + Slate contrast)
  * `Glassmorphic Clean` (Frost backdrop filters)
  * `Emerald Dark` (High-trust fintech theme)
  * `Sunset Glow` (Vibrant warm gradients)
* **Social Hub & Verified Links**: WhatsApp, Phone, Email, Telegram, LinkedIn, Instagram, X/Twitter, YouTube, GitHub, and Custom Portfolios.
* **Offline PWA Installation**: Add smart cards as standalone apps to home screens with 1 click.

### 2. 🛍️ WhatsApp Conversational Mini-Store
* Integrated product catalog with high-resolution imagery, pricing, and stock tracking.
* In-card shopping cart with 1-click checkout that generates formatted WhatsApp order messages sent directly to the business owner.

### 3. 📅 Appointment & Slot Booking Engine
* Interactive calendar with customized consultation time slots.
* Double-booking protection and instant confirmation alerts over WhatsApp/Email.

### 4. 📄 Brochure & Visiting Card Studios
* Multi-page PDF brochure builder with 300 DPI print-ready exports.
* Visiting card generator with dynamic vector QR codes.

### 5. ✍️ Blog Studio & Content Suite
* SEO-optimized rich text blog creator with tags, featured covers, and search engine metadata.

### 6. 🔒 Strict Multi-Tier Plan Paywalls
* **Basic (₹999/yr)**: 1 Dynamic vCard, Core Analytics, Lead Capture, Email Signature.
* **Pro (₹1,599/yr)**: Everything in Basic + WhatsApp Mini-Store (25 products), Booking Engine, Brochure Studio, CSV Lead Exports, 1 Custom CNAME Domain.
* **Advanced (₹2,199/yr)**: Everything in Pro + Blog Studio, Unlimited Products, 5 Custom CNAME Domains, Priority 24/7 VIP Support.

### 7. 🛡️ Strict Portal Separation (Admin vs Business)
* **Super Admin Console (`/admin`)**: Multi-metric telemetry, user management, plan overrides, subscription revenue tracking, and root system cleanup.
* **Business User Portal (`/dashboard`)**: Account settings, profile editor, WhatsApp store, bookings, leads pipeline, and GST invoice downloads.
* Protected by edge Next.js middleware and API authorization guards preventing cross-portal unauthorized access.

### 8. 💳 Cashfree Payment Gateway & Billing Engine
* Automated order creation and verification against Cashfree PG APIs.
* Instant plan activation with automated GST tax invoices generated and downloadable via PDF.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router, Turbopack, Edge Middleware)
* **UI & Animation**: React 19, Tailwind CSS v4, Lucide React, Framer Motion, Canvas Confetti
* **Database & ORM**: PostgreSQL 16, Prisma ORM 5.22
* **Authentication**: HTTP-Only JWT Cookie Auth (`jsonwebtoken`, `bcryptjs`), Google OAuth SSO
* **PDF & Media**: `jspdf`, `jspdf-autotable`, `qrcode`, Pillow
* **Payment Processing**: Cashfree Payment Gateway SDK (v3)
* **Deployment & Process Manager**: Hostinger VPS (Ubuntu 24.04), Nginx Reverse Proxy with SSL (Certbot), PM2 Process Manager

---

## 📁 Repository Structure

```text
oneclickbiz-app/
├── prisma/
│   ├── schema.prisma              # PostgreSQL schema (User, Org, Profile, Blog, Booking, Order)
│   ├── seed.js                    # Database seed script for demo & default entities
│   └── cleanup.js                 # Database maintenance & cleanup utility
├── public/
│   ├── logo.png                   # Official 3D OneClickBiz brand logo
│   ├── favicon.png / favicon.ico  # Brand favicons
│   └── manifest.json              # Progressive Web App (PWA) configuration
├── src/
│   ├── app/
│   │   ├── admin/                 # Super Admin Console (Telemetry, Revenue, Users, Settings)
│   │   ├── api/                   # Serverless API routes (Auth, Profiles, Cashfree, Telemetry)
│   │   ├── dashboard/             # Business Portal (Builder, Store, Bookings, Blogs, Settings)
│   │   ├── login/ & signup/       # Business Authentication & Plan Checkout
│   │   ├── v/[slug]/              # Public Live Digital Smart Card Pages
│   │   ├── privacy/, terms/, etc. # Strict SaaS Legal & Compliance Pages
│   │   ├── globals.css            # Root design tokens and themes
│   │   └── layout.tsx             # Root layout with font & metadata
│   ├── components/
│   │   ├── blog/                  # Blog publishing studio
│   │   ├── brochure/              # Brochure PDF creator
│   │   ├── builder/               # Live profile builder & theme editor
│   │   ├── cards/                 # Visiting card & wallet pass studios
│   │   ├── common/                # Reusable PlanLockGate, PWA prompts, modals
│   │   ├── navigation/            # Main Navbar & Footer
│   │   └── templates/             # Public vCard view engines
│   ├── lib/
│   │   ├── auth.ts                # JWT authentication & session verification
│   │   ├── cashfree-client.ts     # Cashfree PG checkout integration
│   │   ├── pdf-export.ts          # Invoice and brochure PDF exporter
│   │   ├── plan-guards.ts         # Multi-tier subscription limits & lock flags
│   │   └── prisma.ts              # Global Prisma client singleton
│   └── middleware.ts              # Edge middleware for strict portal separation
├── .env.example                   # Environment configuration template
├── DEPLOYMENT_GUIDE.md            # Hostinger VPS deployment guide
├── ecosystem.config.js            # PM2 production configuration
└── nginx.conf.example             # Nginx reverse proxy configuration template
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* **Node.js**: v20.x or higher
* **npm**: v10.x or higher
* **PostgreSQL**: Local or cloud database instance (e.g. Supabase, Neon, or local Postgres)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/merlinflowtechnologies/oneclickbiz.git
cd oneclickbiz/oneclickbiz-app
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your database URL and secrets:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/oneclickbiz?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="your_secret_key"
ADMIN_EMAIL="admin@oneclickbiz.in"
CASHFREE_APP_ID="your_cashfree_app_id"
CASHFREE_SECRET_KEY="your_cashfree_secret_key"
CASHFREE_ENV="TEST"
```

### 3. Setup Database Schema
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Production Deployment (Hostinger VPS)

### 1. Build and Test
```bash
npm run build
```

### 2. Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 3. Setup Nginx & SSL
Link `nginx.conf.example` to `/etc/nginx/sites-available/oneclickbiz` and enable Certbot SSL:
```bash
sudo certbot --nginx -d oneclickbiz.in -d www.oneclickbiz.in
sudo systemctl restart nginx
```

For complete step-by-step VPS instructions, refer to [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md).

---

## 📄 License & Copyright

© 2026 **OneClickBiz**. All rights reserved.  
Engineered & Maintained by **Merlinflow Technologies Pvt Ltd**.
