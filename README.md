# FunFarm - Premium Farmhouse Booking Platform


> AI-powered farmhouse discovery, real-time booking, and role-based management system built with MERN Stack

---

## 🎯 Overview

FunFarm is a full-stack web application that connects travelers with premium farmhouse experiences. The platform features:

- **Intelligent Search** - AI-powered farmhouse recommendations
- **Seamless Booking** - Multi-step booking flow with AI assistance  
- **Real Authentication** - JWT-based user authentication
- **Role-Based Access** - User, Admin, and Superadmin dashboards
- **Modern UI** - Beautiful, responsive design with dark mode

---

## ✨ Key Features

### For Guests (Users)
- Browse and search farmhouses by location, amenities, price
- View detailed property information with image galleries
- Make reservations with AI-assisted booking
- Manage bookings and wishlists
- View personalized recommendations
- Leave reviews and ratings

### For Owners (Admins)
- Manage multiple farmhouses
- View and respond to bookings
- Monitor revenue and statistics  
- Respond to guest reviews
- Access AI-powered business insights
- View occupancy analytics

### For Platform Managers (Superadmins)
- Full platform oversight
- Manage users and admin accounts
- View platform-wide analytics
- Handle approvals and disputes
- Monitor system health
- Access comprehensive reports

---

## 🚀 Quick Start

### Frontend Only (Mock Mode)
```bash
npm install
npm run dev
# Opens http://localhost:3000
# Use test credentials (see below)
```

### Full Stack (With Real Backend)

**Backend Setup:**
```bash
cd backend
npm install
# Edit .env with MongoDB URI
npm run dev
# Runs on http://localhost:5000
```

**Frontend:**
```bash
npm install
npm run dev
# Connects to backend automatically
```

---

## 🔑 Test Credentials

| Email | Password | Role | Access |
|-------|----------|------|--------|
| user@example.com | User123 | user | /dashboard/user |
| admin@example.com | Admin123 | admin | /dashboard/admin |
| superadmin@example.com | SuperAdmin123 | superadmin | /dashboard/superadmin |
| saad@funfarm.com | Saad123 | superadmin | /dashboard/superadmin |

---

## 📁 Project Structure

```
funfarm/
├── app/                              # Next.js 16 App
│   ├── page.tsx                     # Homepage
│   ├── auth/
│   │   ├── login/page.jsx           # Login page
│   │   └── register/page.jsx        # Registration page
│   ├── search/page.jsx              # Search results
│   ├── farmhouse/[slug]/page.jsx    # Detail page
│   ├── booking/[slug]/page.jsx      # Booking flow
│   ├── dashboard/
│   │   ├── user/page.jsx            # User dashboard
│   │   ├── admin/page.jsx           # Admin dashboard
│   │   └── superadmin/page.jsx      # Superadmin dashboard
│   ├── ai-assistant/page.jsx        # AI chat
│   └── contact/page.jsx             # Contact form
│
├── components/                       # React Components
│   ├── navbar.jsx                   # Navigation
│   ├── footer.jsx                   # Footer
│   ├── ai-chatbot.jsx               # AI assistant
│   ├── home/                        # Homepage sections
│   └── ui/                          # shadcn/ui components
│
├── lib/
│   ├── authContext.jsx              # Auth state management
│   ├── api.js                       # API client
│   └── data.js                      # Mock data
│
├── public/
│   └── images/                      # Farmhouse images
│
├── backend/                         # Express.js API
│   ├── server.js                   # Main server
│   ├── package.json
│   ├── .env                        # Configuration
│   ├── models/
│   │   └── User.js                 # MongoDB schema
│   ├── controllers/
│   │   └── authController.js       # Auth logic
│   ├── routes/
│   │   └── auth.js                 # API routes
│   └── middleware/
│       └── auth.js                 # JWT protection
│
├── QUICKSTART.md                    # Quick start guide
├── BACKEND_SETUP.md                 # Backend setup guide
├── API_REFERENCE.md                 # API documentation
├── UPGRADE_SUMMARY.md               # All changes
└── README.md                        # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** JavaScript/JSX
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** React Context
- **HTTP Client:** Fetch API
- **Notifications:** Sonner Toast
- **Theme:** next-themes

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **Validation:** express-validator
- **Environment:** dotenv

---

## 🔐 Authentication

### How It Works
1. User registers with email + password
2. Password hashed with bcryptjs (10 salt rounds)
3. User stored in MongoDB
4. Login returns JWT token (24-hour expiry)
5. Token stored in localStorage
6. Sent in Authorization header for protected requests
7. Auto-logout after token expiry

### Protected Routes
- `/dashboard/user` - Requires authentication
- `/dashboard/admin` - Requires admin role
- `/dashboard/superadmin` - Requires superadmin role
- Unauthorized users redirected to login

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String,                           // User's full name
  email: String (unique),                 // Email address
  password: String (hashed),              // Bcrypt hash
  role: Enum['user', 'admin', 'superadmin'],
  avatar: String,                         // Profile picture
  createdAt: Date,                        // Registration time
  lastLogin: Date,                        // Last login
  timestamps: true                        // auto timestamps
}
```

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token (protected)
- `POST /api/auth/logout` - Logout user

### Health
- `GET /api/health` - Server status

See `API_REFERENCE.md` for complete documentation.

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Mode** - Theme toggle with persistence
- **Loading States** - Spinners and skeleton screens
- **Error Handling** - Toast notifications for all actions
- **Form Validation** - Email, password, field validation
- **Smooth Animations** - Page transitions and interactions
- **Accessibility** - ARIA labels, semantic HTML

---

## 📱 Pages

| Page | Route | Features |
|------|-------|----------|
| Homepage | `/` | Hero, search, featured, categories, testimonials |
| Search | `/search` | Filters, listings, AI suggestions |
| Detail | `/farmhouse/:slug` | Gallery, info, reviews, booking |
| Booking | `/booking/:slug` | Multi-step flow, pricing, confirmation |
| User Dashboard | `/dashboard/user` | Profile, bookings, wishlist, recommendations |
| Admin Dashboard | `/dashboard/admin` | Properties, bookings, earnings, reviews |
| Superadmin Dashboard | `/dashboard/superadmin` | Analytics, users, platform management |
| AI Assistant | `/ai-assistant` | Chat interface, smart matching |
| Login | `/auth/login` | Email/password form, role redirect |
| Register | `/auth/register` | Signup with role selection, validation |
| Contact | `/contact` | Contact form, support |

---

## 🚀 Deployment

### Frontend (Vercel - Recommended)
```bash
vercel deploy
```

### Backend (Heroku/Railway/Render)
```bash
# Add backend to Vercel
# or deploy to Heroku:
heroku create funfarm-api
git push heroku main
```

### Environment Setup
Production requires:
- MongoDB Atlas cluster
- JWT secret (strong random key)
- Frontend URL whitelist
- HTTPS enforced
- CORS configured

---

## 📚 Documentation

- **Quick Start:** `QUICKSTART.md` - Get running in minutes
- **Backend Setup:** `BACKEND_SETUP.md` - Complete backend guide
- **API Reference:** `API_REFERENCE.md` - All endpoints documented
- **Upgrade Summary:** `UPGRADE_SUMMARY.md` - Changes detailed

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/funfarm
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=24h
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## ✅ Features Checklist

### Authentication
- [x] User registration
- [x] User login
- [x] JWT tokens
- [x] Password hashing
- [x] Token verification
- [x] Auto logout
- [x] Role-based access

### Frontend
- [x] Responsive design
- [x] Dark mode
- [x] Form validation
- [x] Loading states
- [x] Error handling
- [x] Toast notifications
- [x] Protected routes

### Backend
- [x] Express server
- [x] MongoDB integration
- [x] User model
- [x] Auth controller
- [x] JWT middleware
- [x] Error handling
- [x] CORS enabled
- [x] Auto seeding

### Pages
- [x] Homepage
- [x] Search page
- [x] Detail page
- [x] Booking page
- [x] User dashboard
- [x] Admin dashboard
- [x] Superadmin dashboard
- [x] AI assistant
- [x] Login
- [x] Register
- [x] Contact

---

## 🤝 Contributing

The project is structured for easy contributions:

1. Frontend changes in `/app` and `/components`
2. Backend changes in `/backend`
3. API changes in `/backend/routes` and `/backend/controllers`
4. UI components in `/components/ui`

---

## 🐛 Known Issues

- Backend requires MongoDB Atlas setup
- Mock mode uses localStorage (data lost on refresh)
- Some AI features are simulated

---

## 📝 License

© 2026 FunFarm. All rights reserved.

---

## 👨‍💻 Developer

**Shaikh Saad**
- Education: BCA Final Year Student
- Email: saad@funfarm.com
- Phone: 8686948282
- Skills: MERN Stack, AI Integration, Full-Stack Development

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- UI components from shadcn/ui
- Icons from Lucide React
- Images from Unsplash
- Database from MongoDB Atlas

---

## 📞 Support

For issues or questions:
1. Check `QUICKSTART.md` for common issues
2. Review `BACKEND_SETUP.md` for setup problems
3. Check backend console logs
4. Verify environment variables
5. Contact developer

---

## 🎉 Ready to Start?

1. **Option 1:** Frontend only - `npm run dev`
2. **Option 2:** Full stack - Follow `QUICKSTART.md`
3. **Test:** Use credentials above
4. **Deploy:** Push to Vercel + Backend service

---

**Built with ❤️ using MERN Stack**

[⬆ Back to top](#funfarm---premium-farmhouse-booking-platform)
