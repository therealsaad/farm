-- Seed test users
-- Note: These are test accounts. Passwords are hashed by Supabase Auth
-- You'll need to create these users through Supabase Auth UI or API

-- After creating users in auth.users, insert their profiles:

-- Superadmin Profile
INSERT INTO profiles (id, name, email, role, phone, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Super Admin',
  'superadmin@example.com',
  'superadmin',
  '8686948282',
  now()
) ON CONFLICT DO NOTHING;

-- Admin Profile
INSERT INTO profiles (id, name, email, role, phone, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000002'::uuid,
  'Admin User',
  'admin@example.com',
  'admin',
  '8686948282',
  now()
) ON CONFLICT DO NOTHING;

-- Regular User Profile
INSERT INTO profiles (id, name, email, role, phone, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'John Doe',
  'user@example.com',
  'user',
  '+91 98765 43210',
  now()
) ON CONFLICT DO NOTHING;

-- Test User Profile
INSERT INTO profiles (id, name, email, role, phone, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000004'::uuid,
  'Test User',
  'test@example.com',
  'user',
  '+91 87654 32109',
  now()
) ON CONFLICT DO NOTHING;

-- Shaikh Saad (Developer)
INSERT INTO profiles (id, name, email, role, phone, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000005'::uuid,
  'Shaikh Saad',
  'saad@funfarm.com',
  'superadmin',
  '8686948282',
  now()
) ON CONFLICT DO NOTHING;
