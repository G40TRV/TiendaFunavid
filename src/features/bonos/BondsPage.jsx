import { AlliesSection } from "../../shared/AlliesSection";
import parque from "./parque.png";

export const BondsPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section: Dos columnas */}
                <div className="mb-12 flex flex-col lg:flex-row justify-between items-center gap-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Columna Izquierda: Título e Información */}
                    <div className="text-center lg:text-left lg:w-1/2">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
                            Nuestros <span className="text-cyan-600">Bonos</span>
                        </h2>
                        <div className="space-y-4 text-lg text-slate-600 font-medium">
                            <p>
                                Los bonos de Funavid son una forma especial de contribuir a nuestra causa. Estos son otorgados por nuestras organizaciones aliadas como reconocimiento a las personas que realizan donaciones o aportes significativos.
                            </p>
                            <p>
                                Al obtener un bono, no solo estás recibiendo un beneficio de nuestros aliados, sino que estás impactando directamente en la vida de los niños y familias que apoyamos con servicios médicos y bienestar.
                            </p>
                            <div className="pt-4">
                                <button className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20">
                                    Saber más sobre cómo donar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Imagen */}
                    <div className="w-full lg:w-1/2 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/10 group">
                        <div className="absolute inset-0 bg-cyan-600/10 mix-blend-overlay z-10"></div>
                        <img
                            src={parque}
                            alt="Personas colaborando por una causa"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                </div>

                {/* Sección de Aliados Reutilizada */}
                <AlliesSection />

                {/* Información adicional o CTA */}
                <div className="mt-24 text-center bg-cyan-600 rounded-3xl p-10 sm:p-16 text-white shadow-xl">
                    <h3 className="text-3xl sm:text-4xl font-bold mb-6">¿Quieres ser parte de nuestra red de aliados?</h3>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Si tu organización desea contribuir a través de bonos o apoyos directos, contáctanos hoy mismo.
                    </p>
                    <button className="bg-white text-cyan-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all transform hover:scale-105">
                        Contactar Alianzas
                    </button>
                </div>
            </div>
        </div>
    );
};
