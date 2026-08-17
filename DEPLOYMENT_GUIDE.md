# 🚀 Vercel Deployment Guide for Sundarban Naturals

This guide will help you deploy your full-stack Next.js + Prisma e-commerce platform to **Vercel** with a free cloud database (**Neon.tech** or **Supabase**) in under 3 minutes.

---

## 📋 Prerequisites:
1. Your GitHub repository: [https://github.com/asifsarc/HoneyLandingPage](https://github.com/asifsarc/HoneyLandingPage)
2. A free [Vercel](https://vercel.com) account.
3. A free cloud PostgreSQL database from **[Neon.tech](https://neon.tech)** (Recommended - 100% Free Serverless Postgres) or **[Supabase](https://supabase.com)**.

---

## 🛠️ Step 1: Create a Free Cloud PostgreSQL Database (Neon.tech)

1. Go to **[https://neon.tech](https://neon.tech)** and sign in with GitHub.
2. Click **"Create Project"** (Project Name: `sundarban-honey`).
3. Copy your connection string (it looks like this):
   ```
   postgresql://username:password@ep-cool-fog-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

## 🛠️ Step 2: Update Prisma Schema for PostgreSQL (1 Line Change)

In your [prisma/schema.prisma](file:///Users/macprom1/Project/Landing%20Pages/prisma/schema.prisma):
Change `provider = "sqlite"` to `provider = "postgresql"`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run in your local terminal to push tables and seed data to your cloud database:
```bash
DATABASE_URL="your-neon-postgres-url" npx prisma db push
DATABASE_URL="your-neon-postgres-url" npx prisma db seed
```

---

## 🛠️ Step 3: Deploy to Vercel

1. Go to **[https://vercel.com/new](https://vercel.com/new)**.
2. Select and import your GitHub repository: **`asifsarc/HoneyLandingPage`**.
3. In the **"Environment Variables"** section, add the following 3 variables:

| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://username:password@ep-xyz.neon.tech/neondb?sslmode=require` | Your Neon or Supabase cloud Postgres URL |
| `JWT_SECRET` | `sundarban-naturals-super-secret-jwt-key-2026` | Admin session security key |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` (or your domain) | Production website URL |

4. Click **"Deploy"**! 🚀

---

## ✅ Post-Deployment Verification:
- **Landing Page**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`
- **Default Admin Login**:
  - Email: `admin@sundarbannaturals.com`
  - Password: `admin123456`
