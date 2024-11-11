import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // .env 파일에 저장된 URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY; // .env 파일에 저장된 API 키

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function signOut() { // 로그아웃
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Logout successful');
    }
}
  
  

export default supabase;