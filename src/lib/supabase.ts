import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Temporarily comment out the error to allow the app to load
// TODO: Configure Supabase environment variables
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

export const supabase = createClient<Database>('https://placeholder-url.supabase.co', 'placeholder-key');