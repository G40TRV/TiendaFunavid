import React, { useState } from 'react';
import { RiAddLine, RiImageAddLine, RiPriceTag3Line, RiFileTextLine } from '@remixicon/react';

export const AddProduct = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const form = e.target;
        const formData = new FormData(form);
        const newProduct = {
            id: Date.now().toString(), // Generamos un ID simple
            nameProduct: formData.get("nameProduct"),
            description: formData.get("description"),
            price: Number(formData.get("price")),
            quantity: Number(formData.get("quantity")),
            img: formData.get("img")
        };

        try {
            const response = await fetch("http://localhost:3001/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                setSuccessMsg("Â¡Producto agregado exitosamente!");
                form.reset(); // Limpiar formulario
                setTimeout(() => setSuccessMsg(""), 3000);
            } else {
                console.error("Error al guardar el producto");
            }
        } catch (error) {
            console.error("Error de conexiÃ³n:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    // renderizado del formulario
    return (
        <main className='min-h-screen pt-28 bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 p-6 sm:p-10 font-sans text-slate-100'>
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 drop-shadow-sm">
                        Agregar Nuevo Producto
                    </h1>
                    <p className="text-slate-400 font-medium">AÃ±ade nuevos artÃ­culos al catÃ¡logo de la tienda.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                    {successMsg && (
                        <div className="mb-6 bg-sky-500/10 border border-sky-500/20 text-sky-400 p-4 rounded-xl text-sm font-bold flex items-center justify-center">
                            {successMsg}
                        </div>
                    )}

                    {/* formulario para agregar producto */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/*Input del nombre del producto */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Nombre del Producto</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <RiFileTextLine className="h-5 w-5 text-slate-500" />
                                </div>
                                <input type="text" name="nameProduct" required className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors" placeholder="Ej: Tensiómetro de brazo" />
                            </div>
                        </div>

                        {/*Input de descripción del producto */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Descripción</label>
                            <textarea name="description" rows="3" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none" placeholder="Breve descripción del producto..."></textarea>
                        </div>
                        {/*Input del precio del producto*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                {/*Input del precio del producto */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <RiPriceTag3Line className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input type="number" name="price" required min="0" className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors" placeholder="0.00" />
                                </div>
                            </div>

                            {/*Input de la cantidad del producto*/}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Cantidad Inicial</label>
                                <input type="number" name="quantity" required min="1" defaultValue="1" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors" />
                            </div>
                        </div>
                        {/* url de la imagen*/}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">URL de la Imagen</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <RiImageAddLine className="h-5 w-5 text-slate-500" />
                                </div>
                                <input type="url" name="img" required className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors" placeholder="https://ejemplo.com/imagen.jpg" />
                            </div>
                        </div>

                        <div className="pt-4">
                            {/* boton de guardar producto*/}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 text-lg ${isSubmitting ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'}`}
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Guardando producto...</span>
                                ) : (
                                    <>
                                        <RiAddLine className="w-6 h-6" />
                                        Agregar Producto al CatÃ¡logo
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
