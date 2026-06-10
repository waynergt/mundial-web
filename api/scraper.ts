import { createClient } from '@supabase/supabase-js';

// Conexión a tu base de datos
const supabaseUrl = 'https://slwnehwhzfywmhldgzgb.supabase.co';
const supabaseKey = 'sb_publishable_x_KqYiZhTtaRoJIUlu8CMg_aJK4UNWb'; // ¡Pon tu llave real aquí!
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  // Seguridad: solo permitimos peticiones GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    // --- DATOS FORZADOS DE PRUEBA PARA VERCEL ---
    const teamHome = "Argentina (Vercel)";
    const teamAway = "Islandia (Vercel)";
    const scoreHome = 5; 
    const scoreAway = 0;
    const matchMinute = "85'";

    // ¡Guardamos en tu base de datos!
    const { error } = await supabase
      .from('live_scores')
      .upsert({
        id: 1, 
        team_home: teamHome,
        team_away: teamAway,
        score_home: scoreHome,
        score_away: scoreAway,
        status: 'LIVE',
        minute: matchMinute
      });

    if (error) throw error;

    return res.status(200).json({ 
      success: true, 
      message: '¡Vercel ejecutó el Robot correctamente!',
      data: { teamHome, teamAway, scoreHome, scoreAway, matchMinute }
    });

  } catch (error: any) {
    console.error('Error en el scraper:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}