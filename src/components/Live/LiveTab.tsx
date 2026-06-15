import { useState } from 'react';
import { MatchCard } from './MatchCard';
import { MatchesList } from './MatchesList';
import { StandingsTable } from './StandingsTable';

// --- SUB-COMPONENTE ELEGANTE PARA LOS DESPLEGABLES ---
const Accordion = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handlePress = () => {
    // Hace que el celular vibre muy suavemente por 30 milisegundos (si es compatible)
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-zinc-800/60 rounded-2xl overflow-hidden bg-zinc-900/30 mb-3 transition-all duration-300">
      <button
        onClick={handlePress}
        /* Aquí está la magia: active:scale-[0.98] y active:bg-zinc-800/80 hacen que se hunda */
        className="w-full flex justify-between items-center p-4 text-sm font-bold text-zinc-300 hover:bg-zinc-800/50 transition-all duration-200 active:scale-[0.98] active:bg-zinc-800/80 focus:outline-none"
      >
        <span className="uppercase tracking-widest text-xs text-emerald-500/90">{title}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 pt-0 border-t border-zinc-800/40 space-y-3 mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

interface LiveTabProps {
  matches: any[];
  standings: any[];
}

export function LiveTab({ matches, standings }: LiveTabProps) {
  const now = new Date();

  // --- FUNCIONES PARA IDENTIFICAR LOS DÍAS ---
  const isToday = (dateString: string) => {
    const d = new Date(dateString);
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  const isPastDay = (dateString: string) => {
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isFutureDay = (dateString: string) => {
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    return d > today;
  };

  // --- CLASIFICACIÓN DE PARTIDOS ---
  const liveMatches: any[] = [];
  const todayMatches: any[] = [];
  const pastMatchesByDate: { [key: string]: any[] } = {};
  const upcomingMatches: any[] = [];

  matches.forEach(m => {
    const mDate = new Date(m.match_date);
    const diffMins = (now.getTime() - mDate.getTime()) / 60000;
    const isLive = diffMins >= 0 && diffMins < 125 && m.status !== 'FINISHED';

    if (isLive) {
      liveMatches.push(m);
    } else if (isToday(m.match_date)) {
      todayMatches.push(m);
    } else if (isPastDay(m.match_date)) {
      // Formatea la fecha para que diga ej: "Jueves, 11 de junio"
      const dateLabel = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(mDate);
      if (!pastMatchesByDate[dateLabel]) pastMatchesByDate[dateLabel] = [];
      pastMatchesByDate[dateLabel].push(m);
    } else if (isFutureDay(m.match_date)) {
      upcomingMatches.push(m);
    }
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-zinc-800 pb-2">
        <h2 className="text-xl font-bold tracking-tight">Centro de Partidos</h2>
        <p className="text-xs text-zinc-400">Resultados oficiales y próximos encuentros</p>
      </div>
      
      {/* 1. SECCIÓN: EN JUEGO */}
      {liveMatches.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-red-500 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> En Juego
          </h3>
          <div className="space-y-4">
            {liveMatches.map(m => <MatchCard key={m.id} match={m} isLiveForced={true} />)}
          </div>
        </section>
      )}

      {/* 2. SECCIÓN: PARTIDOS DE HOY */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-emerald-500 uppercase border-l-2 border-emerald-500 pl-2">
          Partidos de Hoy
        </h3>
        {todayMatches.length > 0 ? (
          <div className="space-y-3">
            {todayMatches.map(m => <MatchCard key={m.id} match={m} isLiveForced={false} />)}
          </div>
        ) : (
          <p className="text-[11px] text-zinc-500 italic bg-zinc-900/20 p-3 rounded-xl border border-zinc-800/30">
            No hay más partidos programados para el día de hoy.
          </p>
        )}
      </section>

      {/* 3. SECCIÓN: HISTORIAL DESPLEGABLE */}
      {Object.keys(pastMatchesByDate).length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-500 uppercase border-l-2 border-zinc-700 pl-2 mb-4">
            Resultados Anteriores
          </h3>
          {Object.entries(pastMatchesByDate).reverse().map(([dateLabel, dayMatches]) => (
            <Accordion key={dateLabel} title={dateLabel}>
              {dayMatches.map(m => <MatchCard key={m.id} match={m} isLiveForced={false} />)}
            </Accordion>
          ))}
        </section>
      )}

      {/* 4. SECCIÓN: PRÓXIMAMENTE */}
      {upcomingMatches.length > 0 && (
        <section className="space-y-3 pt-2">
          <Accordion title="Próximamente">
            <MatchesList matches={upcomingMatches} />
          </Accordion>
        </section>
      )}

      {/* 5. SECCIÓN: TABLA DE POSICIONES */}
      {standings && standings.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-zinc-800/50">
          <h3 className="text-xs font-bold text-zinc-500 uppercase border-l-2 border-zinc-700 pl-2">
            Posiciones de Grupos
          </h3>
          {standings.map((g: any, i: number) => {
            if (!g || !g.teams || !Array.isArray(g.teams)) return null;
            return <StandingsTable key={i} group={g} />;
          })}
        </section>
      )}
    </div>
  );
}