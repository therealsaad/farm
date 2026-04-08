# FunFarm - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Frontend Only (No Backend Setup)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000

# Test with mock credentials:
# Email: user@example.com
# Password: User123
```

**Note:** Uses mock data. All changes reset on refresh.

---

### Option 2: Full Stack (Frontend + Real Backend)

#### Step 1: Setup Backend Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (Free tier)
4. Create database user with password
5. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/funfarm`)

#### Step 2: Configure Backend

```bash
cd backend

# Edit .env file
# Replace MONGODB_URI with your connection string

# Example:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/funfarm?retryWrites=true&w=majority
```

#### Step 3: Start Backend

```bash
cd backend
npm install
npm run dev

# Should show:
# ✓ MongoDB Connected: cluster.mongodb.net
# ✓ Created user: superadmin@example.com
# Server running on port 5000
```

#### Step 4: Start Frontend

Open new terminal:
```bash
npm install
npm run dev

# Open http://localhost:3000
```

#### Step 5: Test Login

Use any test account:
```
Email: user@example.com
Password: User123

Or try admin:
Email: admin@example.com
Password: Admin123

Or superadmin:
Email: superadmin@example.com
Password: SuperAdmin123
```

---

## 📋 Test Accounts (Auto-Created)

| Email | Password | Role | Dashboard |
|-------|----------|------|-----------|
| user@example.com | User123 | user | /dashboard/user |
| admin@example.com | Admin123 | admin | /dashboard/admin |
| superadmin@example.com | SuperAdmin123 | superadmin | /dashboard/superadmin |
| saad@funfarm.com | Saad123 | superadmin | /dashboard/superadmin |

---

## 🔑 Key Features

✅ Real JWT authentication (24-hour tokens)
✅ Secure password hashing
✅ Role-based dashboards (user/admin/superadmin)
✅ Protected routes (auto-redirect if not logged in)
✅ MongoDB database persistence
✅ Toast notifications
✅ Dark mode toggle
✅ Responsive mobile design

---

## 🛠️ Common Tasks

### Change Backend Port
Edit `backend/.env`:
```
PORT=3001  # or any port you want
```

Then update frontend `NEXT_PUBLIC_API_URL`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Create New User via API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "newuser@example.com",
    "password": "Password123",
    "confirmPassword": "Password123",
    "role": "user"
  }'
```

### Test Backend Health
```bash
curl http://localhost:5000/api/health
# Should return: {"success":true,"message":"Server is running"}
```

---

## 🐛 Troubleshooting

**Q: "Cannot connect to backend"**
- Ensure backend is running: `npm run dev` in `/backend`
- Check port 5000 is available
- Check `.env` has correct MONGODB_URI

**Q: "MongoDB connection failed"**
- Verify MONGODB_URI in backend/.env
- Check MongoDB Atlas cluster is active
- Add your IP to MongoDB whitelist (0.0.0.0/0 for development)

**Q: "Login not working"**
- Clear localStorage: Open DevTools → Application → Clear All
- Try again with correct password
- Backend must be running

**Q: "Backend takes long to start"**
- First start may take time to seed users
- Subsequent starts are faster
- Check console for "Server running on port 5000"

---

## 📁 Project Structure

```
FunFarm/
├── frontend/                # Next.js app
│   ├── app/               # Pages (login, dashboard, etc)
│   ├── components/        # UI components
│   ├── lib/              # Auth context, API, data
│   └── public/           # Images, assets
│
└── backend/              # Express API
    ├── server.js         # Main server
    ├── models/User.js    # Database schema
    ├── controllers/      # Auth logic
    └── middleware/auth.js # JWT protection
```

---

## 🔐 Security Notes

- Passwords are hashed with bcryptjs
- JWT tokens expire after 24 hours
- Protected routes require valid token
- Role-based access control
- Email validation on registration
- Password strength validation

---

## 📚 Full Documentation

For detailed setup and API documentation:
- `BACKEND_SETUP.md` - Complete backend guide
- `UPGRADE_SUMMARY.md` - All changes explained
- `API_INTEGRATION_GUIDE.md` - API endpoints reference

---

## 👨‍💻 Built By

**Shaikh Saad** | BCA Final Year | MERN Stack Developer
📱 8686948282

---

## ✨ Quick Links

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Documentation: See `BACKEND_SETUP.md`

---

**Ready to go?** Start with Option 1 (frontend only) or follow Option 2 for full backend setup! 🚀
