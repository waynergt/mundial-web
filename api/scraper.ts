// @ts-nocheck
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

// Conexión a tu base de datos
const supabaseUrl = 'https://slwnehwhzfywmhldgzgb.supabase.co';
const supabaseKey = 'TU_ANON_KEY_AQUI'; // ¡Recuerda poner tu llave real!
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    // 1. Visitamos la versión de Guatemala de ESPN para los resultados
    const targetUrl = 'https://www.espn.com.gt/futbol/resultados'; 
    
    const response = await fetch(targetUrl, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' 
      }
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // 2. Extraemos los nombres con la clase que encontraste
    const teamHome = $('.short-name').eq(0).text().trim();
    const teamAway = $('.short-name').eq(1).text().trim();
    
    if (!teamHome) {
      return res.status(200).json({ 
        success: true, 
        message: 'No hay partidos en vivo con ese formato en este momento.' 
      });
    }

    // 3. Extraemos goles y tiempo
    const scoreHomeText = $('.score').eq(0).text().trim() || '0';
    const scoreAwayText = $('.score').eq(1).text().trim() || '0';
    const scoreHome = parseInt(scoreHomeText) || 0;
    const scoreAway = parseInt(scoreAwayText) || 0;
    
    const matchMinuteRaw = $('.game-time').first().text();
    const matchMinute = matchMinuteRaw.replace(/\s+/g, '') || 'LIVE';

    // 4. Guardamos la información real en Supabase
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
      message: '¡Marcador real extraído y guardado!',
      data: { teamHome, teamAway, scoreHome, scoreAway, matchMinute }
    });

  } catch (error: any) {
    console.error('Error en el scraper:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}