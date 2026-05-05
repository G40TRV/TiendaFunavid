import { useState } from 'preact/hooks';
import { RiHeartAddFill, RiArrowRightLine } from '@remixicon/react';

export const DonationView = ({ onProceed }) => {
    const [amount, setAmount] = useState(20000); // Default to 20000
    const [customAmount, setCustomAmount] = useState('');

    const presetAmounts = [10000, 20000, 50000, 100000];

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalAmount = customAmount ? Number(customAmount) : amount;
        if (finalAmount > 0) {
            onProceed(finalAmount);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-8 overflow-hidden relative text-center">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-sky-500"></div>
                    
                    <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <RiHeartAddFill className="w-10 h-10 text-cyan-500" />
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 mb-2">Haz una Donación</h2>
                    <p className="text-slate-500 mb-8 font-medium">Tu aporte nos ayuda a seguir brindando servicios y productos médicos de calidad.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-3">
                            {presetAmounts.map((preset) => (
                                <button
                                    type="button"
                                    key={preset}
                                    onClick={() => { setAmount(preset); setCustomAmount(''); }}
                                    className={`py-3 rounded-xl font-bold text-lg transition-all ${amount === preset && !customAmount ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-2 ring-cyan-600 ring-offset-2' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    ${preset.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold">$</span>
                            </div>
                            <input 
                                type="number" 
                                min="1000"
                                placeholder="Otro valor"
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value);
                                    if (e.target.value) setAmount(0);
                                }}
                                className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 bg-slate-50 text-lg font-bold text-slate-900 transition-colors placeholder:font-normal"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg group"
                        >
                            Donar ${(customAmount ? Number(customAmount) : amount).toLocaleString()}
                            <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
