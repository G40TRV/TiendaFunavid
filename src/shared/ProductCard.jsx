import { useState } from 'preact/hooks';
import { RiShoppingCart2Line, RiCheckLine, RiAddLine, RiSubtractLine } from '@remixicon/react';

export const ProductCard = ({ product, index, isAdded, onAddProduct }) => {
    const [localQuantity, setLocalQuantity] = useState(1);

    const handleAdd = () => {
        onAddProduct(product, localQuantity);
        setLocalQuantity(1); // Reset after adding
    };

    return (
        <div
            className="group bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 animate-in fade-in zoom-in-95"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                    src={product.img}
                    alt={product.nameProduct}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                    Destacado
                </span>
            </div>

            <div className="p-6 flex flex-col gap-4">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-cyan-600 transition-colors line-clamp-1">
                            {product.nameProduct}
                        </h3>
                    </div>
                    {product.description && (
                        <p className="text-sm text-slate-500 line-clamp-2 mt-1 mb-3">
                            {product.description}
                        </p>
                    )}
                    <p className="text-2xl font-black text-slate-900">${product.price.toLocaleString()}</p>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-1">
                    <button 
                        onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <RiSubtractLine className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-slate-900 w-8 text-center">{localQuantity}</span>
                    <button 
                        onClick={() => setLocalQuantity(localQuantity + 1)}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <RiAddLine className="w-5 h-5" />
                    </button>
                </div>

                <button
                    onClick={handleAdd}
                    className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 ${isAdded ? 'bg-sky-500 text-white shadow-sky-500/30 shadow-lg' : 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-cyan-600 hover:shadow-cyan-600/30 hover:-translate-y-0.5'}`}
                >
                    {isAdded ? (
                        <>
                            <RiCheckLine className="w-5 h-5" />
                            ¡Añadido!
                        </>
                    ) : (
                        <>
                            <RiShoppingCart2Line className="w-5 h-5" />
                            Añadir al carrito
                        </>
                    )}
                </button>
            </div>
        </div>
    )
};
