import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slwnehwhzfywmhldgzgb.supabase.co';
const supabaseKey = 'sb_publishable_x_KqYiZhTtaRoJIUlu8CMg_aJK4UNWb'; // Asegúrate de poner tu llave real

export const supabase = createClient(supabaseUrl, supabaseKey);