import { Calendar, Apple, Smartphone, ShieldCheck, Info, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const Home = () => {
  const [showAppleHelp, setShowAppleHelp] = useState(false);
  const [showAndroidHelp, setShowAndroidHelp] = useState(false);

  const SUPABASE_URL = "https://slwnehwhzfywmhldgzgb.supabase.co/functions/v1/generar-calendario?mundial.ics";
  const appleCalendarUrl = SUPABASE_URL.replace(/^https?:/, 'webcal:');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(appleCalendarUrl)}`;

  return (
    <div className="space-y-8 text-center animate-fade-in">
      <div className="space-y-4">
        
        {/* --- EFECTO LUCIÉRNAGA --- */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shadow-2xl shadow-emerald-500/30 animate-pulse mb-2">
          <Calendar className="w-8 h-8" />
        </div>
        
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
             <ShieldCheck className="w-3.5 h-3.5" /> 104 Partidos Oficiales
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          Guía Mundialista 2026
        </h1>
        <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
          Sincroniza el calendario en tu teléfono. Los horarios se adaptan a tu hora local automáticamente.
        </p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-2xl relative z-10">
        <a href={appleCalendarUrl} className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-all duration-200 shadow-lg active:scale-[0.98]">
          <Apple className="w-5 h-5 fill-current" /> Suscribirse en iPhone / Mac
        </a>
        <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-zinc-800 text-zinc-100 font-semibold rounded-2xl border border-zinc-700/50 hover:bg-zinc-700/50 hover:border-zinc-600 transition-all duration-200 active:scale-[0.98]">
          <Smartphone className="w-5 h-5 text-emerald-400" /> Añadir a Google Calendar
        </a>
      </div>

      {/* --- BOTONES DE AYUDA RESTAURADOS --- */}
      <div className="text-left space-y-3 relative z-10">
        
        {/* TARJETA APPLE */}
        <div>
          <button onClick={() => setShowAppleHelp(!showAppleHelp)} className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors">
            <span className="flex items-center gap-2"><Info className="w-4 h-4 text-blue-500" />¿Cómo activar las alertas en iPhone?</span>
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAppleHelp ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAppleHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed shadow-inner space-y-3">
              <p>Por seguridad, iOS silencia las notificaciones de los calendarios nuevos. Para que tu celular te avise 30 min antes:</p>
              <div className="space-y-1.5">
                <p>1. Al suscribirte, toca en <span className="text-white font-semibold">Detalles de la suscripción</span>.</p>
                <p>2. Apaga la opción <span className="text-blue-400">"Eliminar alertas"</span> (que quede gris).</p>
                <p>3. Toca el cheque rojo de arriba para guardar.</p>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA ANDROID */}
        <div>
          <button onClick={() => setShowAndroidHelp(!showAndroidHelp)} className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl text-sm text-zinc-300 hover:bg-zinc-800/50 transition-colors">
            <span className="flex items-center gap-2"><Info className="w-4 h-4 text-emerald-500" />¿No ves los partidos en Android?</span>
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAndroidHelp ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAndroidHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800/40 rounded-2xl text-xs text-zinc-400 leading-relaxed shadow-inner space-y-3">
              <p>Por defecto, la app de Google pausa los calendarios nuevos. Sigue estos 3 pasos:</p>
              <div className="space-y-1.5">
                <p>1. Abre tu app de <span className="text-white font-semibold">Google Calendar</span>.</p>
                <p>2. Ve a <span className="text-white font-semibold">Configuración</span>.</p>
                <p>3. Toca el calendario del Mundial y activa <span className="text-emerald-400">"Sincronizar"</span>.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};