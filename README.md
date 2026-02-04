# 🍱 FoodHu

### Next-Gen Multi-Role Food Marketplace

<p align="center">
  <a href="https://foodhubbd.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-FoodHub-22c55e?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Relational-blue?style=for-the-badge&logo=postgresql" />
</p>

<p align="center">
  <b>A premium, production-ready food marketplace built for scale, security, and speed.</b><br/>
  Customers order. Providers sell. Admins control. Everything just works.
</p>

---

## ✨ What is FoodHub?

**FoodHub** is not a demo app — it’s a **real-world, multi-role food marketplace** engineered to handle complex business logic, secure authentication, and relational data at scale.

Instead of MongoDB, FoodHub uses **PostgreSQL** for strong relational integrity, making it suitable for real production use where data consistency actually matters.

---

## 🔥 Core Highlights

### 🔐 Authentication & Access Control (Enterprise-Grade)

- **Multi-Role System:** `ADMIN`, `PROVIDER`, `CUSTOMER`
- **Role-Based Redirects:** Smart middleware auto-routes users to the correct dashboard
- **Email Verification Flow:** Built with **Better Auth** to block fake & spam accounts
- **Edge-Safe Security:** Unauthorized users are stopped at middleware level

> Result: zero unauthorized dashboard access, zero chaos.

---

### 🧠 Data Architecture & Performance

- **Prisma ORM:** Clean, scalable relations between  
  `User → ProviderProfile → Meals → Categories`
- **PostgreSQL Indexing:** Fast filtering, searching, and pagination
- **Dynamic Seeding Engine:**
  - Fetches live Provider & Category IDs
  - Prevents `P2003` foreign-key crashes
  - Seeds **40+ meals** & **30+ cuisines** safely

> Built like a system, not a script.

---

### 🎨 Premium UI / UX Experience

- **Explore by Cuisine:** Dynamic, database-driven categories
- **Cinematic Food Visuals:** Hero-style, high-impact imagery
- **Professional Currency Formatting:**  
  `17,66,322.22` (South Asian standard)
- **Modern Component System:** Shadcn/UI + Tailwind CSS

> Clean. Fast. Conversion-focused.

---

## 🧰 Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI**
- **Lucide React**

### Backend

- **Next.js Server Actions**
- **Next.js Middleware**
- **Better Auth**

### Database

- **PostgreSQL** (Vercel Postgres / Supabase)
- **Prisma ORM**

---

## 🗂️ Project Structure

```text
src/
├── actions/                     # Server Actions (isolated & reusable)
│   ├── auth.actions.ts
│   ├── meal.actions.ts
│   ├── order.actions.ts
│   └── review.actions.ts

├── app/
│   ├── (public)/                # Public routes (no auth required)
│   │   ├── page.tsx             # Home
│   │   ├── meals/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│
│   ├── (auth)/                  # Auth-only routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   └── layout.tsx
│
│   ├── (dashboard)/             # Protected dashboards
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   └── users/
│   │   ├── provider/
│   │   │   ├── page.tsx
│   │   │   └── meals/
│   │   ├── customer/
│   │   │   ├── page.tsx
│   │   │   └── orders/
│   │   └── layout.tsx
│
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Global loader
│   ├── not-found.tsx
│   └── globals.css
│
├── components/
│   ├── layout/                  # Layout-specific components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│
│   ├── common/                  # Shared components
│   │   ├── EmptyState.tsx
│   │   ├── Pagination.tsx
│   │   └── Modal.tsx
│
│   ├── features/                # Feature-based UI (🔥 important)
│   │   ├── auth/
│   │   ├── meals/
│   │   ├── orders/
│   │   ├── reviews/
│   │   └── provider/
│
│   └── ui/                      # Shadcn / base UI
│       ├── button.tsx
│       ├── input.tsx
│       └── dialog.tsx
│
├── lib/                         # Core utilities
│   ├── auth.ts
│   ├── prisma.ts
│   ├── session.ts
│   └── format.ts
│
├── services/                    # Business logic layer
│   ├── auth.service.ts
│   ├── meal.service.ts
│   ├── order.service.ts
│   └── review.service.ts
│
├── schemas/                     # Zod validation
│   ├── auth.schema.ts
│   ├── meal.schema.ts
│   └── order.schema.ts
│
├── providers/                   # React Context Providers
│   ├── ThemeProvider.tsx
│   ├── AuthProvider.tsx
│   └── CartProvider.tsx
│
├── constants/
│   ├── roles.ts
│   ├── routes.ts
│   └── config.ts
│
├── types/                       # Global TS types
│   ├── auth.ts
│   ├── meal.ts
│   └── order.ts
│
├── routes/                      # Route protection logic
│   ├── protected.routes.ts
│   └── public.routes.ts
│
├── middleware.ts                # Role-based access control
├── env.ts                       # Typed env validation
└── README.md

```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/azalamin/foodhub-frontend.git
cd foodhub-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

Create a .env file in the root directory:

```bash
DATABASE_URL=your_postgres_url
BETTER_AUTH_SECRET=your_secret_key
SMTP_HOST=your_smtp_host
SMTP_USER=your_email
SMTP_PASS=your_password

```

### 4️⃣ Database Sync & Seed

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 5️⃣ Run the Project

```bash
npm run dev
```

Open 👉 http://localhost:3000

🧩 Technical Challenges Solved
🧠 Dynamic Data Mapping

- Built a smart seeding engine that dynamically resolves Provider and Category IDs to eliminate foreign-key conflicts (P2003).

- ⚡ Edge Middleware Optimization

- Session handling optimized for Edge Runtime to deliver instant, role-aware redirects with zero lag.

- 📧 Email Verification Race Conditions

- Fixed token expiration edge cases in custom verification flows — no broken links, no false negatives.

#### 🌍 Live Demo

👉 https://foodhubbd.vercel.app

### 👨‍💻 Author

Al Amin Sheikh
Full-Stack Web Developer (MERN / Next.js / Prisma)

🔗 LinkedIn: [Al Amin Sheikh](https://www.linkedin.com/in/azalamin/)

🌐 Live Project: [View](https://foodhubbd.vercel.app)

<p align="center"> <b>Built with obsession for clean architecture, performance, and real-world scalability.</b> </p>
