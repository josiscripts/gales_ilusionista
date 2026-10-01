CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins manage roles" ON public.user_roles
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Empresas',
  description text,
  duration text,
  location text,
  video_url text NOT NULL,
  thumbnail_url text,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Videos are public" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Admins manage videos" ON public.videos FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER videos_updated_at BEFORE UPDATE ON public.videos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Escenario',
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;
GRANT ALL ON public.gallery_photos TO service_role;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery is public" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_photos FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER gallery_updated_at BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  event_type text,
  event_date date,
  city text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a request" ON public.contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read requests" ON public.contact_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete requests" ON public.contact_requests FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));