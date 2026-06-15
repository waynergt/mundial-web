export function MatchesList({ matches }: { matches: any[] }) {
  // Salvavidas para la hora
  const formatTime = (dateString: string) => {
    if (!dateString) return 'TBD'; // Si no hay fecha, muestra "TBD" (Por definir)
    try {
      return new Intl.DateTimeFormat(navigator.language, {
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true
      }).format(new Date(dateString));
    } catch (e) {
      return '--:--';
    }
  };

  // Salvavidas para la fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha por definir';
    try {
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'short', 
        day: 'numeric', 
        month: 'short'
      }).format(new Date(dateString));
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  if (!matches || matches.length === 0) return null;

  return (
    <div className="space-y-3">
      {matches.map(match => (
        <div key={match.id} className="bg-zinc-900/20 border border-zinc-800/40 p-3.5 rounded-2xl flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-300">
              {match.home_team?.name || 'Equipo 1'} <span className="text-zinc-600 px-1">vs</span> {match.away_team?.name || 'Equipo 2'}
            </div>
            <div className="text-[10px] text-zinc-500 truncate max-w-[200px] capitalize">
              {formatDate(match.match_date)} • {match.stadium || 'Estadio por definir'}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-xl text-emerald-400 font-mono">
              {formatTime(match.match_date)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}