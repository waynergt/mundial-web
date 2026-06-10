import { useState, useEffect } from 'react';
import { MatchCard } from './components/Live/MatchCard';
import { MatchesList } from './components/Live/MatchesList';
import { StandingsTable } from './components/Live/StandingsTable';
import { NewsCard } from './components/News/NewsCard';
import { Navigation } from './components/Shared/Navigation';
import { Home } from './components/Home';
import AdBanner from './components/AdBanner';
import { supabase } from './components/services/supabaseClient';; // Corregí la ruta, asumiendo que services NO está dentro de components

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [matches, setMatches] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: m } = await supabase.from('live_scores').select('*');
        const { data: s } = await supabase.from('group_standings').select('*');
        const { data: n } = await supabase.from('news').select('*');
        
        setMatches(m || []);
        setStandings(s || []);
        setNews(n || []);
      } catch (error) {
        console.error("Error conectando con Supabase:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 pb-32">
      <div className="max-w-md mx-auto">
        
        {activeTab === 'home' && <Home />}
        
        {/* --- PESTAÑA EN VIVO (A PRUEBA DE FALLOS) --- */}
        {activeTab === 'live' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* 1. Tarjetas de Partidos EN VIVO */}
            {matches && matches.filter((m: any) => m.status === 'LIVE').length > 0 ? (
              <div className="space-y-4">
                {matches.filter((m: any) => m.status === 'LIVE').map((m: any) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl shadow-inner">
                <span className="text-zinc-500 text-sm font-medium">No hay partidos en juego</span>
              </div>
            )}
            
            {/* 2. Lista de próximos partidos */}
            {matches && matches.filter((m: any) => m.status !== 'LIVE').length > 0 && (
              <MatchesList matches={matches.filter((m: any) => m.status !== 'LIVE')} />
            )}

            {/* 3. Tabla de Posiciones (A PRUEBA DE ERRORES) */}
            {standings && standings.length > 0 && (
              <div className="space-y-6">
                {standings.map((g: any, i: number) => {
                  // Validación extra de seguridad: Evita que "group.teams.map" explote
                  if (!g || !g.teams || !Array.isArray(g.teams)) return null;
                  return <StandingsTable key={i} group={g} />;
                })}
              </div>
            )}
            
          </div>
        )}

        {/* --- PESTAÑA NOTICIAS --- */}
        {activeTab === 'news' && (
          <div className="space-y-4 animate-fade-in">
            {news.map(n => <NewsCard key={n.id} news={n} />)}
          </div>
        )}

        <AdBanner />

        {/* --- CONTADOR Y FOOTER --- */}
        <div className="w-full flex flex-col items-center justify-center mt-12 mb-4 relative z-10">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 font-semibold">Visitas Globales</span>
          <img src="https://s05.flagcounter.com/count2/wyAF/bg_09090B/txt_A1A1AA/border_27272A/columns_2/maxflags_6/viewers_0/labels_0/pageviews_0/flags_0/percent_0/" alt="Flag Counter" className="rounded-xl border border-zinc-800/60 shadow-2xl opacity-90 hover:opacity-100 transition-opacity" />
        </div>

        <footer className="flex flex-col items-center justify-center gap-3 text-zinc-600 text-xs pb-4 relative z-10">
          <div className="flex items-center gap-2 justify-center">
            <span>Calendario No Oficial • Gratuito</span>
            <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-md font-mono">v1.4.6</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/50 px-4 py-1.5 rounded-full border border-zinc-800/50 shadow-sm">
            <span>Desarrollado por</span>
            <a href="https://github.com/waynergt" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
              Wayner López
            </a>
          </div>
        </footer>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}