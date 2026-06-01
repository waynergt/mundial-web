import { Calendar, Apple, Smartphone } from 'lucide-react';

export default function App() {
  // Tu API real de Supabase
  const SUPABASE_URL = "https://slwnehwhzfywmhldgzgb.supabase.co/functions/v1/generar-calendario";

  // Enlaces mágicos para los calendarios
  const appleCalendarUrl = SUPABASE_URL.replace(/^https?:/, 'webcal:');
  const googleCalendarUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(SUPABASE_URL)}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#09090b] selection:bg-emerald-500/30">
      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Icono animado */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shadow-xl shadow-emerald-500/10 animate-pulse">
          <Calendar className="w-8 h-8" />
        </div>

        {/* Títulos */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Guía Mundialista 26
          </h1>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
            Sincroniza todos los partidos en tu teléfono. Los horarios se adaptan automáticamente a tu hora local.
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

          <p className="text-[11px] text-zinc-500 pt-2">
            * Conexión dinámica: los cruces finales se actualizarán solos.
          </p>
        </div>

        <footer className="text-zinc-600 text-xs tracking-wide">
          Calendario No Oficial • Totalmente Gratuito
        </footer>
      </div>
    </div>
  );
}