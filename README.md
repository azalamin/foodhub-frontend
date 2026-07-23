# 🍱 FoodHub | Next-Gen Multi-Role Food Marketplace (Frontend)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-FoodHub-22c55e?style=for-the-badge)](https://foodhubbd.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-v1.4-violet?style=for-the-badge)](https://www.better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-6772E5?style=for-the-badge&logo=stripe)](https://stripe.com/)

> **FoodHub** is a production-grade, multi-role full-stack food ordering marketplace built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Tailwind CSS v4**, **Stripe**, and **Better Auth**. Engineered for high performance, edge-safe role-based routing, and real-time order tracking.

---

## 📽️ Project Overview & Video Walkthrough

- **🌐 Live Web Application:** [https://foodhubbd.vercel.app](https://foodhubbd.vercel.app)
- **📹 Video Demonstration:** [Watch Video Walkthrough](https://drive.google.com/file/d/1-n7CXgJ05I44VifH7hKICdp587Y7-ANc/view?usp=sharing)

---

## ✨ Key Features & Highlights

### 🔐 1. Next.js 16 Proxy & Multi-Role Access Control (RBAC)
- **Role-Aware Parallel Routing**: Custom layout using Next.js Parallel Routes (`@customer`, `@provider`, `@admin`) under `(dashboardLayout)`.
- **Edge Proxy Middleware (`src/proxy.ts`)**: Next.js 16 file convention that intercepts requests, validates sessions with the backend, and injects user context (`x-user-role`, `x-user-id`) into request headers.
- **Automated Auth Redirection**: Authenticated users visiting `/login` or `/register` are automatically redirected to their role-specific dashboard.

### 💳 2. Payment Gateway & Checkout System
- **Dual Payment Methods**: Supports **Stripe Online Credit Card Payment** and **Cash on Delivery (COD)**.
- **Instant Payment Verification**: Client-side verification endpoint (`/api/payments/confirm`) automatically updates order status to `PAID` in the database upon Stripe charge completion.
- **BDT Currency Support**: BDT (৳) display on UI with automatic currency conversion for international Stripe card processing.

### 🍱 3. Marketplace & Order Management
- **Meal Catalog & Filtering**: Browse meals by category, restaurant provider, and availability.
- **Real-Time Order Tracking**: Interactive step progress tracker (`PLACED` → `PREPARING` → `READY` → `DELIVERED`).
- **Review & Rating System**: Customers can submit meal reviews once orders reach `DELIVERED` status.
- **Responsive Layout**: Sleek glassmorphism UI with Dark/Light theme toggle built using Tailwind CSS v4 and Radix UI.

---

## 🛠️ Tech Stack (Frontend)

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.1.6 (App Router & Turbopack) |
| **UI Library** | React 19, Radix UI Primitives, Lucide Icons |
| **Styling** | Tailwind CSS v4, `clsx`, `tailwind-merge` |
| **Form Management** | TanStack React Form & Zod Schema Validation |
| **Authentication** | Better Auth React Client (`better-auth/react`) |
| **Payments** | Stripe JS (`@stripe/stripe-js`, `@stripe/react-stripe-js`) |
| **Notifications** | Sonner Toasts |

---

## 📁 Project Structure

```text
foodhub-frontend/
├── public/                     # Static assets & favicon
├── src/
│   ├── actions/                # Server Actions (Isolated & Reusable)
│   │   ├── order.action.ts     # Order placement & status updates
│   │   ├── payment.action.ts   # Stripe intent & payment confirmation
│   │   ├── meal.action.ts      # Meal catalog data fetching
│   │   └── review.action.ts    # Rating & review submission
│   ├── app/
│   │   ├── (commonLayout)/     # Public & Auth layouts
│   │   │   ├── (auth)/         # Login, Register, Forgot & Reset Password
│   │   │   ├── (shoppingCart)/ # Checkout & Bag management
│   │   │   └── meals/          # Public meal listing & details
│   │   ├── (dashboardLayout)/  # Parallel Dashboard Routes
│   │   │   ├── @admin/         # Admin Dashboard (Users, Categories, Orders)
│   │   │   ├── @customer/      # Customer Dashboard (My Orders, Order Detail)
│   │   │   ├── @provider/      # Kitchen Provider Dashboard (Menu, Orders)
│   │   │   └── layout.tsx      # Role-based parallel route renderer
│   │   ├── payment/            # Payment success handler (/payment/success)
│   │   └── layout.tsx          # Root Layout & Theme/Cart Providers
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Sidebar, Mobile Menu
│   │   ├── modules/            # Domain UI modules (auth, checkout, meals, orders, admin)
│   │   └── ui/                 # Reusable Radix/Tailwind components (Button, Input, Badge)
│   ├── lib/
│   │   ├── auth-client.ts      # Better Auth client instance
│   │   └── utils.ts            # Classnames & formatting helpers
│   ├── providers/              # Cart Context & Theme Providers
│   ├── service/                # Business API layer (`order.service`, `payment.service`)
│   ├── types/                  # TypeScript interface definitions
│   ├── env.ts                  # T3-env environment variable validator
│   └── proxy.ts                # Next.js 16 Edge Proxy Middleware
├── next.config.ts              # Next.js configuration & API rewrites
├── package.json
└── tsconfig.json
```

---

## ⚙️ Installation & Local Setup

### 1. Prerequisites
- Node.js v20.x or higher
- `pnpm` or `npm` package manager

### 2. Clone Repository & Install Dependencies
```bash
git clone https://github.com/azalamin/foodhub-frontend.git
cd foodhub-frontend
pnpm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
BACKEND_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:4000
AUTH_URL=http://localhost:4000/api/auth

NEXT_PUBLIC_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 Author

**Al Amin Sheikh**  
*Full-Stack Web Developer (MERN / Next.js / TypeScript)*

- **LinkedIn:** [linkedin.com/in/azalamin](https://www.linkedin.com/in/azalamin/)
- **Live Marketplace:** [foodhubbd.vercel.app](https://foodhubbd.vercel.app)
