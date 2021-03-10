import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://mpdinkozdhzfxywnzhth.supabase.co'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDI0MDE4OCwiZXhwIjoxOTI5ODE2MTg4fQ.5yxWNa3G-Ee4G_vrdZe1372eVdD-pvNsdQ3NhWNR4Dw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
