import ws from 'ws';
global.WebSocket = ws;

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️  Faltan variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY');
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      enabled: false
    }
  });
}

const supabase = getSupabase();

export default supabase;