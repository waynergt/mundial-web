// @ts-nocheck
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slwnehwhzfywmhldgzgb.supabase.co';
const supabaseKey = 'sb_publishable_x_KqYiZhTtaRoJIUlu8CMg_aJK4UNWb'; // ¡Pon tu llave real!
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.espn.com.gt/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Seleccionamos los elementos basándonos en tu inspección
    const teamHome = $('.short-name').eq(0).text().trim();
    const teamAway = $('.short-name').eq(1).text().trim();
    const scoreHome = parseInt($('.score').eq(0).text()) || 0;
    const scoreAway = parseInt($('.score').eq(1).text()) || 0;
    const matchMinute = $('.game-time').text().replace(/\s+/g, '').trim();

    // Guardamos en Supabase
    await supabase.from('live_scores').upsert({
      id: 1,
      team_home: teamHome,
      team_away: teamAway,
      score_home: scoreHome,
      score_away: scoreAway,
      status: 'LIVE',
      minute: matchMinute
    });

    return res.status(200).json({ success: true, teamHome, scoreHome, teamAway, scoreAway });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}