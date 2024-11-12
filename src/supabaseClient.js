import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // .env 파일에 저장된 URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY; // .env 파일에 저장된 API 키

const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
export default supabase;