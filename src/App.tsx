import { useState, useEffect } from 'react';
import { Calendar, Apple, Smartphone, ShieldCheck, Info, ChevronDown, Radio, Newspaper, Trophy, Clock, CheckCircle2 } from 'lucide-react';
import { Joyride, STATUS } from 'react-joyride';
import AdBanner from './components/AdBanner';

const JoyrideTour = Joyride as any;

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'live' | 'news'>('home');
  // Sub-pestaña interna para la sección En Vivo: 'matches' (Historial/Próximos) o 'standings' (Tablas)
  const [liveSubTab, setLiveSubTab] = useState<'matches' | 'standings'>('matches');
  
  const [showAndroidHelp, setShowAndroidHelp] = useState(false);
  const [showAppleHelp, setShowAppleHelp] = useState(false);
  const [runTour, setRunTour] = useState(false);

  // MOCK DATA: Lista ampliada de partidos para diseñar el Historial, En Vivo y Próximos
  const [tournamentMatches] = useState([
    {
      id: 101,
      home: "México",
      away: "Sudáfrica",
      home_score: 2,
      away_score: 1,
      time: "13:00",
      status: "FINISHED", // Historial / Resultado
      stage: "Grupo A - Jornada 1"
    },
    {
      id: 102,
      home: "Estados Unidos",
      away: "Jamaica",
      home_score: 1,
      away_score: 1,
      time: "Min 72'",
      status: "LIVE", // En Vivo actual
      stage: "Grupo B - Jornada 1"
    },
    {
      id: 103,
      home: "Canadá",
      away: "Omán",
      home_score: 0,
      away_score: 0,
      time: "17:00",
      status: "SCHEDULED", // Próximo partido hoy
      stage: "Based en Hoy - 17:00"
    },
    {
      id: 104,
      home: "Argentina",
      away: "Francia",
      home_score: 0,
      away_score: 0,
      time: "Mañana",
      status: "SCHEDULED", // Próximos días
      stage: "Grupo C - Mañana 19:00"
    }
  ]);

  // MOCK DATA: Estructura para la tabla de posiciones de grupos (Mundial 2026 usa 12 grupos de 4)
  const [groupStandings] = useState([
    {
      groupName: "Grupo A",
      teams: [
        { rank: 1, name: "México", pj: 1, g: 1, e: 0, p: 0, gf: 2, gc: 1, pts: 3 },
        { rank: 2, name: "Italia", pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
        { rank: 3, name: "Camerún", pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
        { rank: 4, name: "Sudáfrica", pj: 1, g: 0, e: 0, p: 1, gf: 1, gc: 2, pts: 0 },
      ]
    }
  ]);

  const [newsList] = useState([
    {
      id: 1,
      title: "Guatemala se prepara para la cobertura del partido inaugural",
      summary: "La fiebre futbolera empieza a sentirse en el país con pantallas gigantes programadas en distintas zonas del país.",
      category: "Nacional",
      time: "Hace 10 min",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80"
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
    <div className="min-h-[100dvh] pb-32 flex flex-col items-center justify-start p-6 bg-[#09090b] text-white selection:bg-emerald-500/30 relative">
      
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

              <div>
                <button onClick={() => setShowAndroidHelp(!showAndroidHelp)} className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors">
                  <span className="flex items-center gap-2"><Info className="w-4 h-4 text-emerald-500" />¿No ves los partidos en Android?</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAndroidHelp ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAndroidHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed space-y-1 shadow-inner">
                    <p>Por defecto, la app de Google causa que los calendarios nuevos no se sincronicen de golpe. Ve a tu app de Google Calendar {'>'} Configuración {'>'} Toca el calendario y activa <span className="text-emerald-400">"Sincronizar"</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VISTA PARTIDOS EN VIVO / ESTADÍSTICAS --- */}
        {activeTab === 'live' && (
          <div className="space-y-5 text-left animate-fade-in">
            
            {/* Selector de Sub-Pestañas Superiores */}
            <div className="bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 flex gap-1">
              <button 
                onClick={() => setLiveSubTab('matches')} 
                className={`w-1/2 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${liveSubTab === 'matches' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-400'}`}
              >
                <Radio className={`w-3.5 h-3.5 ${liveSubTab === 'matches' ? 'text-red-400' : ''}`} />
                Partidos y Resultados
              </button>
              <button 
                onClick={() => setLiveSubTab('standings')} 
                className={`w-1/2 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${liveSubTab === 'standings' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-400'}`}
              >
                <Trophy className={`w-3.5 h-3.5 ${liveSubTab === 'standings' ? 'text-yellow-400' : ''}`} />
                Tabla de Posiciones
              </button>
            </div>

            {/* SUB-SECCIÓN A: PARTIDOS (Historial, En vivo y Próximos) */}
            {liveSubTab === 'matches' && (
              <div className="space-y-4">
                {tournamentMatches.map(match => (
                  <div key={match.id} className="bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-4 space-y-3 shadow-xl">
                    <div className="flex justify-between items-center text-[11px] text-zinc-500 font-medium">
                      <span>{match.stage}</span>
                      
                      {/* Renderizado condicional de insignias según el estado del juego */}
                      {match.status === 'LIVE' && (
                        <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold animate-pulse">
                          <Radio className="w-3 h-3" /> En Vivo • {match.time}
                        </span>
                      )}
                      {match.status === 'FINISHED' && (
                        <span className="inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Finalizado
                        </span>
                      )}
                      {match.status === 'SCHEDULED' && (
                        <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" /> {match.time}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center px-2">
                      <div className="w-5/12 text-left font-bold text-sm tracking-wide text-zinc-200">{match.home}</div>
                      
                      {/* Marcador dinámico según el estado */}
                      <div className="w-2/12 flex items-center justify-center gap-2 text-xl font-black font-mono">
                        {match.status === 'SCHEDULED' ? (
                          <span className="text-zinc-600 text-sm font-normal">VS</span>
                        ) : (
                          <>
                            <span className={match.status === 'LIVE' ? 'text-red-400' : 'text-white'}>{match.home_score}</span>
                            <span className="text-zinc-700 text-sm">-</span>
                            <span className={match.status === 'LIVE' ? 'text-red-400' : 'text-white'}>{match.away_score}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="w-5/12 text-right font-bold text-sm tracking-wide text-zinc-200">{match.away}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUB-SECCIÓN B: TABLA DE POSICIONES */}
            {liveSubTab === 'standings' && (
              <div className="space-y-6">
                {groupStandings.map((group, gIdx) => (
                  <div key={gIdx} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 shadow-xl space-y-3">
                    <h3 className="text-sm font-bold text-emerald-400 border-b border-zinc-800 pb-2">{group.groupName}</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left text-zinc-400">
                        <thead className="text-[10px] uppercase text-zinc-600 font-bold border-b border-zinc-800/50">
                          <tr>
                            <th className="py-2 w-8 text-center">Pos</th>
                            <th className="py-2">Equipo</th>
                            <th className="py-2 text-center w-8">PJ</th>
                            <th className="py-2 text-center w-8">GD</th>
                            <th className="py-2 text-center w-8 text-white font-bold">Pts</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/30">
                          {group.teams.map((team, tIdx) => (
                            <tr key={tIdx} className="hover:bg-zinc-800/20 transition-colors">
                              <td className="py-2.5 text-center font-mono text-zinc-500 font-bold">{team.rank}</td>
                              <td className="py-2.5 font-semibold text-zinc-200">{team.name}</td>
                              <td className="py-2.5 text-center font-mono">{team.pj}</td>
                              <td className="py-2.5 text-center font-mono text-zinc-500">{team.gf - team.gc}</td>
                              <td className="py-2.5 text-center font-mono text-white font-bold bg-zinc-800/30 rounded-md">{team.pts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

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

        {/* --- CONTADOR DE VISITAS --- */}
        <div className="w-full flex flex-col items-center justify-center mt-8 mb-4 relative z-10">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 font-semibold">
            Visitas Globales
          </span>
          <a href="https://info.flagcounter.com/wyAF" target="_blank" rel="noopener noreferrer">
            <img src="https://s05.flagcounter.com/count2/wyAF/bg_09090B/txt_A1A1AA/border_27272A/columns_2/maxflags_6/viewers_0/labels_0/pageviews_0/flags_0/percent_0/" alt="Flag Counter" className="rounded-xl border border-zinc-800/60 shadow-2xl opacity-90 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* --- FOOTER / FIRMA --- */}
        <footer className="flex flex-col items-center justify-center gap-3 text-zinc-600 text-xs tracking-wide pb-4 relative z-10">
          <div className="flex items-center gap-2 justify-center">
            <span>Calendario No Oficial • Gratuito</span>
            <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-md font-mono">v1.6.0</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/50 px-4 py-1.5 rounded-full border border-zinc-800/50 shadow-sm">
            <span>Desarrollado por</span>
            <a href="https://github.com/waynergt" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
              Wayner López
            </a>
          </div>
        </footer>

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