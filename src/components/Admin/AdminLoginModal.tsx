import { useState } from 'react';

interface AdminLoginModalProps {
  onLogin: () => void;
  onClose: () => void;
}

export function AdminLoginModal({ onLogin, onClose }: AdminLoginModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TU CONTRASEÑA AQUÍ
    if (password === "admin2026") {
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl w-full max-w-xs shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="text-lg font-bold text-white">Acceso Restringido</h3>
          <p className="text-xs text-zinc-400 mt-1">Panel de control de resultados</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full bg-zinc-950 border ${error ? 'border-red-500' : 'border-zinc-800'} rounded-xl p-3 text-center text-white focus:outline-none focus:border-emerald-500 transition-colors`}
              autoFocus
            />
            {error && <p className="text-[10px] text-red-500 text-center mt-2 animate-bounce">Contraseña incorrecta</p>}
          </div>
          
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}