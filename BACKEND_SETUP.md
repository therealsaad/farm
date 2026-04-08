# FunFarm Backend Setup Guide

## Overview
The FunFarm backend is a Node.js + Express + MongoDB application that provides:
- Real JWT authentication
- User management with role-based access (user/admin/superadmin)
- MongoDB database integration
- Secure password hashing with bcryptjs

---

## Quick Start

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/funfarm?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=24h
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Backend
```bash
npm run dev  # Development with nodemon
# or
npm start   # Production
```

Server will run on `http://localhost:5000`

---

## Database Setup

### MongoDB Atlas (Recommended)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Add database user with username and password
4. Get connection string
5. Paste in `.env` file as `MONGODB_URI`

### Local MongoDB
Replace `MONGODB_URI` with:
```
mongodb://localhost:27017/funfarm
```

---

## Default Users (Auto-Seeded)

When the server starts, it automatically creates these test users:

| Email | Password | Role |
|-------|----------|------|
| superadmin@example.com | SuperAdmin123 | superadmin |
| admin@example.com | Admin123 | admin |
| user@example.com | User123 | user |
| test@example.com | Test123 | user |
| saad@funfarm.com | Saad123 | superadmin |

---

## API Endpoints

### Authentication

**POST /api/auth/register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123",
  "role": "user"
}
```
Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "avatar_url"
  }
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "User123"
}
```
Response: (Same as register)

**GET /api/auth/verify** (Protected)
Headers: `Authorization: Bearer {token}`

Response:
```json
{
  "success": true,
  "message": "Token verified",
  "user": { /* user object */ }
}
```

**POST /api/auth/logout**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Frontend Integration

The frontend automatically connects to the backend if running on `http://localhost:5000`.

Update `NEXT_PUBLIC_API_URL` in `.env.local` if backend runs on a different port:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Fallback Mode**: If backend is unavailable, frontend automatically uses mock data for development.

---

## User Roles

### User
- Can book farmhouses
- View personal dashboard
- See own bookings

### Admin (Owner)
- Manage own farmhouses
- View bookings for their properties
- Access admin dashboard

### Superadmin
- Full platform access
- Manage users
- Manage admins
- View all analytics
- Access superadmin dashboard

---

## Security Features

✓ Password hashing with bcryptjs (10 salt rounds)
✓ JWT tokens with 24-hour expiry
✓ Protected routes middleware
✓ Role-based access control
✓ CORS enabled for frontend URL
✓ Email validation
✓ Password strength validation

---

## Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── models/
│   └── User.js             # User schema & methods
├── controllers/
│   └── authController.js   # Auth logic
├── routes/
│   └── auth.js            # Auth API routes
└── middleware/
    └── auth.js            # JWT protection & authorization
```

---

## Troubleshooting

### Port 5000 already in use
```bash
# Kill process on port 5000
npx kill-port 5000
# Or change PORT in .env
```

### MongoDB Connection Error
- Check `MONGODB_URI` in `.env`
- Verify MongoDB cluster is running
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)

### Token Expired
- Clear localStorage
- Login again
- Token expires after 24 hours

### CORS Errors
- Ensure `FRONTEND_URL` in `.env` matches frontend URL
- Check if backend server is running

---

## Development Tips

1. **Add logging**: Backend logs all requests and errors to console
2. **Test endpoints**: Use Postman or Thunder Client
3. **Database inspection**: Use MongoDB Atlas or Compass
4. **Hot reload**: Backend watches for file changes with nodemon

---

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use production MongoDB connection
3. Change `JWT_SECRET` to a strong random key
4. Set `FRONTEND_URL` to your domain
5. Deploy to Heroku, Railway, Render, or similar

---

## Support

For issues or questions, check the console logs or contact the developer.
