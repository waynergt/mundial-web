import { useState } from 'react';

export const NewsCard = ({ news }: { news: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all duration-300">
      
      {/* IMAGEN CORREGIDA (image_url) */}
      <img 
        src={news.image_url} 
        alt={news.title} 
        className={`w-full object-cover transition-all duration-500 ease-in-out ${isExpanded ? 'h-56' : 'h-40'}`} 
      />
      
      <div 
        className="p-4 space-y-3 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/10">
            {news.category}
          </span>
          <span className="text-zinc-500">
            {new Date(news.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="font-bold text-zinc-100 text-lg leading-snug hover:text-emerald-400 transition-colors">
          {news.title}
        </h3>

        {/* LÓGICA DE EXPANSIÓN */}
        {!isExpanded ? (
          <div className="space-y-2">
            <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{news.summary}</p>
            <p className="text-[10px] text-emerald-500 font-semibold pt-1">Toca para leer más...</p>
          </div>
        ) : (
          <div className="space-y-4 pt-2 border-t border-zinc-800/50 mt-2 animate-fade-in">
            <p className="text-zinc-300 text-sm leading-relaxed">{news.content}</p>
            <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 text-xs font-semibold rounded-xl transition-all">
              Cerrar noticia
            </button>
          </div>
        )}
      </div>
    </div>
  );
};