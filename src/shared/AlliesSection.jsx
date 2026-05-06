import { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export const AlliesSection = () => {
    // Importar todas las imágenes de aliados dinámicamente
    const logos = import.meta.glob("./aliados/*.{png,jpg,jpeg,svg}", { eager: true });
    const logoList = Object.values(logos).map((m) => m.default);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            // Calculamos cuánto desplazar basándonos en el ancho de una tarjeta + el gap
            const firstItem = current.querySelector('.snap-start');
            const itemWidth = firstItem ? firstItem.offsetWidth : 300;
            const gap = 40; // Estimación del gap entre elementos
            
            // Desplazamos 2 elementos a la vez para un movimiento más ágil
            const scrollAmount = (itemWidth + gap) * 2;
            
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-16 mt-24 animate-in fade-in duration-700 delay-300">
            <div className="border-b border-slate-200 mb-10">
                <h3 className="text-3xl font-black text-slate-800 inline-block border-b-4 border-cyan-600 pb-3 px-2 -mb-[2px]">
                    Nuestros aliados
                </h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
                <button 
                    onClick={() => scroll('left')}
                    className="p-3 text-cyan-600 hover:bg-cyan-50 rounded-full transition-all hover:scale-110 active:scale-95 hidden sm:block z-10"
                    aria-label="Anterior"
                >
                    <RiArrowLeftSLine className="w-12 h-12" />
                </button>

                <div 
                    ref={scrollRef}
                    className="flex-1 flex items-center gap-6 sm:gap-10 lg:gap-16 overflow-x-auto scroll-smooth no-scrollbar py-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Estilo inline para ocultar scrollbar en Webkit */}
                    <style>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    
                    {logoList.map((logo, index) => (
                        <div 
                            key={index} 
                            className="w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-52 bg-white rounded-2xl shadow-md border border-slate-100 flex-shrink-0 flex items-center justify-center p-4 sm:p-6 hover:shadow-xl hover:border-cyan-100 transition-all cursor-pointer group snap-start"
                        >
                            <img
                                src={logo}
                                alt={`Aliado ${index + 1}`}
                                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => scroll('right')}
                    className="p-3 text-cyan-600 hover:bg-cyan-50 rounded-full transition-all hover:scale-110 active:scale-95 hidden sm:block z-10"
                    aria-label="Siguiente"
                >
                    <RiArrowRightSLine className="w-12 h-12" />
                </button>
            </div>
        </div>
    );
};
