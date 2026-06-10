// @ts-nocheck
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slwnehwhzfywmhldgzgb.supabase.co';
const supabaseKey = 'sb_publishable_x_KqYiZhTtaRoJIUlu8CMg_aJK4UNWb'; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    // Usamos una URL directa de ESPN
    const response = await fetch('https://www.espn.com.gt/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Buscamos los datos reales
    const teamHome = $('.short-name').eq(0).text().trim() || "Esperando";
    const teamAway = $('.short-name').eq(1).text().trim() || "Esperando";
    
    // Guardamos en Supabase
    await supabase.from('live_scores').upsert({
      id: 1,
      team_home: teamHome,
      team_away: teamAway,
      score_home: 0,
      score_away: 0,
      status: 'LIVE',
      minute: 'LIVE'
    });

    return res.status(200).json({ 
      success: true, 
      message: "Robot ejecutado",
      data: { teamHome, teamAway } 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}