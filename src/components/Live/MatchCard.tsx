export const MatchCard = ({ match }: { match: any }) => {
  return (
    <div className="bg-zinc-900/60 border border-emerald-500/30 rounded-2xl p-4 shadow-lg shadow-emerald-500/10 relative overflow-hidden">
      
      {/* Indicador EN VIVO Animado */}
      <div className="flex justify-center mb-4">
        <span className="bg-red-500/20 border border-red-500/50 text-red-500 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          EN VIVO • {match.minute}
        </span>
      </div>

      {/* Equipos y Marcador */}
      <div className="flex justify-between items-center">
        {/* Equipo Local */}
        <div className="text-center w-1/3">
          <h3 className="font-bold text-lg text-white truncate">{match.team_home}</h3>
        </div>
        
        {/* Resultado en el centro */}
        <div className="flex items-center justify-center gap-4 w-1/3 bg-zinc-950/50 py-2 rounded-xl border border-zinc-800">
          <span className="text-3xl font-black text-emerald-400">{match.score_home}</span>
          <span className="text-zinc-600 font-bold text-sm">VS</span>
          <span className="text-3xl font-black text-emerald-400">{match.score_away}</span>
        </div>

        {/* Equipo Visitante */}
        <div className="text-center w-1/3">
          <h3 className="font-bold text-lg text-white truncate">{match.team_away}</h3>
        </div>
      </div>
      
    </div>
  );
};