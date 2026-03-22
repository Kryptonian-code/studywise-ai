-- Create user background profiles for reuse across projects
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  nationality TEXT,
  current_country TEXT,
  degree TEXT,
  institution TEXT,
  graduation_year INTEGER,
  programme_studied TEXT,
  gpa TEXT,
  gpa_scale TEXT,
  study_level TEXT,
  work_experience TEXT,
  research_experience TEXT,
  publications TEXT,
  skills TEXT,
  achievements TEXT,
  career_goals TEXT,
  personal_statement_notes TEXT,
  has_study_gap BOOLEAN DEFAULT false,
  study_gap_explanation TEXT,
  is_career_change BOOLEAN DEFAULT false,
  career_change_context TEXT,
  low_gpa BOOLEAN DEFAULT false,
  limited_research BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();