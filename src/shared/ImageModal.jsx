import { RiCloseLine, RiImageLine } from '@remixicon/react';

/**
 * ImageModal Component
 * Un modal compartido para visualizar imÃ¡genes en tamaÃ±o completo con zoom y desenfoque de fondo.
 * 
 * @param {boolean} isOpen - Controla si el modal estÃ¡ visible.
 * @param {function} onClose - FunciÃ³n para cerrar el modal.
 * @param {string} imageUrl - La URL o Base64 de la imagen a mostrar.
 * @param {string} title - TÃ­tulo opcional para el modal.
 */
export const ImageModal = ({ isOpen, onClose, imageUrl, title = "Detalle del Comprobante" }) => {
    if (!isOpen || !imageUrl) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
            {/* Overlay con desenfoque */}
            <div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" 
                onClick={onClose}
            ></div>

            {/* Contenido del Modal */}
            <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* Cabecera */}
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white">
                    <h3 className="text-slate-900 font-bold flex items-center gap-2">
                        <RiImageLine className="text-blue-600" />
                        {title}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-2 transition-colors rounded-full hover:bg-slate-100"
                    >
                        <RiCloseLine className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenedor de la Imagen */}
                <div className="p-2 overflow-auto max-h-[80vh] flex justify-center bg-slate-50/30 no-scrollbar">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="max-w-full h-auto rounded-xl shadow-lg animate-in zoom-in-110 duration-500" 
                    />
                </div>
            </div>
        </div>
    );
};
