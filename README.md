# GunShop - Fullstack Starter (React + TypeScript + Express)

This is a portable starter e-commerce project (frontend + backend) for **development and learning**.
It includes:
- React + TypeScript (Vite) frontend (client/)
- Express + Node backend (server/) with JWT auth and a simple JSON "DB" (lowdb)
- Simple Cart, Products, Checkout (mock), Admin Panel with protected routes
- Uses online images (Unsplash/Pexels) — placeholders only

**Important legal & safety note:** This project is a code scaffold only. Don't use it to facilitate illegal sale or purchase of weapons. Use responsibly and follow local laws.

## How to run (on your laptop)

You need Node.js (v16+) and npm/yarn.

1. unzip the archive and `cd` into the folder.
2. Install and run server:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   The server runs at `http://localhost:4000`.

3. Install and run client:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   The client runs at `http://localhost:5173` (or as printed by Vite). It proxies API requests to `http://localhost:4000`.

## Default admin credentials
- email: admin@gunshop.test
- password: AdminPass123

## 🚀 Deployment (FREE Hosting)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete step-by-step guide to deploy:
- **Frontend** on Vercel (free)
- **Backend** on Render (free)

Quick deployment checklist:
1. ✅ Push code to GitHub
2. ✅ Deploy backend on Render with environment variables
3. ✅ Deploy frontend on Vercel with backend URL
4. ✅ Both platforms support automatic deployments on git push

## Notes
- This is a development scaffold. For production you'd:
  - Use a real database (Postgres, MongoDB, etc.)
  - Use HTTPS, secure cookie storage, proper CORS, rate-limiting, input validation
  - Add payment gateway integration (Stripe/PayPal) and follow legal requirements

Files included:
- client/ (Vite React + TypeScript + Tailwind)
- server/ (Express API with JWT + lowdb JSON storage)
