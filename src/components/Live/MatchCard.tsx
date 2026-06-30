export function MatchCard({ match, isLiveForced }: { match: any; isLiveForced: boolean }) {
  const diffMins = (new Date().getTime() - new Date(match.match_date).getTime()) / 60000;
  const isFinished = match.status === 'FINISHED' || diffMins > 180;
  const isNowPlaying = (isLiveForced || match.status === 'LIVE') && !isFinished;
  const isScheduled = !isNowPlaying && !isFinished;

  const formatTime = (dateString: string) => {
    if (!dateString) return '--:--';
    try {
      return new Intl.DateTimeFormat(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(dateString));
    } catch (e) {
      return '--:--';
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-3 shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex flex-col gap-2">
          
          {/* Equipo Local */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-200">{match.home_team?.name}</span>
            <div className="flex items-center gap-2">
              {/* MUESTRA PENALES SI EXISTEN */}
              {match.penalty_home !== null && match.penalty_home !== undefined && (
                <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  ({match.penalty_home})
                </span>
              )}
              <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg font-mono ${isScheduled ? 'text-zinc-600 bg-transparent' : 'bg-zinc-800 text-white'}`}>
                {isScheduled ? '-' : (match.score_home ?? 0)}
              </span>
            </div>
          </div>
          
          {/* Equipo Visitante */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-200">{match.away_team?.name}</span>
            <div className="flex items-center gap-2">
              {/* MUESTRA PENALES SI EXISTEN */}
              {match.penalty_away !== null && match.penalty_away !== undefined && (
                <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  ({match.penalty_away})
                </span>
              )}
              <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg font-mono ${isScheduled ? 'text-zinc-600 bg-transparent' : 'bg-zinc-800 text-white'}`}>
                {isScheduled ? '-' : (match.score_away ?? 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Etiqueta de Estado */}
        <div className="border-l border-zinc-800/80 pl-4 ml-4 flex flex-col items-center justify-center min-w-[65px]">
          {isNowPlaying && <span className="text-[9px] bg-red-950 text-red-400 border border-red-900/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">En Vivo</span>}
          {isFinished && <span className="text-[9px] bg-zinc-800 text-zinc-400 border border-zinc-700/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Final</span>}
          {isScheduled && <span className="text-[11px] text-zinc-400 font-mono font-semibold tracking-wide">{formatTime(match.match_date)}</span>}
        </div>
      </div>

      {/* Cartel automático si el partido está en juego */}
      {isNowPlaying && (
        <div className="bg-amber-950/20 border border-amber-900/30 p-2.5 rounded-xl mt-1 text-center animate-fade-in">
          <p className="text-[11px] text-amber-400/90 font-medium">
            ⚽ ¡Este partido se está jugando en este momento!
          </p>
          <p className="text-[10px] text-zinc-400 mt-0.5">
            El marcador oficial se actualizará en el medio tiempo y al finalizar el encuentro.
          </p>
        </div>
      )}
    </div>
  );
}