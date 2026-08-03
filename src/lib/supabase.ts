import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oyutiogzsyxehjavabyb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8KR35izXMSAnW5fJ40IxIw_4_bVuHR9';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL and Anon Key must be defined in the .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
