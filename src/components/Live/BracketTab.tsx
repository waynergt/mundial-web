import { MatchCard } from './MatchCard';

export function BracketTab({ matches }: { matches: any[] }) {
  // Filtramos los partidos por fase
  const eliminatoria32 = matches.filter(m => m.stage === 'Eliminatoria de 32');
  const octavos = matches.filter(m => m.stage === 'Octavos de Final');
  const cuartos = matches.filter(m => m.stage === 'Cuartos de Final');
  const semis = matches.filter(m => m.stage === 'Semifinal');
  const final = matches.filter(m => m.stage === 'Final');

  // Sub-componente que construye cada bloque del mapa
  const BracketSection = ({ title, data, placeholderCount }: { title: string, data: any[], placeholderCount: number }) => {
    // Calculamos cuántos partidos faltan por definir en esta fase
    const remainingCount = Math.max(0, placeholderCount - data.length);

    return (
      <div className="relative mb-12">
        {/* Línea decorativa vertical estilo "árbol de llaves" */}
        <div className="absolute left-4 top-10 bottom-4 w-0.5 bg-zinc-800/80"></div>
        
        {/* Título de la Fase */}
        <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-lg shadow-sm">
            🏆
          </span>
          {title}
        </h3>
        
        <div className="space-y-6 pl-10">
          {/* 1. Renderizamos los partidos que YA ESTÁN definidos en la base de datos */}
          {data.map(m => {
            // Formateamos la fecha para que se vea elegante arriba del partido
            const dateFormatted = new Intl.DateTimeFormat('es-ES', { 
              weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: true 
            }).format(new Date(m.match_date));

            return (
              <div key={m.id} className="relative">
                {/* Conector horizontal */}
                <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-zinc-800/80"></div>
                
                {/* Fecha del partido */}
                <div className="text-[10px] text-emerald-500/70 font-mono mb-1.5 ml-2 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full"></span>
                  {dateFormatted}
                </div>
                
                <MatchCard match={m} isLiveForced={false} />
              </div>
            );
          })}

          {/* 2. Renderizamos las cajas vacías (Placeholders) para los que faltan */}
          {Array.from({ length: remainingCount }).map((_, i) => (
            <div key={`placeholder-${title}-${i}`} className="relative opacity-60">
              {/* Conector horizontal */}
              <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-zinc-800/80"></div>
              
              {/* Caja de Llave por definir */}
              <div className="bg-zinc-900/20 border-2 border-zinc-800/50 border-dashed p-4 rounded-2xl flex flex-col justify-center items-center h-[90px] transition-all hover:bg-zinc-900/40">
                <span className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-2">
                  <span>⚽</span> Llave por definir
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 animate-fade-in pb-12">
      <div className="border-b border-zinc-800 pb-2 mb-6">
        <h2 className="text-xl font-bold tracking-tight">Camino a la Final</h2>
        <p className="text-xs text-zinc-400">Sigue el cuadro de eliminación directa</p>
      </div>

      {/* Renderizamos cada fase indicándole su número total de partidos */}
      <BracketSection title="Eliminatoria de 32" data={eliminatoria32} placeholderCount={16} />
      <BracketSection title="Octavos de Final" data={octavos} placeholderCount={8} />
      <BracketSection title="Cuartos de Final" data={cuartos} placeholderCount={4} />
      <BracketSection title="Semifinales" data={semis} placeholderCount={2} />
      <BracketSection title="Gran Final" data={final} placeholderCount={1} />
    </div>
  );
}