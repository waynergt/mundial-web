import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

// Conexión a tu base de datos
const supabaseUrl = 'https://slwnehwhzfywmhldgzgb.supabase.co';
const supabaseKey = 'TU_ANON_KEY_AQUI'; // ¡Recuerda poner tu llave real aquí!
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  // Seguridad: solo permitimos peticiones GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    // --- DATOS FORZADOS DE PRUEBA ---
    // Si esto funciona, sabremos que el robot tiene control total de la base de datos
    const teamHome = "Argentina (Robot)";
    const teamAway = "Islandia (Robot)";
    const scoreHome = 5; 
    const scoreAway = 0;
    const matchMinute = "85'";

    // ¡Guardamos en tu base de datos!
    const { error } = await supabase
      .from('live_scores')
      .upsert({
        id: 1, // Usamos el ID 1 para sobreescribir el partido de México
        team_home: teamHome,
        team_away: teamAway,
        score_home: scoreHome,
        score_away: scoreAway,
        status: 'LIVE',
        minute: matchMinute
      });

    if (error) throw error;

    // Respuesta de éxito que verás en tu navegador
    return res.status(200).json({ 
      success: true, 
      message: '¡Prueba exitosa! El robot inyectó los datos falsos en Supabase.',
      data: { 
        teamHome, 
        teamAway, 
        scoreHome, 
        scoreAway, 
        matchMinute 
      }
    });

  } catch (error: any) {
    console.error('Error en el scraper:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}