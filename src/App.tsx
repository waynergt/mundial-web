import { Calendar, Apple, Smartphone, ShieldCheck } from 'lucide-react';
import AdBanner from './components/AdBanner';

export default function App() {
  // Tu API real de Supabase (¡Asegúrate de que sea la tuya!)
  const SUPABASE_URL = "https://slwnehwhzfywmhldgzgb.supabase.co/functions/v1/generar-calendario?feed.ics";

  // Enlaces mágicos para los calendarios
  const appleCalendarUrl = SUPABASE_URL.replace(/^https?:/, 'webcal:');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(SUPABASE_URL)}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#09090b] selection:bg-emerald-500/30">
      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Icono animado */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shadow-xl shadow-emerald-500/10 animate-pulse">
          <Calendar className="w-8 h-8" />
        </div>

        {/* Textos Principales MEJORADOS */}
        <div className="space-y-4">
          
          {/* Badge Informativo Sutil */}
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

        {/* Botones de acción */}
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

        <footer className="text-zinc-600 text-xs tracking-wide pb-8">
          Calendario No Oficial • Totalmente Gratuito
        </footer>
      </div>
    </div>
  );
}