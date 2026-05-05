import { RiShoppingCartLine } from '@remixicon/react'

export const CartIcon = ({ active, setActive, countProducts }) => {
    return (
        <button
            className={`relative p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${active ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            onClick={() => setActive(!active)}
        >
            <RiShoppingCartLine className="w-6 h-6" />
            {countProducts > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 ring-4 ring-white text-[11px] font-bold text-white shadow-sm transform hover:scale-110 transition-transform">
                    {countProducts}
                </span>
            )}
        </button>
    )
}
