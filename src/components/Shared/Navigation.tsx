import { Calendar, Radio, Newspaper } from 'lucide-react';

export const Navigation = ({ activeTab, setActiveTab }: any) => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-lg rounded-2xl p-2 flex justify-around items-center shadow-2xl z-40">
    {[
      { id: 'home', icon: Calendar, label: 'Calendario' },
      { id: 'live', icon: Radio, label: 'En Vivo' },
      { id: 'news', icon: Newspaper, label: 'Noticias' }
    ].map(item => (
      <button 
        key={item.id} 
        onClick={() => {
          if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(40); // Sutil vibración
          }
          setActiveTab(item.id);
        }} 
        className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl active:scale-90 transition-all duration-200 ${activeTab === item.id ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500'}`}
      >
        <item.icon className="w-5 h-5" />
        <span className="text-[10px] font-medium">{item.label}</span>
      </button>
    ))}
  </div>
);