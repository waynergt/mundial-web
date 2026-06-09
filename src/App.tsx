import { useState, useEffect } from 'react';
import { Calendar, Apple, Smartphone, ShieldCheck, Info, ChevronDown, X } from 'lucide-react';
import AdBanner from './components/AdBanner';

export default function App() {
  // Estados para controlar la interfaz
  const [showAndroidHelp, setShowAndroidHelp] = useState(false);
  const [showAppleHelp, setShowAppleHelp] = useState(false);
  
  // Estados para el Tutorial (Tour)
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const SUPABASE_URL = "https://slwnehwhzfywmhldgzgb.supabase.co/functions/v1/generar-calendario?mundial.ics";
  const appleCalendarUrl = SUPABASE_URL.replace(/^https?:/, 'webcal:');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(appleCalendarUrl)}`;

  // Verificar si es la primera visita cuando carga la página
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenMundialTour');
    if (!hasSeenTour) {
      // Retrasamos medio segundo la aparición para que sea más elegante
      const timer = setTimeout(() => setShowTour(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Función para cerrar el tutorial y guardar que ya lo vio
  const closeTour = () => {
    setShowTour(false);
    localStorage.setItem('hasSeenMundialTour', 'true');
  };

  // Datos de los pasos del tutorial
  const tourSteps = [
    {
      title: "¡Bienvenido a tu Guía!",
      description: "Sincroniza los 104 partidos del Mundial directamente en la agenda de tu celular, con alertas automáticas y en tu hora local.",
      icon: <Calendar className="w-10 h-10 text-emerald-400" />
    },
    {
      title: "1. Elige tu sistema",
      description: "Toca el botón blanco si usas iPhone / Mac, o el botón oscuro si utilizas un celular Android.",
      icon: <Smartphone className="w-10 h-10 text-blue-400" />
    },
    {
      title: "2. Activa las alertas",
      description: "¡Importante! Revisa las guías desplegables en la pantalla para asegurarte de que tu celular te avise 30 minutos antes de cada juego.",
      icon: <Info className="w-10 h-10 text-yellow-400" />
    },
    {
      title: "¡Todo listo!",
      description: "Los cruces de octavos y la gran final se actualizarán solos. ¡Añade el calendario y prepárate para el Mundial!",
      icon: <ShieldCheck className="w-10 h-10 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-[#09090b] selection:bg-emerald-500/30 relative">
      
      {/* --- OVERLAY DEL TUTORIAL --- */}
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-700/60 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
            
            {/* Botón de cerrar (X) */}
            <button onClick={closeTour} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300">
              <X className="w-5 h-5" />
            </button>

            {/* Contenido del paso actual */}
            <div className="flex flex-col items-center text-center space-y-4 mt-2">
              <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 shadow-inner">
                {tourSteps[tourStep].icon}
              </div>
              <h2 className="text-xl font-bold text-white">{tourSteps[tourStep].title}</h2>
              <p className="text-sm text-zinc-400 leading-relaxed min-h-[60px]">
                {tourSteps[tourStep].description}
              </p>
            </div>

            {/* Indicadores de progreso (Puntitos) */}
            <div className="flex justify-center gap-2 my-6">
              {tourSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === tourStep ? 'w-6 bg-emerald-500' : 'w-2 bg-zinc-700'}`}
                />
              ))}
            </div>

            {/* Botones de navegación del modal */}
            <div className="flex gap-3">
              {tourStep < tourSteps.length - 1 ? (
                <>
                  <button onClick={closeTour} className="w-full py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Omitir
                  </button>
                  <button 
                    onClick={() => setTourStep(prev => prev + 1)}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Siguiente
                  </button>
                </>
              ) : (
                <button 
                  onClick={closeTour}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                >
                  ¡Comenzar!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* --- FIN DEL TUTORIAL --- */}

      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Icono animado */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shadow-xl shadow-emerald-500/10 animate-pulse">
          <Calendar className="w-8 h-8" />
        </div>

        {/* Textos Principales */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
             <ShieldCheck className="w-3.5 h-3.5" />
             104 Partidos Oficiales Sincronizados a tu Dispositivo
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Guía Mundialista 2026
          </h1>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
            Sincroniza el calendario en tu teléfono. Los horarios se adaptan a tu hora local y los cruces de las eliminatorias se actualizarán automáticamente.
          </p>
        </div>

        {/* CONTENEDOR CENTRAL: Botones y Ayuda */}
        <div className="space-y-3">
          <div className="bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <a href={appleCalendarUrl} className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-all duration-200 shadow-lg active:scale-[0.98]">
              <Apple className="w-5 h-5 fill-current" />
              <span>Suscribirse en iPhone / Mac</span>
            </a>

            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-zinc-800 text-zinc-100 font-semibold rounded-2xl border border-zinc-700/50 hover:bg-zinc-700/50 hover:border-zinc-600 transition-all duration-200 active:scale-[0.98]">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span>Añadir a Google Calendar</span>
            </a>
          </div>

          {/* Acordeones de Ayuda */}
          <div className="space-y-2 w-full text-left mt-2">
            <div>
              <button 
                onClick={() => setShowAppleHelp(!showAppleHelp)}
                className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  ¿Cómo activar las alertas en iPhone?
                </span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAppleHelp ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAppleHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed space-y-2 shadow-inner">
                  <p>Por seguridad, iOS silencia las notificaciones de los calendarios nuevos. Para que tu celular te avise 30 min antes:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-1 text-zinc-300 font-medium">
                    <li>Al suscribirte, toca en <span className="text-white">Detalles de la suscripción</span>.</li>
                    <li>Apaga la opción <span className="text-blue-400">"Eliminar alertas"</span> (que quede gris).</li>
                    <li>Toca el cheque rojo de arriba para guardar.</li>
                  </ol>
                  <p className="mt-2 text-blue-500/80 italic">Si ya te suscribiste, puedes apagarlo en Ajustes {'>'} Calendario {'>'} Cuentas {'>'} Calendarios suscritos.</p>
                </div>
              </div>
            </div>

            <div>
              <button 
                onClick={() => setShowAndroidHelp(!showAndroidHelp)}
                className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-500" />
                  ¿No ves los partidos en Android?
                </span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAndroidHelp ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAndroidHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed space-y-2 shadow-inner">
                  <p>Por defecto, la app de Google pausa los calendarios nuevos para ahorrar datos. Sigue estos 3 pasos:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-1 text-zinc-300 font-medium">
                    <li>Abre tu app de <span className="text-white">Google Calendar</span>.</li>
                    <li>Ve a <span className="text-white">Ajustes / Configuración</span>.</li>
                    <li>Toca el calendario del Mundial y activa <span className="text-emerald-400">"Sincronizar"</span>.</li>
                  </ol>
                  <p className="mt-2 text-emerald-500/80 italic">¡Listo! Los partidos cargarán automáticamente en un par de minutos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner de Publicidad Automática */}
        <AdBanner />

        {/* Contador de Visitas Globales */}
        <div className="w-full flex flex-col items-center justify-center mt-2 mb-6">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 font-semibold">
            Visitas Globales
          </span>
          <a 
            href="https://info.flagcounter.com/wyAF" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="https://s05.flagcounter.com/count2/wyAF/bg_09090B/txt_A1A1AA/border_27272A/columns_2/maxflags_6/viewers_0/labels_0/pageviews_0/flags_0/percent_0/" 
              alt="Flag Counter" 
              className="rounded-xl border border-zinc-800/60 shadow-2xl opacity-90 hover:opacity-100"
            />
          </a>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center gap-3 text-zinc-600 text-xs tracking-wide pb-8">
          <div className="flex items-center gap-2 justify-center">
            <span>Calendario No Oficial • Totalmente Gratuito</span>
            <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-md font-mono">
              v1.3.0
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/50 px-4 py-1.5 rounded-full border border-zinc-800/50 shadow-sm">
            <span>Desarrollado por</span>
            <a 
              href="https://github.com/waynergt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              Wayner López
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}