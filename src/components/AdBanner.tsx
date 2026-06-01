import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificamos que el contenedor exista y esté vacío para no duplicar anuncios
    if (bannerRef.current && !bannerRef.current.firstChild) {
      // 1. Configuramos las opciones del anuncio (Tu llave real)
      const conf = document.createElement('script');
      conf.type = 'text/javascript';
      conf.innerHTML = `atOptions = {
        'key' : 'bfbaf7fe3ef758a203533e491cea34cc',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };`;

      // 2. Traemos el anuncio de Adsterra
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "https://www.highperformanceformat.com/bfbaf7fe3ef758a203533e491cea34cc/invoke.js";

      // 3. Los inyectamos en el contenedor
      bannerRef.current.append(conf);
      bannerRef.current.append(script);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 font-semibold">
        Publicidad
      </span>
      
      {/* Contenedor del anuncio: Mantiene el tamaño reservado para que la página no brinque */}
      <div 
        ref={bannerRef} 
        className="min-h-[250px] w-[300px] bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-center text-zinc-700 text-xs text-center overflow-hidden shadow-xl"
      >
      </div>
    </div>
  );
}