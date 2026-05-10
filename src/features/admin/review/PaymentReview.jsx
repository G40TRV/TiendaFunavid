import { useState, useEffect } from 'preact/hooks';
import { RiFileList3Line, RiCheckboxCircleLine } from '@remixicon/react';
import { ImageModal } from '../../../shared/ImageModal';
import { AdminPurchaseCard } from '../../../shared/AdminPurchaseCard';

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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <RiFileList3Line className="text-blue-600 w-8 h-8" />
                        Verificación de <span className="text-blue-600">Pagos</span>
                    </h2>
                    <p className="text-slate-500 mt-2">Revisa los comprobantes de transferencia enviados por los clientes.</p>
                    <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-widest">
                        <span className="text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Pendientes: {purchases.length}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.length === 0 ? (
                        <div className="col-span-full bg-white border border-slate-200 rounded-3xl p-20 text-center shadow-sm">
                            <RiFileList3Line className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 text-xl font-medium">No hay registros de compras aún.</p>
                        </div>
                    ) : (
                        purchases.map((purchase) => (
                            <AdminPurchaseCard
                                key={purchase.id}
                                purchase={purchase}
                                onDelete={handleDelete}
                                onImageClick={setSelectedImage}
                                actionButton={
                                    <button
                                        onClick={() => handleVerify(purchase)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                                    >
                                        <RiCheckboxCircleLine className="w-5 h-5" />
                                        Verificar Pago
                                    </button>
                                }
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Modal para ver imagen completa */}
            <ImageModal 
                isOpen={!!selectedImage} 
                onClose={() => setSelectedImage(null)} 
                imageUrl={selectedImage} 
            />
        </div>
    );
};
