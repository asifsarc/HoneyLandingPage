# 🍯 Sundarban Naturals — High-Converting E-Commerce Funnel & Admin System

A high-converting, single-page e-commerce checkout landing page and full-stack Admin Management System for selling **Sundarban Raw Mangrove Honey (সুন্দরবনের প্রাকৃতিক মধু)**, built with Next.js App Router, Tailwind CSS, Framer Motion, Prisma ORM, Server Actions, and Advanced Analytics (Meta Pixel, CAPI, GTM, GA4).

---

## 🌟 Key Features

### 🛒 Customer-Facing Landing Funnel
- **High-Converting UX**: Mobile-first single-page checkout flow with persuasive Bengali copywriting.
- **Micro-Interactions & Animations**: Powered by Framer Motion and Lucide icons.
- **Dynamic Scarcity & Social Proof**: Urgent live stock counter, urgency banner, and simulated Bangladeshi buyer toasts.
- **Interactive Single-Page Checkout**: Form validation with React Hook Form + Zod, automated Cash on Delivery (COD) calculation, and zero-page-reload order submission.
- **Order Success Page**: Confetti celebration, itemized bill breakdown, and printable customer receipt.

### 🛡️ Admin Dashboard & Management System (`/admin`)
- **Secure Authentication**: JWT session-based auth with Edge Middleware protection.
- **Analytics & Overview (`/admin/dashboard`)**: Real-time revenue metrics, today's sales, pending order alert pill, and package performance breakdown.
- **Orders Management (`/admin/orders`)**: Status filter tabs (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`), search, bulk actions, and order slide-over drawer.
- **Courier & Tracking Setup**: 1-Click Fast API dispatch for Steadfast & Pathao, custom tracking code generator, and live tracking card for customers.
- **Printable Invoices & Packing Slips**: Print-optimized A4 & POS receipt layout with customer information, item breakdown, and COD total.
- **Package & Pricing Management (`/admin/packages`)**: Manage pricing, discounts, free gift promotions, and active/draft state.
- **Dynamic Customer Reviews (`/admin/reviews`)**: Add, edit, or toggle verified customer testimonials displayed on the landing page.
- **Marketing & Tracking Hub (`/admin/marketing`)**:
  - Meta / Facebook Pixel & Server-Side Conversions API (CAPI) with `event_id` deduplication.
  - Google Tag Manager (GTM) & Google Analytics 4 (GA4) with Enhanced Ecommerce DataLayer events.
  - TikTok Pixel & Custom `<head>` / `<body>` script injections.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components & Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & ORM**: Prisma ORM (SQLite for local development, PostgreSQL ready)
- **State & Forms**: React Hook Form, Zod
- **Animations & FX**: Framer Motion, Canvas Confetti
- **Icons**: Lucide React
- **Auth**: Jose (JWT), BcryptJS

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/asifsarc/HoneyLandingPage.git
cd HoneyLandingPage
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### 4. Database Migration & Seeding
```bash
npx prisma db push
npx prisma db seed
```

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the landing page.

---

## 🔑 Admin Access

- **Admin Login URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Email**: `admin@sundarbannaturals.com`
- **Default Password**: `admin123456`

---

## 📦 Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database models (Order, Package, Customer, Review, Settings)
│   └── seed.ts             # Initial seed data
├── src/
│   ├── actions/            # Server Actions (Auth, Orders, Packages, Reviews, Courier, Marketing)
│   ├── app/
│   │   ├── admin/          # Protected Admin Dashboard routes
│   │   ├── order-success/  # Customer order thank-you page
│   │   ├── layout.tsx      # Root layout with script injection
│   │   └── page.tsx        # Dynamic landing page Server Component
│   ├── components/
│   │   ├── admin/          # Admin UI components (Sidebar, Tables, Drawers, Invoices)
│   │   └── ...             # Landing page sections (Hero, Packages, Checkout, Reviews)
│   ├── lib/                # Utilities (Prisma client, Auth, Tracking, Courier, Video parser)
│   └── middleware.ts       # Edge route protector for /admin/*
└── public/images/          # Product and harvesting photography
```

---

## 📄 License

This project is licensed under the MIT License.
