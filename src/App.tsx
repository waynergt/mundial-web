import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { LiveTab } from './components/Live/LiveTab';
import { NewsCard } from './components/News/NewsCard';
import { Navigation } from './components/Shared/Navigation';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AdminLoginModal } from './components/Admin/AdminLoginModal';
import AdBanner from './components/AdBanner';
import { supabase } from './components/services/supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [matches, setMatches] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  
  // Controles del Admin
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [clicks, setClicks] = useState(0);

  const fetchData = async () => {
    try {
      const { data: m } = await supabase
        .from('matches')
        .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)')
        .order('match_date', { ascending: true });
        
      const { data: s } = await supabase.from('group_standings').select('*');
      const { data: n } = await supabase.from('news').select('*');
      
      setMatches(m || []);
      setStandings(s || []);
      setNews(n || []);
    } catch (error) {
      console.error("Error conectando con Supabase:", error);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // Auto-Scroll hacia arriba al cambiar de pestaña
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 pb-32">
      <div className="max-w-md mx-auto">
        
        {/* Renderizado Condicional por Pestaña */}
        {activeTab === 'home' && <Home />}
        
        {activeTab === 'live' && (
          <LiveTab matches={matches} standings={standings} />
        )}

        {activeTab === 'news' && (
          <div className="space-y-4 animate-fade-in">
            {news.map(n => <NewsCard key={n.id} news={n} />)}
          </div>
        )}

        {/* Modales y Paneles (Ocultos por defecto) */}
        {showLoginModal && (
          <AdminLoginModal 
            onLogin={() => {
              setShowAdmin(true);
              setShowLoginModal(false);
            }} 
            onClose={() => setShowLoginModal(false)} 
          />
        )}

        {showAdmin && (
          <AdminPanel 
            matches={matches} 
            onRefresh={fetchData} 
            onClose={() => setShowAdmin(false)} 
          />
        )}

        <AdBanner />

        {/* --- FOOTER Y CONTADOR CORREGIDO --- */}
        <footer className="mt-12 flex flex-col items-center gap-4 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 font-semibold">Visitas Globales</span>
            <img 
              src="https://s05.flagcounter.com/count2/wyAF/bg_09090B/txt_A1A1AA/border_27272A/columns_2/maxflags_6/viewers_0/labels_0/pageviews_0/flags_0/percent_0/" 
              alt="Flag Counter" 
              className="rounded-xl shadow-2xl opacity-90 transition-opacity" 
            />
          </div>
          <div className="flex items-center gap-2 justify-center text-xs text-zinc-600">
            <span>Calendario No Oficial</span>
            <span 
              onClick={() => { 
                setClicks(c => c + 1); 
                if (clicks + 1 >= 5) { 
                  setShowLoginModal(true); 
                  setClicks(0); 
                } 
              }}
              className="text-[9px] bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md text-zinc-500 font-mono cursor-pointer hover:text-zinc-300 transition-colors select-none"
            >
              v1.6.3
            </span>
          </div>
        </footer>
      </div>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}