FunFarm - Supabase Integration Guide

## Overview

FunFarm now integrates with Supabase for real-time database, authentication, and file storage. The application works in two modes:

1. **Production Mode** - Full Supabase integration
2. **Development Mode** - Mock data (no Supabase required)

---

## Quick Start

### Without Supabase (Development/Testing)
```bash
npm install
npm run dev
# Works with mock authentication and in-memory bookings
# Test with any of the mock credentials below
```

### With Supabase (Production)

1. **Set up Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Get Project URL and Anon Key

2. **Add Environment Variables**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Create Database Tables**
   Run these in Supabase SQL Editor:

   **Profiles Table:**
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
     email VARCHAR(255) UNIQUE,
     name VARCHAR(255),
     role VARCHAR(50) DEFAULT 'user' (user, admin, superadmin),
     avatar VARCHAR(500),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can view their own profile"
   ON profiles FOR SELECT
   USING (auth.uid() = id);

   CREATE POLICY "Users can update their own profile"
   ON profiles FOR UPDATE
   USING (auth.uid() = id);
   ```

   **Bookings Table:**
   ```sql
   CREATE TABLE bookings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users ON DELETE CASCADE,
     farmhouse_id VARCHAR(100),
     check_in_date DATE,
     check_out_date DATE,
     total_guests INTEGER,
     total_price DECIMAL(10, 2),
     add_ons JSONB DEFAULT '[]',
     special_requests TEXT,
     status VARCHAR(50) DEFAULT 'confirmed' (confirmed, pending, cancelled),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can view their own bookings"
   ON bookings FOR SELECT
   USING (auth.uid() = user_id);

   CREATE POLICY "Users can create their own bookings"
   ON bookings FOR INSERT
   WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update their own bookings"
   ON bookings FOR UPDATE
   USING (auth.uid() = user_id);

   CREATE POLICY "Admins can view all bookings"
   ON bookings FOR SELECT
   USING (
     EXISTS (
       SELECT 1 FROM profiles
       WHERE profiles.id = auth.uid()
       AND profiles.role IN ('admin', 'superadmin')
     )
   );
   ```

4. **Seed Test Users (Optional)**
   ```sql
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_user_meta_data)
   VALUES
   ('user@example.com', crypt('User123', gen_salt('bf')), NOW(), '{"role":"user","name":"Test User"}'),
   ('admin@example.com', crypt('Admin123', gen_salt('bf')), NOW(), '{"role":"admin","name":"Admin User"}'),
   ('superadmin@example.com', crypt('SuperAdmin123', gen_salt('bf')), NOW(), '{"role":"superadmin","name":"Super Admin"}');
   ```

---

## Test Credentials

When Supabase is not configured, these mock credentials work:

| Email | Password | Role |
|-------|----------|------|
| user@example.com | User123 | User |
| admin@example.com | Admin123 | Admin |
| superadmin@example.com | SuperAdmin123 | Super Admin |

---

## Supabase Files Structure

```
/lib/
  ├── supabase.js          # Supabase client initialization
  ├── supabaseAuth.js      # Authentication API (login, register, logout)
  ├── bookingsDB.js        # Bookings database operations
  └── authContext.jsx      # React context for auth state (Supabase + mock)

/app/
  ├── auth/
  │   ├── login/page.jsx   # Login with Supabase
  │   └── register/page.jsx # Register with Supabase
  └── booking/
      └── [slug]/page.jsx   # Booking with database save
```

---

## How It Works

### Authentication Flow

1. User enters email/password
2. `supabaseAuthAPI.login()` is called
3. If Supabase configured: Uses Supabase Auth
4. If Supabase not configured: Uses mock data
5. User data stored in localStorage AND Supabase (if available)
6. Auth context keeps user logged in across sessions

### Booking Flow

1. User fills booking form
2. On submit, `bookingsDB.createBooking()` is called
3. If Supabase configured: Saves to `bookings` table
4. If Supabase not configured: Saves to in-memory array
5. Booking ID returned for confirmation
6. User redirected to dashboard

### Database Access

- **User Bookings**: Only user can see their own bookings (RLS policy)
- **Admin Bookings**: Admins can see all bookings (RLS policy)
- **Profiles**: Only own profile visible (RLS policy)

---

## Fallback Mode

If Supabase environment variables are missing:

✓ Application still runs fully
✓ Uses mock authentication
✓ Bookings stored in memory (lost on restart)
✓ Perfect for development/testing

To switch to mock mode, simply remove the environment variables from `.env.local`.

---

## Troubleshooting

### "Cannot GET /api/auth/..."
✅ This is expected - authentication happens client-side with Supabase

### Login not working
- Check if `.env.local` has Supabase credentials
- Verify user exists in Supabase auth.users table
- Check browser console for detailed errors

### Bookings not saving
- Ensure `bookings` table exists in Supabase
- Check RLS policies allow INSERT for authenticated users
- Verify user is logged in before booking

### Profile not loading
- Ensure `profiles` table exists
- Check that user profile was created during registration
- Verify RLS policies

---

## Production Deployment

### On Vercel

1. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. Deploy:
   ```bash
   git push
   ```

3. Vercel auto-deploys with your Supabase config

### Supabase Production

1. Enable Row Level Security on all tables
2. Set up proper JWT secret in Supabase
3. Configure email authentication settings
4. Enable email verification if needed

---

## Key Features

✅ Real Supabase authentication
✅ Database persistence for bookings
✅ Row-level security (RLS)
✅ Works without Supabase (mock mode)
✅ Seamless fallback
✅ No breaking changes to existing code
✅ Test users pre-configured

---

## Support

For issues with this integration:
1. Check the console for error messages
2. Verify Supabase environment variables
3. Ensure database tables are created
4. Check RLS policies are enabled

All code has proper error handling and fallback to mock mode.
