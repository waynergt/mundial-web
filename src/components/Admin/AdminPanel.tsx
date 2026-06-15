import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

export function AdminPanel({ matches, onRefresh, onClose }: any) {
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleUpdate = async (id: number) => {
    setUpdatingId(id);
    const scoreHome = (document.getElementById(`home-${id}`) as HTMLInputElement).value;
    const scoreAway = (document.getElementById(`away-${id}`) as HTMLInputElement).value;
    const status = (document.getElementById(`status-${id}`) as HTMLSelectElement).value;

    const { error } = await supabase
      .from('matches')
      .update({ score_home: parseInt(scoreHome), score_away: parseInt(scoreAway), status: status })
      .eq('id', id);

    if (!error) {
      setStatusMessage("✅ Guardado correctamente");
      setTimeout(() => setStatusMessage(""), 3000);
      onRefresh();
    } else {
      setStatusMessage("❌ Error al guardar");
    }
    setUpdatingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-6 overflow-y-auto animate-fade-in">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4 sticky top-0 bg-black/50 py-2">
          <div>
            <h2 className="text-2xl font-bold text-emerald-500">Panel Maestro</h2>
            <p className="text-xs text-zinc-400">Control de resultados en tiempo real</p>
          </div>
          <button onClick={onClose} className="bg-zinc-800 p-2 rounded-full text-zinc-400 hover:text-white">✕</button>
        </div>

        {statusMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 rounded-xl text-center text-sm font-bold animate-bounce">
            {statusMessage}
          </div>
        )}

        <div className="space-y-4">
          {matches.map((m: any) => (
            <div key={m.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-3xl space-y-4">
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                <span>Partid ID: {m.id}</span>
                <select id={`status-${m.id}`} defaultValue={m.status} className="bg-transparent border-none text-emerald-500 font-bold focus:ring-0 cursor-pointer">
                  <option value="SCHEDULED">Programado</option>
                  <option value="LIVE">En Vivo</option>
                  <option value="FINISHED">Finalizado</option>
                </select>
              </div>

              <div className="grid grid-cols-3 items-center gap-2">
                <div className="text-sm font-bold text-zinc-300 truncate">{m.home_team?.name}</div>
                <div className="flex gap-2 justify-center">
                   <input id={`home-${m.id}`} type="number" defaultValue={m.score_home} className="w-10 bg-zinc-950 border border-zinc-800 rounded-lg text-center font-bold text-emerald-500"/>
                   <input id={`away-${m.id}`} type="number" defaultValue={m.score_away} className="w-10 bg-zinc-950 border border-zinc-800 rounded-lg text-center font-bold text-emerald-500"/>
                </div>
                <div className="text-sm font-bold text-zinc-300 text-right truncate">{m.away_team?.name}</div>
              </div>

              <button 
                onClick={() => handleUpdate(m.id)}
                disabled={updatingId === m.id}
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
              >
                {updatingId === m.id ? "Sincronizando..." : "Actualizar Marcador"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}