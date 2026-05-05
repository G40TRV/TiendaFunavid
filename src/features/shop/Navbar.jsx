import { RiLoginBoxLine, RiHeartPulseLine, RiHeartAddLine } from '@remixicon/react'
import { Link } from 'react-router-dom';

{/* Navbar: Es el navbar exclusivo de la tienda */ }
export const Navbar = ({ children }) => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo como Link a Inicio */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20">
                            <RiHeartPulseLine className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">
                            Funavid<span className="text-cyan-600"> Store</span>
                        </h1>
                    </Link>

                    {/* Links de Navegacion */}
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Inicio</Link>
                        <Link to="/about" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Sobre Nosotros</Link>
                        <Link to="/voluntario" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Voluntariado</Link>
                        <a href="https://www.funavid.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Pagina oficial</a>
                    </nav>

                    {/* botones y acciones */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link
                            to="/donar"
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold shadow-md shadow-cyan-600/20 transition-all hover:-translate-y-0.5"
                        >
                            <RiHeartAddLine className="w-5 h-5" />
                            <span className="hidden sm:inline">Donar</span>
                        </Link>

                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors"
                        >
                            <RiLoginBoxLine className="w-5 h-5" />
                            <span className="hidden sm:inline">Iniciar sesion</span>
                        </Link>

                        <div className="relative">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
