import { useState, useEffect } from 'react';
import { NewsCard } from './components/News/NewsCard';
import { Navigation } from './components/Shared/Navigation';
import { Home } from './components/Home';
import AdBanner from './components/AdBanner';
import { supabase } from './components/services/supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: n } = await supabase.from('news').select('*');
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
        
        {/* --- PESTAÑA INICIO --- */}
        {activeTab === 'home' && <Home />}
        
        {/* --- PESTAÑA EN VIVO (EN MANTENIMIENTO) --- */}
        {activeTab === 'live' && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 animate-fade-in">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 shadow-2xl">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-xl font-bold text-white mb-2">En Mantenimiento</h2>
              <p className="text-zinc-400 text-sm max-w-[250px]">
                Estamos optimizando nuestros motores de datos para traerte los marcadores en tiempo real. ¡MUY PRONTO!
              </p>
            </div>
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