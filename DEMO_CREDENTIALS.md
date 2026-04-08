# FunFarm - Demo Credentials

Welcome to FunFarm! This is a complete farmhouse discovery and booking platform with real authentication, role-based access control, and AI-powered features.

## 🔐 Test Accounts

Use these credentials to test the platform:

### Super Admin Account
- **Email:** `superadmin@example.com`
- **Password:** `SuperAdmin123`
- **Role:** Super Admin
- **Access:** Platform analytics, user management, farmhouse approval, revenue dashboard

### Admin Account (Farmhouse Owner)
- **Email:** `admin@example.com`
- **Password:** `Admin123`
- **Role:** Admin/Owner
- **Access:** Admin dashboard with booking management, revenue tracking, AI business insights

### Regular User Account
- **Email:** `user@example.com`
- **Password:** `User123`
- **Role:** Guest/User
- **Access:** Browse farmhouses, make bookings, manage wishlist, view bookings

### Test Registration
- **Email:** `test@example.com`
- **Password:** `Test123`
- **Role:** Guest/User
- **Access:** Same as regular user

## 🎯 Features to Test

### Authentication
- ✅ Login with email/password
- ✅ Register new account (Guest or Owner role)
- ✅ Password strength indicator on registration
- ✅ Form validation (email format, password match)
- ✅ Toast notifications for success/error
- ✅ Auto-logout on token expiration (24 hours)

### Role-Based Access
- ✅ User dashboard - only for authenticated users
- ✅ Admin dashboard - only for admin/owner roles
- ✅ Superadmin dashboard - only for superadmin role
- ✅ Dynamic navbar showing user info & logout button
- ✅ Role-based menu items

### User Experience
- ✅ Personalized greeting with user's name
- ✅ User avatar display from auth profile
- ✅ Dark mode toggle in navbar (persisted)
- ✅ Responsive design (mobile & desktop)
- ✅ Smooth transitions & loading states

### Dashboard Features
- ✅ User Dashboard: Bookings, wishlist, reviews, AI recommendations
- ✅ Admin Dashboard: Revenue tracking, booking management, AI insights
- ✅ Superadmin Dashboard: Platform analytics, user management, approval workflow

## 🚀 Getting Started

1. **Login:** Click "Sign In" in navbar, use test credentials above
2. **Explore:** Browse farmhouses on homepage or search
3. **Book:** Select a farmhouse and complete booking flow
4. **Manage:** View and manage bookings in user dashboard
5. **Admin Panel:** If logged in as admin/owner, access admin dashboard
6. **Logout:** Click user avatar in navbar → Sign Out

## 🎨 Technology Stack

- **Frontend:** React.js 19, Next.js 16, TypeScript, Tailwind CSS 4
- **UI Components:** shadcn/ui, Radix UI
- **Authentication:** JWT tokens (mock API for demo)
- **State Management:** React Context API + localStorage
- **Notifications:** Sonner (toast library)
- **Theme:** next-themes (dark/light mode)
- **Data Visualization:** Recharts
- **Icons:** Lucide React

## 🔧 Configuration

The authentication system uses a mock API (`/lib/api.js`) that simulates:
- JWT token generation
- Login validation
- User creation
- Token verification

**In production:**
- Replace `authAPI` with real backend endpoints
- Implement server-side JWT verification
- Use secure HTTP-only cookies for tokens
- Add refresh token rotation
- Implement rate limiting on auth endpoints

## 🛣️ Routes

### Public Routes
- `/` - Homepage
- `/search` - Search farmhouses
- `/farmhouse/[slug]` - Farmhouse details
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/ai-assistant` - AI chat assistant
- `/contact` - Contact form

### Protected Routes (Auth Required)
- `/dashboard/user` - User dashboard
- `/booking/[slug]` - Booking flow
- `/dashboard/admin` - Admin dashboard (admin/owner only)
- `/dashboard/superadmin` - Superadmin dashboard (superadmin only)

## 💡 Key Implementation Details

### Auth Context (`/lib/authContext.jsx`)
- Manages global authentication state
- Persists token in localStorage
- Provides `useAuth()` hook for components
- Includes `isAdmin` and `isSuperAdmin` helpers

### API Client (`/lib/api.js`)
- Mock authentication endpoints
- Generates JWT tokens
- Validates credentials
- Handles token verification

### Protected Components
- All dashboards check `useAuth()` and redirect unauthorized users
- Navbar dynamically shows user info or login links
- Role-based menu items appear conditionally

## 🔒 Security Considerations

- JWT tokens stored in localStorage (for demo)
- **For production:** Use HTTP-only cookies
- Passwords validated with strength requirements
- Email format validation
- Token expiration (24 hours)
- Auto-redirect on unauthorized access

## 🎓 Learning Resources

This project demonstrates:
- Next.js 16 app router
- Server-side and client-side rendering
- Middleware patterns
- State management with Context API
- Protected routes
- Form handling and validation
- Toast notifications
- Theme switching
- Responsive design

---

**Enjoy exploring FunFarm!** 🚀
