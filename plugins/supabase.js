import { createClient } from '@supabase/supabase-js'
import config from '~/nuxt.config'

const SUPABASE_URL = config.env.supabaseUrl
const SUPABASE_KEY = config.env.supabaseKey
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
