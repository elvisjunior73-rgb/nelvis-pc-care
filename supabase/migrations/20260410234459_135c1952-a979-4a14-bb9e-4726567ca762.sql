
ALTER TABLE public.interventions
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS license_code text;
