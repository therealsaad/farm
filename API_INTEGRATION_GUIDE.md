# FunFarm API Integration Guide

## Overview
This guide explains how to migrate from the mock API (`/lib/api.js`) to a real backend server. The mock API currently simulates authentication, but production will require a Node.js/Express backend with database.

---

## Current Architecture: Mock API

### Location
- **File:** `/lib/api.js`
- **Purpose:** Simulates backend endpoints for authentication
- **Used By:** Auth pages, auth context, protected routes

### Mock Endpoints Implemented
```javascript
authAPI.login(email, password)      // Authenticate user
authAPI.register(name, email, pwd, role)  // Create new user
authAPI.logout()                    // Session cleanup
authAPI.verify(token)               // Verify JWT token
```

---

## Production Architecture: Real Backend

### Recommended Stack
- **Server:** Node.js + Express.js
- **Database:** MongoDB (or PostgreSQL)
- **Authentication:** JWT with refresh tokens
- **Password Hashing:** bcrypt
- **Environment:** Docker for containerization

---

## Step-by-Step Migration Guide

### Step 1: Replace Mock API with Real Endpoints

**Before (Mock):**
```javascript
// /lib/api.js
const loginResponse = await authAPI.login('user@example.com', 'password123');
```

**After (Real Backend):**
```javascript
// /lib/api.js
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json(); // { user, token }
  },
  
  register: async (name, email, password, role = 'user') => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json(); // { user, token }
  },
  
  logout: async () => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return { success: true };
  },
  
  verify: async (token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
    
    return response.json(); // { user, token, valid: true }
  }
};
```

### Step 2: Set Environment Variables

**Create `.env.local`:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
# or for production
NEXT_PUBLIC_API_URL=https://api.funfarm.com
```

### Step 3: Backend Implementation (Node.js + Express)

#### Project Setup
```bash
mkdir funfarm-backend
cd funfarm-backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon
```

#### File Structure
```
backend/
├── server.js              # Express app
├── .env                   # Environment variables
├── models/
│   └── User.js           # Mongoose User schema
├── routes/
│   └── auth.js           # Auth endpoints
├── middleware/
│   └── auth.js           # JWT verification
└── controllers/
    └── authController.js # Auth logic
```

#### Database Schema (MongoDB)
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'superadmin'], 
    default: 'user' 
  },
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Authentication Routes
```javascript
// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Signup
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
    
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Create user
    const user = new User({ name, email, password, role: role || 'user' });
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify token
router.post('/verify', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token: req.token,
      valid: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout (optional - JWT is stateless)
router.post('/logout', auth, (req, res) => {
  // In real app, could blacklist token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
```

#### JWT Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

#### Express Server
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

#### Environment Variables (.env)
```
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/funfarm
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

### Step 4: Frontend Configuration

**Update environment:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Update auth context to use real API:**
```javascript
// /lib/authContext.jsx
const handleLogin = async (email, password) => {
  try {
    const { user, token } = await authAPI.login(email, password);
    login(user, token); // Sets auth state
    toast.success('Login successful');
    router.push('/dashboard/user');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Step 5: Testing the Integration

**Test Endpoints:**
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "user"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Verify
curl -X POST http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Additional Endpoints to Implement

### User Management
```
GET    /api/users/:id          - Get user profile
PUT    /api/users/:id          - Update profile
DELETE /api/users/:id          - Delete account
POST   /api/users/:id/avatar   - Upload avatar
```

### Password Management
```
POST   /api/auth/forgot-password    - Request reset
POST   /api/auth/reset-password     - Reset password
POST   /api/auth/change-password    - Change password
```

### Farmhouse Operations
```
GET    /api/farmhouses              - List all
POST   /api/farmhouses              - Create (admin only)
GET    /api/farmhouses/:id          - Get details
PUT    /api/farmhouses/:id          - Update (owner only)
DELETE /api/farmhouses/:id          - Delete (owner only)
```

### Bookings
```
POST   /api/bookings                - Create booking
GET    /api/bookings                - Get user bookings
GET    /api/bookings/:id            - Get booking details
PUT    /api/bookings/:id            - Update booking
POST   /api/bookings/:id/cancel     - Cancel booking
```

### Admin/SuperAdmin
```
GET    /api/admin/users             - List users
GET    /api/admin/farmhouses        - List all farmhouses
GET    /api/admin/bookings          - List all bookings
POST   /api/admin/farmhouses/:id/approve  - Approve listing
```

---

## Security Checklist

- [ ] Hash passwords with bcrypt (min 12 rounds)
- [ ] Validate all inputs server-side
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Implement CORS correctly
- [ ] Add request logging
- [ ] Use helmet.js for security headers
- [ ] Implement CSRF protection
- [ ] Add refresh token rotation
- [ ] Implement token blacklisting for logout
- [ ] Add email verification
- [ ] Implement 2FA
- [ ] Add audit logging

---

## Deployment

### Frontend (Vercel)
```bash
# Connect GitHub repo to Vercel
# Add environment variable:
NEXT_PUBLIC_API_URL = https://your-api.com
```

### Backend (Railway/Heroku/AWS)
```bash
# Set environment variables:
MONGODB_URI = your-mongodb-connection
JWT_SECRET = generate-strong-secret
PORT = 3001
CORS_ORIGIN = https://your-domain.com
```

---

## Troubleshooting

### CORS Errors
- Ensure backend has correct CORS configuration
- Check API URL in .env.local
- Verify backend is running

### JWT Expired
- Token expires after 24 hours (configurable)
- Frontend should prompt user to re-login
- Implement refresh token rotation

### MongoDB Connection
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas
- Ensure credentials are correct

---

## Resources

- [JWT Introduction](https://jwt.io)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Document Version:** 1.0  
**Last Updated:** April 8, 2026  
**Status:** Ready for Backend Integration
