import { useState, useEffect } from 'preact/hooks';
import { RiHistoryLine, RiCheckboxCircleLine } from '@remixicon/react';
import { ImageModal } from '../../../shared/ImageModal';
import { HistoryFilters } from './HistoryFilters';
import { AdminPurchaseCard } from '../../../shared/AdminPurchaseCard';

export const VerifiedHistory = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    // Estados para filtrado y ordenamiento
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, name-asc
    const [searchMode, setSearchMode] = useState('product'); // product, customer, date

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

    // Lógica de filtrado y ordenamiento
    const filteredHistory = history
        .filter(item => {
            if (!searchTerm) return true;

            if (searchMode === 'product') {
                return item.products.some(p =>
                    p.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (searchMode === 'customer') {
                return item.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchMode === 'date') {
                return item.date === searchTerm;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'date-desc') return b.timestamp - a.timestamp;
            if (sortBy === 'date-asc') return a.timestamp - b.timestamp;
            if (sortBy === 'name-asc') {
                const nameA = a.customer?.name?.toLowerCase() || '';
                const nameB = b.customer?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            }
            return 0;
        });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            <RiHistoryLine className="text-emerald-600 w-8 h-8" />
                            Historial de Pagos <span className="text-emerald-600">Verificados</span>
                        </h2>
                        <p className="text-slate-500 mt-2">Registro de pedidos que ya han sido procesados y confirmados.</p>
                    </div>

                    {/* Barra de Filtros Unificada y Simétrica */}
                    <HistoryFilters 
                        searchMode={searchMode}
                        setSearchMode={setSearchMode}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHistory.length === 0 ? (
                        <div className="col-span-full bg-white border border-slate-200 rounded-3xl p-20 text-center shadow-sm">
                            <RiHistoryLine className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 text-xl font-medium">No se encontraron registros que coincidan.</p>
                        </div>
                    ) : (
                        filteredHistory.map((item) => (
                            <AdminPurchaseCard
                                key={item.id}
                                purchase={item}
                                onDelete={handleDelete}
                                onImageClick={setSelectedImage}
                                statusBadge={
                                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                                        <RiCheckboxCircleLine className="w-4 h-4" />
                                        VERIFICADO
                                    </div>
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
                title="Detalle del Comprobante (Verificado)"
            />
        </div>
    );
};
