import { RiLogoutBoxRLine, RiDashboardLine } from '@remixicon/react'
import { Link } from 'react-router-dom';

export const AdminNavbar = ({ logout, children }) => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo como Link a Inicio */}
                    <Link to="/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <RiDashboardLine className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">
                            Salud<span className="text-blue-600">Admin</span>
                        </h1>
                    </Link>

                    {/* Links de NavegaciÃ³n */}
                    <nav className="hidden md:flex gap-6">
                        <Link to="/admin" className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Gestionar Productos</Link>
                        <Link to="/admin/payments" className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Verificar Pagos</Link>
                        <Link to="/admin/history" className="font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Historial Verificados</Link>
                    </nav>

                    {/* botones y acciones */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 transition-colors"
                        >
                            <RiLogoutBoxRLine className="w-4 h-4" />
                            <span className="hidden sm:inline">Cerrar sesiÃ³n</span>
                        </button>

                        <div className="relative">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
