export const StandingsTable = ({ group }: { group: any }) => (
  <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 shadow-xl space-y-3">
    <h3 className="text-sm font-bold text-emerald-400 border-b border-zinc-800 pb-2">{group.groupName}</h3>
    <table className="w-full text-xs text-left text-zinc-400">
      <thead className="text-[10px] uppercase text-zinc-600 font-bold border-b border-zinc-800/50">
        <tr><th className="py-2 w-8 text-center">Pos</th><th className="py-2">Equipo</th><th className="py-2 text-center w-8">PJ</th><th className="py-2 text-center w-8 text-white">Pts</th></tr>
      </thead>
      <tbody className="divide-y divide-zinc-800/30">
        {group.teams.map((t: any, i: number) => (
          <tr key={i}>
            <td className="py-2.5 text-center font-bold text-zinc-500">{t.rank}</td>
            <td className="py-2.5 font-semibold text-zinc-200">{t.name}</td>
            <td className="py-2.5 text-center">{t.pj}</td>
            <td className="py-2.5 text-center font-bold text-white">{t.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);