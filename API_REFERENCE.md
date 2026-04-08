# FunFarm API Reference

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### Register New User
**POST** `/auth/register`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123",
  "role": "user"
}
```

Success response (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://..."
  }
}
```

Error response (400/409):
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Login User
**POST** `/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "User123"
}
```

Success response (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://..."
  }
}
```

Error response (401):
```json
{
  "success": false,
  "message": "Email or password is incorrect"
}
```

---

### Verify Token
**GET** `/auth/verify`

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Success response (200):
```json
{
  "success": true,
  "message": "Token verified",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://..."
  }
}
```

Error response (401):
```json
{
  "success": false,
  "message": "Token is not valid"
}
```

---

### Logout
**POST** `/auth/logout`

Success response (200):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Health Check

### Server Status
**GET** `/health`

Response (200):
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Login successful |
| 201 | Created | User registered |
| 400 | Bad Request | Missing fields |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | User not found |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Database error |

---

## Authentication Headers

Include JWT token in Authorization header:
```
Authorization: Bearer {token}
```

Or without "Bearer" prefix (also accepted):
```
Authorization: {token}
```

---

## Request/Response Format

All requests and responses use JSON.

Request headers:
```
Content-Type: application/json
Authorization: Bearer {token}  # For protected routes
```

---

## Data Types

### User Object
```javascript
{
  id: string,              // MongoDB ObjectId
  name: string,            // User's full name
  email: string,           // User's email
  role: string,            // 'user' | 'admin' | 'superadmin'
  avatar: string,          // Image URL
  createdAt: ISO8601,      // Registration timestamp
  lastLogin: ISO8601       // Last login timestamp
}
```

### JWT Token
Payload:
```javascript
{
  id: string,              // User ID
  email: string,           // User email
  role: string,            // User role
  iat: number,             // Issued at timestamp
  exp: number              // Expiration timestamp (24 hours)
}
```

---

## Role-Based Access

| Endpoint | User | Admin | Superadmin |
|----------|------|-------|-----------|
| /auth/register | ✓ | ✓ | ✓ |
| /auth/login | ✓ | ✓ | ✓ |
| /auth/verify | ✓ | ✓ | ✓ |
| /user/dashboard | ✓ | - | - |
| /admin/dashboard | - | ✓ | ✓ |
| /superadmin/dashboard | - | - | ✓ |

---

## Usage Examples

### Using fetch() in JavaScript
```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'User123'
  })
});

const data = await response.json();
const token = data.token;

// Store token
localStorage.setItem('token', token);

// Use token in protected request
const verifyResponse = await fetch('http://localhost:5000/api/auth/verify', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Using curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123",
    "confirmPassword": "Test123",
    "role": "user"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'

# Verify token
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Create POST request to `http://localhost:5000/api/auth/login`
2. Set Body → raw → JSON
3. Enter email and password
4. Send
5. Copy token from response
6. Create GET request to `/auth/verify`
7. Set Headers → Authorization: Bearer {token}
8. Send

---

## Validation Rules

### Email
- Must be valid email format
- Must be unique (not already registered)
- Case insensitive

### Password
- Minimum 6 characters
- Must match confirmPassword field on registration
- Hashed before storage (bcryptjs)
- Never returned in API responses

### Name
- Required field
- Maximum 50 characters
- Trimmed of whitespace

### Role
- Enum: 'user' | 'admin' | 'superadmin'
- Default: 'user'
- Only superadmin can assign roles

---

## Rate Limiting

Currently no rate limiting. In production, add:
- Max 5 login attempts per 15 minutes
- Max 3 registration attempts per hour
- Max 100 requests per minute (general)

---

## CORS Policy

Allowed origins (from .env FRONTEND_URL):
```
http://localhost:3000    # Development
https://example.com      # Production
```

Allowed methods:
- GET
- POST
- PUT
- DELETE
- OPTIONS

Allowed headers:
- Content-Type
- Authorization

---

## Tokens & Expiry

### JWT Expiry
- Default: 24 hours
- Configurable via JWT_EXPIRE in .env
- Formats: '1h', '24h', '7d', etc.

### Token Storage
- Frontend: localStorage (key: 'token')
- Sent via: Authorization header
- Used for: Protected route access

### Auto-Logout
- Frontend checks token expiry before requests
- Redirects to login if expired
- Shows "Token expired" message

---

## Future API Endpoints (Planned)

### User Management
- GET /user/profile - Get user profile
- PUT /user/profile - Update profile
- DELETE /user - Delete account

### Admin Dashboard
- GET /admin/bookings - View bookings
- GET /admin/properties - View properties
- POST /admin/properties - Create property

### SuperAdmin Dashboard
- GET /superadmin/users - List all users
- GET /superadmin/analytics - Platform analytics
- PUT /superadmin/users/:id/role - Change user role

---

## Troubleshooting API Issues

### "Token is not valid"
- Token may have expired
- Token format incorrect
- Check Authorization header format
- Regenerate by login again

### "User not found"
- User doesn't exist in database
- Email spelling incorrect
- Case sensitivity issue

### "CORS error"
- Backend not running
- FRONTEND_URL not set in backend/.env
- Check origin matches

### "Database connection failed"
- MongoDB not running
- Connection string incorrect
- IP whitelist issue

---

## Security Best Practices

✓ Always use HTTPS in production
✓ Never expose JWT secret
✓ Store tokens only in secure storage
✓ Rotate JWT secret periodically
✓ Validate all inputs
✓ Use rate limiting
✓ Log all authentication attempts
✓ Monitor for suspicious activity

---

## Support

For API issues:
1. Check Backend Setup Guide: `BACKEND_SETUP.md`
2. Review error messages in console
3. Check database connection
4. Verify environment variables
5. Test with curl or Postman

---

**Last Updated:** April 2026
**API Version:** 1.0
**Status:** Production Ready
