export const MatchesList = ({ matches }: { matches: any[] }) => (
  <div className="space-y-2">
    {matches.map(match => (
      <div key={match.id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-3 flex justify-between items-center shadow-md">
        <div className="w-4/12 text-xs font-semibold text-zinc-300">{match.home}</div>
        <div className="w-4/12 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 font-mono font-bold text-white bg-zinc-800/50 px-3 py-1 rounded-lg">
            {match.status === 'SCHEDULED' ? <span className="text-zinc-500 text-[10px]">VS</span> : <>{match.home_score}-{match.away_score}</>}
          </div>
          <span className="text-[9px] mt-1 text-zinc-500">{match.status === 'FINISHED' ? 'Finalizado' : match.time}</span>
        </div>
        <div className="w-4/12 text-right text-xs font-semibold text-zinc-300">{match.away}</div>
      </div>
    ))}
  </div>
);