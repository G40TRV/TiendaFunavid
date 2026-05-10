import { useState } from 'preact/hooks'
import { RiArrowLeftLine, RiSecurePaymentLine } from '@remixicon/react'

//Checkout: esta pagina muestra el resumen de los productos aÃ±adidos al carrito.
export const Checkout = ({ allProducts, total, onProceedToPayment, onBack }) => {
    const [customerData, setCustomerData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({ ...prev, [name]: value }));
    };

    const handleProceed = () => {
        if (!customerData.name || !customerData.address || !customerData.phone || !customerData.email) {
            alert("Por favor completa todos los datos de envío.");
            return;
        }
        onProceedToPayment(customerData);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-cyan-600 font-medium hover:text-cyan-700 mb-8 transition-colors"
                >
                    <RiArrowLeftLine className="w-5 h-5" />
                    Volver a la tienda
                </button>
                {/* Resumen de productos */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-8">Resumen de tu pedido</h2>

                    <div className="space-y-4 mb-8">
                        {allProducts.map(product => (
                            <div key={product.id} className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden">
                                        <img src={product.img} alt={product.nameProduct} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{product.nameProduct}</h4>
                                        <p className="text-slate-500 text-sm">Cantidad: {product.quantity}</p>
                                    </div>
                                </div>
                                <div className="font-black text-slate-900">
                                    ${(product.price * product.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-200 pt-6 mb-8">
                        <div>
                            <p className="text-slate-500 font-medium mb-1">Total a pagar</p>
                            <p className="text-sm text-slate-400">Incluye impuestos aplicables</p>
                        </div>
                        <p className="text-4xl font-black text-cyan-600 tracking-tight">${total.toLocaleString()}</p>
                    </div>

                    <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 mb-8">
                        <h3 className="font-bold text-cyan-900 mb-4">Datos de envÃ­o</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                name="name"
                                value={customerData.name}
                                onChange={handleChange}
                                placeholder="Nombre completo" 
                                className="w-full px-4 py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 bg-white" 
                            />
                            <input 
                                type="email" 
                                name="email"
                                value={customerData.email}
                                onChange={handleChange}
                                placeholder="Correo electrÃ³nico" 
                                className="w-full px-4 py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 bg-white" 
                            />
                            <input 
                                type="text" 
                                name="phone"
                                value={customerData.phone}
                                onChange={handleChange}
                                placeholder="TelÃ©fono" 
                                className="w-full px-4 py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 bg-white" 
                            />
                            <input 
                                type="text" 
                                name="address"
                                value={customerData.address}
                                onChange={handleChange}
                                placeholder="DirecciÃ³n de entrega" 
                                className="w-full px-4 py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 bg-white" 
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleProceed}
                        className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                    >
                        <RiSecurePaymentLine className="w-6 h-6" />
                        Ir al pago seguro
                    </button>
                </div>
            </div>
        </div>
    )
}
