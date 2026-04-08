# FunFarm - Quick Reference

## Start Development (No Setup Required)
```bash
npm install
npm run dev
# Visit http://localhost:3000
# Login: user@example.com / User123
```

## Add Supabase (Optional)

1. Create account at https://supabase.com
2. Create new project
3. Copy credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run SQL setup from `SUPABASE_SETUP.md`
5. Restart dev server

## Test Credentials

```
User:       user@example.com / User123
Admin:      admin@example.com / Admin123
SuperAdmin: superadmin@example.com / SuperAdmin123
```

## Key Features

✅ AI-powered farmhouse discovery
✅ Real-time booking system
✅ User dashboards (guest, owner, admin)
✅ Role-based access control
✅ Database persistence (Supabase)
✅ Real authentication
✅ Responsive design

## Dashboards

- **Guest**: `/dashboard/user` - View bookings, wishlist, reviews
- **Owner**: `/dashboard/admin` - Manage farmhouses, bookings, earnings
- **SuperAdmin**: `/dashboard/superadmin` - Platform analytics, user management

## File Structure

```
/app
  ├── page.tsx                 # Homepage
  ├── auth/
  │   ├── login/page.jsx       # Login
  │   └── register/page.jsx    # Register
  ├── search/page.jsx          # Search results
  ├── farmhouse/[slug]/page.jsx # Property detail
  ├── booking/[slug]/page.jsx  # Booking flow
  └── dashboard/
      ├── user/page.jsx        # Guest dashboard
      ├── admin/page.jsx       # Owner dashboard
      └── superadmin/page.jsx  # Admin dashboard

/lib
  ├── supabase.js              # Supabase client
  ├── supabaseAuth.js          # Auth API
  ├── bookingsDB.js            # Bookings API
  ├── authContext.jsx          # Auth state
  └── data.js                  # Mock data

/components
  ├── navbar.jsx               # Navigation
  ├── footer.jsx               # Footer
  ├── ai-chatbot.jsx           # AI helper
  └── ui/                      # shadcn components
```

## Common Tasks

### Login
```javascript
import { supabaseAuthAPI } from '@/lib/supabaseAuth';

const { user, token } = await supabaseAuthAPI.login(
  email, 
  password
);
```

### Create Booking
```javascript
import { bookingsDB } from '@/lib/bookingsDB';

const { booking, success } = await bookingsDB.createBooking(
  userId,
  farmhouseId,
  {
    checkInDate: '2024-04-20',
    checkOutDate: '2024-04-21',
    totalGuests: 10,
    totalPrice: 5000,
    addOns: ['breakfast', 'dinner']
  }
);
```

### Get User's Bookings
```javascript
import { bookingsDB } from '@/lib/bookingsDB';

const { bookings } = await bookingsDB.getUserBookings(userId);
```

### Check Auth Status
```javascript
import { useAuth } from '@/lib/authContext';

const { user, isAuthenticated, logout } = useAuth();
```

## Environment Variables

```
# Supabase (Optional)
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# If not set, app uses mock data
```

## Deployment

### To Vercel
```bash
git push origin main
# Vercel auto-deploys
# Add env variables in Vercel Settings → Environment Variables
```

### Production Checklist
- [ ] Supabase project created
- [ ] Database tables setup
- [ ] RLS policies enabled
- [ ] Environment variables added to Vercel
- [ ] Email authentication configured
- [ ] Domain configured
- [ ] Analytics enabled

## Support

- **Issues**: Check browser console for error messages
- **Database**: See `SUPABASE_SETUP.md` for table schema
- **Configuration**: See `SUPABASE_INTEGRATION.md` for details
- **Setup**: See `QUICKSTART.md` for step-by-step guide

## Technology Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Authentication**: Supabase Auth + JWT
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel

## Performance

- Fast initial load (<3s)
- Optimized images
- Code splitting
- Database indexing ready
- RLS for security

## Credits

Built by Shaikh Saad | BCA Final Year | MERN Stack Developer

---

**Everything is ready to go!** 🚀

Start with mock mode for development, add Supabase when ready for production.
