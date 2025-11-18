# 🚀 Deployment Guide - GunShop E-commerce

This guide will help you deploy the frontend on **Vercel** (free) and the backend on **Render** (free).

## 📋 Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. Render account (sign up at https://render.com)
4. Git installed on your computer

---

## 🗄️ Step 1: Push Code to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   cd /Users/kafilcodes/Downloads/gunshop-ecommerce-final
   git init
   git add .
   git commit -m "Initial commit - GunShop e-commerce"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it: `gunshop-ecommerce` (or your preferred name)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gunshop-ecommerce.git
   git branch -M main
   git push -u origin main
   ```

   git remote add origin https://github.com/kafilcodes/gunshop-ecommerce-final-demo.git
git branch -M main
git push -u origin main

---

## 🖥️ Step 2: Deploy Backend on Render (FREE)

### 2.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your `gunshop-ecommerce` repository

### 2.2 Configure Service

Fill in these settings:

- **Name**: `gunshop-backend` (or your choice)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Generate a strong secret (see below) |
| `PORT` | `4000` (Render will override this) |

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and use it as your `JWT_SECRET`.

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Copy your backend URL (e.g., `https://gunshop-backend.onrender.com`)

### ⚠️ Important Notes for Render:

- **Free tier sleeps after 15 minutes of inactivity** - first request may take 30-50 seconds
- **Data persistence**: The db.json file will reset when the service restarts (every 24-48 hours on free tier)
- **For production**: Consider upgrading to paid tier or using a real database (MongoDB Atlas, PostgreSQL)

---

## 🌐 Step 3: Deploy Frontend on Vercel (FREE)

### 3.1 Import Project

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `gunshop-ecommerce` repository
4. Click **"Import"**

### 3.2 Configure Project

- **Framework Preset**: Vite (should auto-detect)
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://gunshop-backend.onrender.com/api`) |

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build and deployment (1-2 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### 3.5 Update vercel.json

**Important**: After first deployment, update `/client/vercel.json`:

Replace this line:
```json
"destination": "https://your-backend-name.onrender.com/api/:path*"
```

With your actual Render URL:
```json
"destination": "https://gunshop-backend.onrender.com/api/:path*"
```

Then commit and push:
```bash
git add client/vercel.json
git commit -m "Update backend URL in vercel config"
git push
```

Vercel will automatically redeploy.

---

## ✅ Step 4: Verify Deployment

### Test Backend (Render)
```bash
# Test products endpoint
curl https://your-backend.onrender.com/api/products

# Should return JSON array of products
```

### Test Frontend (Vercel)
1. Visit your Vercel URL
2. You should see the homepage with products
3. Try adding items to cart
4. Try logging in with admin credentials:
   - Email: `admin@gunshop.test`
   - Password: `AdminPass123`

---

## 🔧 Troubleshooting

### Issue: Frontend can't connect to backend

**Solution**: 
1. Check CORS is enabled in server (it already is in `server/index.js`)
2. Verify `VITE_API_URL` environment variable in Vercel
3. Check browser console for errors

### Issue: Backend returns 404

**Solution**:
- Ensure API routes start with `/api` in the backend
- Check the rewrite rule in `vercel.json` matches your backend URL

### Issue: Admin login not working

**Solution**:
- Database resets on Render free tier restarts
- Admin user is auto-created on server start
- Check server logs in Render dashboard

### Issue: Slow backend response on first request

**Solution**:
- This is normal on Render's free tier (cold start)
- Service sleeps after 15 min inactivity
- Consider using a cron job to keep it awake or upgrade to paid tier

---

## 📊 Database Persistence (Production Upgrade)

For production, replace LowDB with a real database:

### Option 1: MongoDB Atlas (Free Tier Available)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Install `mongoose`: `npm install mongoose`
4. Update server code to use MongoDB

### Option 2: Render PostgreSQL (Free Tier Available)
1. Create PostgreSQL database on Render
2. Install `pg`: `npm install pg`
3. Update server code to use PostgreSQL

### Option 3: Supabase (Free Tier Available)
1. Sign up at https://supabase.com
2. Create project and tables
3. Use Supabase client library

---

## 🔐 Security Recommendations

Before going live with real products:

1. ✅ Use environment variables (done)
2. ✅ Use strong JWT secrets (done)
3. ⚠️ Add rate limiting (not implemented)
4. ⚠️ Add input validation (minimal)
5. ⚠️ Use HTTPS only (Vercel/Render provide this)
6. ⚠️ Implement proper authentication (basic JWT done)
7. ⚠️ Add payment gateway (not implemented)
8. ⚠️ Follow local laws for commerce

---

## 💰 Cost Breakdown

### FREE Forever (with limitations):
- ✅ Vercel: 100GB bandwidth/month, unlimited deployments
- ✅ Render: 750 hours/month (enough for 1 service 24/7)
- ⚠️ Backend sleeps after inactivity
- ⚠️ Database resets on restart

### Recommended Paid Upgrades:
- Render Standard ($7/month): Always on, no cold starts
- MongoDB Atlas Shared ($0 - $9/month): Persistent database
- Vercel Pro ($20/month): Custom domains, better performance

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
3. Check browser console for frontend errors

---

## 🎉 Success!

Your e-commerce site should now be live on:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Admin credentials:
- Email: `admin@gunshop.test`
- Password: `AdminPass123`

**Remember**: This is a learning/demo project. For production use, implement proper security, payment processing, and database persistence.

---

## 🔄 Updating Your Deployment

To deploy updates:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Vercel and Render will automatically redeploy!
```

Both platforms support automatic deployments from GitHub. Every push to `main` triggers a new deployment.
