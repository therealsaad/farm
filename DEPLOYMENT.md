# FunFarm Deployment Guide

Complete guide to deploy FunFarm to production environments.

---

## Overview

FunFarm consists of two independent applications:
1. **Frontend** - Next.js React app (deploy to Vercel)
2. **Backend** - Express.js API (deploy to Heroku, Railway, Render, etc.)

Both can be deployed independently and communicate via HTTPS.

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub repository with FunFarm code

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial FunFarm commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/funfarm.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Framework: Next.js (auto-detected)
5. Root Directory: `./` (current)
6. Build Command: `npm run build`
7. Start Command: `npm start`

### Step 3: Environment Variables
In Vercel Dashboard → Settings → Environment Variables

Add:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Step 4: Deploy
Click "Deploy"

**Result:** Frontend deployed at `https://your-project.vercel.app`

---

## Backend Deployment (Heroku)

### Prerequisites
- Heroku account (free tier or paid)
- Heroku CLI installed
- MongoDB Atlas account

### Step 1: Create Heroku App
```bash
heroku login
heroku create funfarm-api
```

### Step 2: Set Environment Variables
```bash
heroku config:set PORT=5000
heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/funfarm
heroku config:set JWT_SECRET=your_super_secret_jwt_key_12345
heroku config:set JWT_EXPIRE=24h
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-project.vercel.app
```

### Step 3: Deploy Backend
```bash
# Make sure you're in project root
cd ..  # if in backend folder

# Push to Heroku
git push heroku main
```

### Step 4: Verify Deployment
```bash
heroku open
# Or visit: https://funfarm-api.herokuapp.com/api/health
```

**Result:** Backend deployed at `https://funfarm-api.herokuapp.com`

---

## Backend Deployment (Railway)

### Prerequisites
- Railway account (free at https://railway.app)
- GitHub repository

### Step 1: Connect Repository
1. Go to https://railway.app
2. Create new project
3. Deploy from GitHub
4. Select repository and `main` branch

### Step 2: Add MongoDB
1. In Railway project dashboard
2. Click "Add" → "Database" → "MongoDB"
3. Auto-generates MONGODB_URI

### Step 3: Environment Variables
Add in Railway dashboard:
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=24h
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app
```

### Step 4: Configure Procfile
Create `Procfile` in backend directory:
```
web: npm start
```

### Step 5: Deploy
Railway auto-deploys on git push

**Result:** Backend deployed at auto-generated Railway URL

---

## Backend Deployment (Render)

### Prerequisites
- Render account (free at https://render.com)
- GitHub repository
- MongoDB Atlas account

### Step 1: Create Web Service
1. Go to https://render.com/dashboard
2. New → Web Service
3. Connect GitHub repository
4. Select repository and `main` branch

### Step 2: Configure
- Name: `funfarm-api`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: Free

### Step 3: Environment Variables
Add in Render dashboard:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=24h
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app
CORS_ORIGIN=https://your-project.vercel.app
```

### Step 4: Deploy
Render auto-deploys on git push

**Result:** Backend deployed at `https://funfarm-api.onrender.com`

---

## MongoDB Atlas Setup (Production)

### Step 1: Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create organization and project
3. Create M0 Free cluster
4. Choose region closest to you

### Step 2: Create Database User
1. Security → Database Access
2. Add New Database User
3. Username: `admin`
4. Password: `strong_password_here`
5. Role: `Atlas admin`

### Step 3: Configure IP Whitelist
1. Security → Network Access
2. Add IP Address
3. Production: Add specific IPs (or 0.0.0.0/0 for testing)

### Step 4: Get Connection String
1. Clusters → Connect
2. Choose "Drivers"
3. Copy connection string
4. Replace `<username>` and `<password>`

Example:
```
mongodb+srv://admin:password@cluster0.mongodb.net/funfarm?retryWrites=true&w=majority
```

### Step 5: Add to Deployment Platform
- Vercel: Not needed (backend only)
- Heroku: `heroku config:set MONGODB_URI=...`
- Railway: Add as environment variable
- Render: Add as environment variable

---

## Custom Domain Setup

### Frontend (Vercel)
1. Vercel Dashboard → Domains
2. Add custom domain
3. Update DNS records
4. Wait for verification (usually instant)

### Backend (Heroku)
1. Add paid plan (custom domains require)
2. Heroku Dashboard → Settings → Domains
3. Add domain
4. Update DNS with provided records

---

## SSL/HTTPS

### Frontend (Vercel)
✅ Automatic - All Vercel projects get free SSL

### Backend
- **Heroku:** ✅ Automatic HTTPS (*.herokuapp.com)
- **Railway:** ✅ Automatic HTTPS
- **Render:** ✅ Automatic HTTPS
- **Custom Domain:** Use CloudFlare or similar for free SSL

---

## Performance Optimization

### Frontend
```bash
# Build optimization
npm run build

# Analyze bundle
npm install -D @next/bundle-analyzer
# See next.config.mjs for configuration
```

### Backend
- Add Redis for caching (optional)
- Add database indexes
- Enable gzip compression
- Use CDN for static files

---

## Monitoring & Logging

### Frontend (Vercel)
- Built-in analytics
- Error tracking via Sentry
- Performance monitoring

### Backend Logging
```bash
# Heroku logs
heroku logs --tail

# Railway logs
railway logs

# Render logs
render logs
```

### Error Tracking
Add Sentry:
```bash
npm install @sentry/node
```

Configure in server.js:
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});
```

---

## Database Backups

### MongoDB Atlas
1. Go to Cluster → Backup
2. Enable automated backups
3. Configure backup schedule
4. Download backups when needed

### Manual Backup
```bash
# Dump database
mongodump --uri "mongodb+srv://..." --out backup/

# Restore database
mongorestore --uri "mongodb+srv://..." backup/
```

---

## Troubleshooting Deployment

### "Connection refused"
- Backend not running
- Wrong MONGODB_URI
- Firewall/IP whitelist issue
- Check backend logs

### "CORS error"
- FRONTEND_URL not set in backend
- Frontend URL doesn't match
- Backend not responding

### "Database connection timeout"
- MongoDB cluster not active
- Wrong connection string
- IP not whitelisted
- Network issues

### "Build failed"
- Missing environment variables
- Dependency issue
- Build command error
- Check deployment logs

---

## Production Checklist

- [ ] All environment variables set
- [ ] HTTPS enabled on both
- [ ] Database backups configured
- [ ] CORS origins configured correctly
- [ ] JWT secret changed (strong random key)
- [ ] Node environment set to production
- [ ] Error logging configured
- [ ] Monitoring set up
- [ ] Custom domain configured (optional)
- [ ] Rate limiting added (optional)
- [ ] Database indexes created
- [ ] API tested with real data

---

## Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] Passwords hashed with bcryptjs
- [ ] HTTPS only (no HTTP)
- [ ] CORS restricted to specific domain
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] No sensitive data in logs
- [ ] Database credentials not exposed
- [ ] API keys rotated periodically
- [ ] SQL injection prevention (using Mongoose)

---

## Scaling (Future)

### Database
- Add read replicas
- Enable sharding for large datasets
- Add caching layer (Redis)

### Backend
- Use load balancer
- Horizontal scaling
- Message queue (RabbitMQ)
- Async job processing

### Frontend
- Static asset CDN
- Image optimization
- Code splitting
- Caching strategies

---

## Cost Estimation (Monthly)

| Service | Free Tier | Paid (Estimate) |
|---------|-----------|-----------------|
| Vercel | $0 | $20 |
| MongoDB Atlas | $0 | $50+ |
| Heroku | DEPRECATED | $50+ |
| Railway | $0 | $50+ |
| Render | $0 | $40+ |
| Custom Domain | - | $12+ |

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Heroku Docs:** https://devcenter.heroku.com
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **MongoDB Docs:** https://docs.mongodb.com

---

## Deployment Summary

**Frontend to Vercel:**
- Push to GitHub
- Import to Vercel
- Set env vars
- Deploy (automatic on push)

**Backend to Railway/Render:**
- Set MongoDB URI
- Set JWT secret
- Deploy (automatic on push)
- Update FRONTEND_URL in backend

**Update Frontend:**
- Set NEXT_PUBLIC_API_URL to backend URL
- Deploy to Vercel

---

**Deployment Complete!** 🚀

Once both are deployed:
1. Frontend: `https://your-project.vercel.app`
2. Backend: `https://your-backend-api.com`
3. Database: MongoDB Atlas

Everything is production-ready.

---

**Last Updated:** April 2026
