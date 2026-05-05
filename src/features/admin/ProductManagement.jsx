import React from 'react';
import { RiEditLine, RiDeleteBin6Line, RiSave3Line, RiCloseLine, RiPriceTag3Line, RiStackLine } from '@remixicon/react';
import { useProductManagement } from './useProductManagement';

export const ProductManagement = () => {
    const {
        products,
        isLoading,
        editingId,
        editFormData,
        notification,
        handleDelete,
        handleEditClick,
        handleEditChange,
        handleSaveEdit,
        cancelEdit
    } = useProductManagement();

    return (
        <main className='min-h-screen pt-28 bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 p-6 sm:p-10 font-sans text-slate-100'>
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 drop-shadow-sm">
                        GestiÃ³n de Productos
                    </h1>
                    <p className="text-slate-400 font-medium">Modifica o elimina artÃ­culos del inventario actual.</p>
                </div>

                {notification.message && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center justify-center animate-in fade-in zoom-in-95 duration-300 ${notification.type === "success" ? "bg-sky-500/10 border border-sky-500/20 text-sky-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`}>
                        {notification.message}
                    </div>
                )}

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50 border-b border-slate-700">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-slate-500 font-medium">Cargando inventario...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center text-slate-500 font-medium">
                                            No hay productos registrados en el sistema.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="group hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                {editingId === product.id ? (
                                                    <div className="flex flex-col gap-2">
                                                        <input 
                                                            type="text" 
                                                            name="nameProduct" 
                                                            value={editFormData.nameProduct} 
                                                            onChange={handleEditChange}
                                                            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                        />
                                                        <input 
                                                            type="text" 
                                                            name="img" 
                                                            value={editFormData.img} 
                                                            onChange={handleEditChange}
                                                            placeholder="URL de Imagen"
                                                            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0">
                                                            <img src={product.img} alt={product.nameProduct} className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="font-bold text-slate-200">{product.nameProduct}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === product.id ? (
                                                    <div className="relative">
                                                        <RiPriceTag3Line className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                        <input 
                                                            type="number" 
                                                            name="price" 
                                                            value={editFormData.price} 
                                                            onChange={handleEditChange}
                                                            className="bg-slate-800 border border-slate-600 rounded-lg pl-8 pr-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                        />
                                                    </div>
                                                ) : (
                                                    <span className="font-semibold text-blue-400">${product.price.toLocaleString()}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === product.id ? (
                                                    <div className="relative">
                                                        <RiStackLine className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                        <input 
                                                            type="number" 
                                                            name="quantity" 
                                                            value={editFormData.quantity} 
                                                            onChange={handleEditChange}
                                                            className="bg-slate-800 border border-slate-600 rounded-lg pl-8 pr-3 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                        />
                                                    </div>
                                                ) : (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.quantity > 0 ? 'bg-sky-500/10 text-sky-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                        {product.quantity} uds
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {editingId === product.id ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={handleSaveEdit}
                                                            className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-white transition-colors"
                                                            title="Guardar"
                                                        >
                                                            <RiSave3Line className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={cancelEdit}
                                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors"
                                                            title="Cancelar"
                                                        >
                                                            <RiCloseLine className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleEditClick(product)}
                                                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                                            title="Editar"
                                                        >
                                                            <RiEditLine className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                                                            title="Eliminar"
                                                        >
                                                            <RiDeleteBin6Line className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};
