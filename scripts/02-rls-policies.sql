-- Profiles RLS Policies

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Admins and superadmins can read all profiles
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Superadmins can update any profile
CREATE POLICY "Superadmins can update profiles" ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'superadmin'
    )
  );

-- Bookings RLS Policies

-- Users can read their own bookings
CREATE POLICY "Users can read own bookings" ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all bookings
CREATE POLICY "Admins can read all bookings" ON bookings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );

-- Users can create their own bookings
CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can update any booking
CREATE POLICY "Admins can update bookings" ON bookings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );
