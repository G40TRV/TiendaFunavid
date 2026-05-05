import { useState } from 'preact/hooks'
import { RiArrowLeftLine, RiShieldCheckFill, RiMastercardFill, RiVisaLine } from '@remixicon/react'

export const PaymentGateway = ({ total, onBack, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simular tiempo de procesamiento
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess();
        }, 2000);
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-cyan-600 font-medium hover:text-cyan-700 mb-8 transition-colors"
                >
                    <RiArrowLeftLine className="w-5 h-5" />
                    Volver al resumen
                </button>

                <div className="bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-8 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-sky-500"></div>
                    
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Pago Seguro</h2>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                                <RiShieldCheckFill className="w-4 h-4 text-sky-500" />
                                TransacciÃ³n encriptada
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500">Total a pagar</p>
                            <p className="text-2xl font-black text-cyan-600">${total.toLocaleString()}</p>
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">NÃºmero de tarjeta</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000" 
                                        required
                                        className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-slate-50 font-mono" 
                                    />
                                    <div className="absolute inset-y-0 right-4 flex items-center gap-2">
                                        <RiMastercardFill className="w-6 h-6 text-slate-400" />
                                        <RiVisaLine className="w-6 h-6 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre en la tarjeta</label>
                                <input 
                                    type="text" 
                                    placeholder="EJ: JUAN PEREZ" 
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-slate-50 uppercase" 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Vencimiento</label>
                                    <input 
                                        type="text" 
                                        placeholder="MM/AA" 
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-slate-50 font-mono text-center" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">CVC/CVV</label>
                                    <input 
                                        type="text" 
                                        placeholder="123" 
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-slate-50 font-mono text-center" 
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 text-lg ${isProcessing ? 'bg-slate-400 shadow-none cursor-not-allowed' : 'bg-slate-900 shadow-slate-900/25 hover:shadow-slate-900/40 hover:-translate-y-0.5'}`}
                        >
                            {isProcessing ? (
                                <span className="animate-pulse">Procesando pago...</span>
                            ) : (
                                `Pagar $${total.toLocaleString()}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
