import { useState, useEffect } from 'react';
import { Calendar, Apple, Smartphone, ShieldCheck, Info, ChevronDown, Radio, Newspaper } from 'lucide-react';
import { Joyride, STATUS } from 'react-joyride';
import AdBanner from './components/AdBanner';

const JoyrideTour = Joyride as any;

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'live' | 'news'>('home');
  
  const [showAndroidHelp, setShowAndroidHelp] = useState(false);
  const [showAppleHelp, setShowAppleHelp] = useState(false);
  const [runTour, setRunTour] = useState(false);

  const [newsList] = useState([
    {
      id: 1,
      title: "Guatemala se prepara para la cobertura del partido inaugural",
      summary: "La fiebre futbolera empieza a sentirse en el país con pantallas gigantes programadas en distintas zonas del país.",
      category: "Nacional",
      time: "Hace 10 min",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80"
    },
    {
      id: 2,
      title: "Estadio Azteca reporta lleno total para la inauguración",
      summary: "Los organizadores confirman que no queda un solo boleto disponible para la gran fiesta inaugural del 11 de junio.",
      category: "Deportes",
      time: "Hace 1 hora",
      image: "https://images.unsplash.com/photo-1540747737956-378724044282?w=500&q=80"
    }
  ]);

  const [liveMatches] = useState([
    {
      id: 101,
      home: "México",
      away: "Sudáfrica",
      home_score: 1,
      away_score: 0,
      minute: 34,
      status: "LIVE",
      stage: "Grupo A"
    }
  ]);

  const SUPABASE_URL = "https://slwnehwhzfywmhldgzgb.supabase.co/functions/v1/generar-calendario?mundial.ics";
  const appleCalendarUrl = SUPABASE_URL.replace(/^https?:/, 'webcal:');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(appleCalendarUrl)}`;

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('tour_oficial_v1');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setRunTour(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data: any) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setRunTour(false);
      localStorage.setItem('tour_oficial_v1', 'true');
    }
  };

  return (
    <div className="min-h-[100dvh] pb-24 flex flex-col items-center justify-start p-6 bg-[#09090b] text-white selection:bg-emerald-500/30 relative">
      
      <JoyrideTour
        steps={[
          { target: '#tour-header', content: '¡Bienvenido! Sincroniza los 104 partidos del Mundial directamente en la agenda de tu celular.', disableBeacon: true },
          { target: '#tour-tabs', content: 'Navega entre el Calendario, los resultados En Vivo y las últimas Noticias aquí abajo.', disableBeacon: true }
        ]}
        run={runTour}
        continuous={true}
        callback={handleJoyrideCallback}
        styles={{ options: { arrowColor: '#18181b', backgroundColor: '#18181b', overlayColor: 'rgba(0, 0, 0, 0.85)', primaryColor: '#10b981', textColor: '#e4e4e7', zIndex: 1000 }, beacon: { display: 'none' } }}
      />

      <div className="w-full max-w-md space-y-6 mt-4">
        
        {/* --- VISTA INICIO / CALENDARIO --- */}
        {activeTab === 'home' && (
          <div className="space-y-8 text-center animate-fade-in">
            <div id="tour-header" className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shadow-xl shadow-emerald-500/10 mb-2">
                <Calendar className="w-8 h-8" />
              </div>
              
              {/* RESTAURAMOS EL BADGE DE SHIELDCHECK */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
                   <ShieldCheck className="w-3.5 h-3.5" />
                   104 Partidos Oficiales
                </div>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                Guía Mundialista 2026
              </h1>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                Sincroniza el calendario en tu teléfono. Los horarios se adaptan a tu hora local automáticamente.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-2xl">
              <a id="tour-apple" href={appleCalendarUrl} className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-all duration-200 shadow-lg active:scale-[0.98]">
                <Apple className="w-5 h-5 fill-current" />
                <span>Suscribirse en iPhone / Mac</span>
              </a>
              <a id="tour-android" href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-zinc-800 text-zinc-100 font-semibold rounded-2xl border border-zinc-700/50 hover:bg-zinc-700/50 hover:border-zinc-600 transition-all duration-200 active:scale-[0.98]">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Añadir a Google Calendar</span>
              </a>
            </div>

            <div id="tour-help" className="space-y-2 text-left">
              {/* AYUDA APPLE */}
              <div>
                <button onClick={() => setShowAppleHelp(!showAppleHelp)} className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors">
                  <span className="flex items-center gap-2"><Info className="w-4 h-4 text-blue-500" />¿Cómo activar las alertas en iPhone?</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAppleHelp ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAppleHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed space-y-1 shadow-inner">
                    <p>Por seguridad, iOS silencia los calendarios nuevos. Al suscribirte, toca en <span className="text-white">Detalles de la suscripción</span>, apaga <span className="text-blue-400">"Eliminar alertas"</span> y guarda.</p>
                  </div>
                </div>
              </div>

              {/* RESTAURAMOS AYUDA ANDROID */}
              <div>
                <button onClick={() => setShowAndroidHelp(!showAndroidHelp)} className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors">
                  <span className="flex items-center gap-2"><Info className="w-4 h-4 text-emerald-500" />¿No ves los partidos en Android?</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAndroidHelp ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAndroidHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed space-y-1 shadow-inner">
                    <p>Por defecto, la app de Google pausa los calendarios nuevos. Ve a tu app de Google Calendar {'>'} Configuración {'>'} Toca el calendario y activa <span className="text-emerald-400">"Sincronizar"</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VISTA PARTIDOS EN VIVO --- */}
        {activeTab === 'live' && (
          <div className="space-y-4 text-left animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <h2 className="text-xl font-bold tracking-tight">Marcadores en Vivo</h2>
            </div>
            
            {liveMatches.map(match => (
              <div key={match.id} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>{match.stage}</span>
                  <span className="bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold animate-pulse">
                    En Vivo • Min {match.minute}'
                  </span>
                </div>
                <div className="flex justify-between items-center px-4">
                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <span className="font-bold text-center text-zinc-100">{match.home}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 w-1/3 text-3xl font-extrabold font-mono tracking-wider">
                    <span>{match.home_score}</span>
                    <span className="text-zinc-600 text-xl">-</span>
                    <span>{match.away_score}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <span className="font-bold text-center text-zinc-100">{match.away}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VISTA NOTICIAS --- */}
        {activeTab === 'news' && (
          <div className="space-y-4 text-left animate-fade-in">
            <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-400" />
              Portal de Noticias GT
            </h2>
            
            {newsList.map(news => (
              <div key={news.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/10">{news.category}</span>
                    <span className="text-zinc-500">{news.time}</span>
                  </div>
                  <h3 className="font-bold text-zinc-100 leading-snug hover:text-emerald-400 transition-colors">{news.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{news.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <AdBanner />

        {/* --- BARRA DE NAVEGACIÓN INFERIOR --- */}
        <div id="tour-tabs" className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-lg rounded-2xl p-2 flex justify-around items-center shadow-2xl z-40">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${activeTab === 'home' ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-medium">Calendario</span>
          </button>
          
          <button onClick={() => setActiveTab('live')} className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${activeTab === 'live' ? 'text-red-400 bg-red-500/10' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Radio className="w-5 h-5" />
            <span className="text-[10px] font-medium">En Vivo</span>
          </button>
          
          <button onClick={() => setActiveTab('news')} className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${activeTab === 'news' ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Newspaper className="w-5 h-5" />
            <span className="text-[10px] font-medium">Noticias</span>
          </button>
        </div>

      </div>
    </div>
  );
}