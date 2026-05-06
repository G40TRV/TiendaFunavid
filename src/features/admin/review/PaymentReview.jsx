import { useState, useEffect } from 'preact/hooks';
import { RiFileList3Line, RiImageLine, RiCalendarLine, RiMoneyDollarCircleLine, RiUserLine, RiEyeLine, RiCloseLine, RiDeleteBin7Line, RiCheckboxCircleLine } from '@remixicon/react';

export const PaymentReview = () => {
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await fetch("http://localhost:3001/purchases");
                const data = await response.json();
                // Mostrar solo los pendientes (o sin estado definido aún)
                const pending = data.filter(p => !p.status || p.status === 'pending');
                setPurchases(pending.sort((a, b) => b.timestamp - a.timestamp));
            } catch (error) {
                console.error("Error cargando compras:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este registro de pago? Esta acción no se puede deshacer.")) {
            try {
                await fetch(`http://localhost:3001/purchases/${id}`, {
                    method: "DELETE"
                });
                setPurchases(purchases.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error eliminando compra:", error);
                alert("Hubo un error al intentar eliminar el registro.");
            }
        }
    };

    const handleVerify = async (purchase) => {
        try {
            // 1. Actualizar estado en la colección principal
            await fetch(`http://localhost:3001/purchases/${purchase.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: 'verified' })
            });

            // 2. Guardar una copia en el historial (opcional según el diseño, pero útil para el historial separado)
            await fetch(`http://localhost:3001/verified_history`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...purchase, status: 'verified', verifiedAt: new Date().toISOString() })
            });

            // 3. Remover de la vista actual
            setPurchases(purchases.filter(p => p.id !== purchase.id));
            alert("Pago verificado y movido al historial con éxito.");
        } catch (error) {
            console.error("Error verificando pago:", error);
            alert("Error al verificar el pago.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <RiFileList3Line className="text-blue-500 w-8 h-8" />
                        Verificación de <span className="text-blue-500">Pagos</span>
                    </h2>
                    <p className="text-slate-400 mt-2">Revisa los comprobantes de transferencia enviados por los clientes.</p>
                    <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-widest">
                        <span className="text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Pendientes: {purchases.length}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.length === 0 ? (
                        <div className="col-span-full bg-slate-900/50 border border-slate-800 rounded-3xl p-20 text-center">
                            <RiFileList3Line className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 text-xl font-medium">No hay registros de compras aún.</p>
                        </div>
                    ) : (
                        purchases.map((purchase) => (
                            <div key={purchase.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-colors group">
                                {/* Header de la compra */}
                                <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max">
                                                ID: #{purchase.id?.toString().slice(-6) || 'N/A'}
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-1 font-mono">
                                                {purchase.id}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                                                <RiCalendarLine className="w-4 h-4" />
                                                {purchase.date}
                                            </div>
                                            <button 
                                                onClick={() => handleDelete(purchase.id)}
                                                className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Eliminar Registro"
                                            >
                                                <RiDeleteBin7Line className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <RiMoneyDollarCircleLine className="w-5 h-5 text-emerald-500" />
                                            <span className="text-2xl font-black text-white">${purchase.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Cuerpo - Productos */}
                                <div className="p-5 space-y-3 max-h-40 overflow-y-auto no-scrollbar">
                                    <p className="text-xs font-bold text-slate-500 uppercase">Productos:</p>
                                    {purchase.products.map((p, i) => (
                                        <div key={i} className="flex justify-between text-sm text-slate-300">
                                            <span className="truncate pr-4">{p.quantity}x {p.nameProduct}</span>
                                            <span className="font-mono text-slate-500">${(p.price * p.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Datos de Entrega */}
                                {purchase.customer && (
                                    <div className="p-5 pt-0 border-t border-slate-800/50">
                                        <p className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Datos de Entrega:</p>
                                        <div className="space-y-1 text-sm">
                                            <p className="text-slate-300"><span className="text-slate-500">Nombre:</span> {purchase.customer.name}</p>
                                            <p className="text-slate-300"><span className="text-slate-500">Dirección:</span> {purchase.customer.address}</p>
                                            <p className="text-slate-300"><span className="text-slate-500">Teléfono:</span> {purchase.customer.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Footer - Comprobante */}
                                <div className="p-5 bg-slate-800/30">
                                    {purchase.paymentProof ? (
                                        <div 
                                            className="relative rounded-xl overflow-hidden h-32 cursor-pointer group/img"
                                            onClick={() => setSelectedImage(purchase.paymentProof)}
                                        >
                                            <img src={purchase.paymentProof} alt="Comprobante" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                <RiEyeLine className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                                <RiImageLine className="w-3 h-3" />
                                                VER COMPROBANTE
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-32 bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 italic text-sm text-center p-4">
                                            No se adjuntó comprobante (Compra antigua)
                                        </div>
                                    )}
                                </div>

                                {/* Botón de Verificar */}
                                <div className="p-5 pt-0">
                                    <button 
                                        onClick={() => handleVerify(purchase)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                                    >
                                        <RiCheckboxCircleLine className="w-5 h-5" />
                                        Verificar Pago
                                    </button>
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
                                <RiImageLine className="text-blue-500" />
                                Detalle del Comprobante
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
