import { useState, useEffect } from 'preact/hooks';
import { RiHistoryLine, RiImageLine, RiCalendarLine, RiMoneyDollarCircleLine, RiEyeLine, RiCloseLine, RiDeleteBin7Line, RiCheckboxCircleLine } from '@remixicon/react';

export const VerifiedHistory = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("http://localhost:3001/verified_history");
                const data = await response.json();
                setHistory(data.sort((a, b) => b.timestamp - a.timestamp));
            } catch (error) {
                console.error("Error cargando historial:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este registro del historial? Esto no afectará las estadísticas ni la base de datos principal.")) {
            try {
                await fetch(`http://localhost:3001/verified_history/${id}`, {
                    method: "DELETE"
                });
                setHistory(history.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error eliminando del historial:", error);
                alert("Error al eliminar el registro.");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <RiHistoryLine className="text-emerald-500 w-8 h-8" />
                        Historial de Pagos <span className="text-emerald-500">Verificados</span>
                    </h2>
                    <p className="text-slate-400 mt-2">Registro de pedidos que ya han sido procesados y confirmados.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.length === 0 ? (
                        <div className="col-span-full bg-slate-900/50 border border-slate-800 rounded-3xl p-20 text-center">
                            <RiHistoryLine className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 text-xl font-medium">No hay historial de pagos verificados aún.</p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <div key={item.id} className="bg-slate-900 border border-emerald-900/30 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/30 transition-colors group">
                                {/* Header */}
                                <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="bg-emerald-600/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max">
                                                ID: #{item.id?.toString().slice(-6) || 'N/A'}
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-1 font-mono">
                                                {item.id}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                                                <RiCalendarLine className="w-4 h-4" />
                                                {item.date}
                                            </div>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Eliminar del Historial"
                                            >
                                                <RiDeleteBin7Line className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <RiMoneyDollarCircleLine className="w-5 h-5 text-emerald-500" />
                                            <span className="text-2xl font-black text-white">${item.total.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                                            <RiCheckboxCircleLine className="w-4 h-4" />
                                            VERIFICADO
                                        </div>
                                    </div>
                                </div>

                                {/* Productos */}
                                <div className="p-5 space-y-3 max-h-40 overflow-y-auto no-scrollbar">
                                    <p className="text-xs font-bold text-slate-500 uppercase">Productos entregados:</p>
                                    {item.products.map((p, i) => (
                                        <div key={i} className="flex justify-between text-sm text-slate-300">
                                            <span className="truncate pr-4">{p.quantity}x {p.nameProduct}</span>
                                            <span className="font-mono text-slate-500">${(p.price * p.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Datos de Entrega */}
                                {item.customer && (
                                    <div className="p-5 pt-0 border-t border-slate-800/50">
                                        <p className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Datos de Entrega:</p>
                                        <div className="space-y-1 text-sm">
                                            <p className="text-slate-300"><span className="text-slate-500">Nombre:</span> {item.customer.name}</p>
                                            <p className="text-slate-300"><span className="text-slate-500">Dirección:</span> {item.customer.address}</p>
                                            <p className="text-slate-300"><span className="text-slate-500">Teléfono:</span> {item.customer.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Comprobante */}
                                <div className="p-5 bg-emerald-950/10 border-t border-slate-800">
                                    {item.paymentProof ? (
                                        <div 
                                            className="relative rounded-xl overflow-hidden h-32 cursor-pointer group/img"
                                            onClick={() => setSelectedImage(item.paymentProof)}
                                        >
                                            <img src={item.paymentProof} alt="Comprobante" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                <RiEyeLine className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                                <RiImageLine className="w-3 h-3" />
                                                VER COMPROBANTE
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-32 bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 italic text-sm text-center p-4">
                                            Sin comprobante adjunto
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal para ver imagen completa */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedImage(null)}></div>
                    <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center p-4 border-b border-slate-800">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <RiImageLine className="text-emerald-500" />
                                Detalle del Comprobante (Verificado)
                            </h3>
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="text-slate-400 hover:text-white p-2"
                            >
                                <RiCloseLine className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-2 overflow-auto max-h-[80vh] flex justify-center">
                            <img src={selectedImage} alt="Comprobante Completo" className="max-w-full h-auto rounded-xl" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
