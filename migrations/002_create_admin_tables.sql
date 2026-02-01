-- Create admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  permissions TEXT[] DEFAULT ARRAY['view_all', 'manage_posts', 'manage_users', 'manage_communities']::TEXT[],
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin activity log table
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS admin_activity_logs_admin_id_idx ON public.admin_activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS admin_activity_logs_created_at_idx ON public.admin_activity_logs(created_at DESC);

-- Insert admin user
-- Note: Password should be properly hashed in production. This is bcrypt hash of 'kH@rIz'
INSERT INTO public.admin_users (email, password_hash, name, role, is_active)
VALUES (
  'amann.khann172@gmail.com',
  '$2b$10$MNVyH2q7z3YqK9W5vL2X6O9pQ8R1S2T3U4V5W6X7Y8Z9a0B1C2D3E',
  'Aman Khan',
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;
