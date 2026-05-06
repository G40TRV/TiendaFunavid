//Contact page: esta pagina muestra la informacion de la organizacion.
import familia from "./familia.png";
import organizacion from "./organizacion.png";
import camara from "./camara.png";

export const ContactPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-24">

                {/* Primera Sección: Empresa (Imagen Izquierda, Texto Derecha) */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgb(8,145,178,0.15)] group">
                            <div className="absolute inset-0 bg-cyan-600/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0"></div>
                            <img
                                src={familia}
                                alt="Familia feliz"
                                className="w-full h-[400px] sm:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Nuestra <span className="text-cyan-600">Empresa</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-600 to-sky-400 rounded-full"></div>
                        <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                En Funavid, nos dedicamos al bienestar integral de los niños y sus familias. Somos una organización sin ánimos de lucro comprometida con ofrecer bienestar y darle felicidad a los niños.
                            </p>
                            <p>
                                Trabajamos día a día para asegurar que cada familia tenga acceso a los recursos médicos y el apoyo necesario para gozar de una vida plena, saludable y llena de oportunidades.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Segunda Sección: Equipo (Texto Izquierda, Imagen Derecha) */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgb(8,145,178,0.15)] group">
                            <div className="absolute inset-0 bg-cyan-600/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0"></div>
                            <img
                                src={organizacion}
                                alt="Nuestro equipo"
                                className="w-full h-[400px] sm:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6 text-left lg:text-right">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                            Nuestro <span className="text-cyan-600">Equipo</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-600 to-sky-400 rounded-full ml-0 lg:ml-auto"></div>
                        <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                Detrás de cada proyecto y sonrisa hay un grupo humano verdaderamente extraordinario. Nuestro equipo está conformado por profesionales apasionados que dedican su vida a construir un futuro mejor.
                            </p>
                            <p>
                                Creemos firmemente que trabajando juntos, uniendo la vocación médica con la empatía y el espíritu voluntario, somos capaces de transformar la realidad de quienes más lo necesitan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tercera Sección: Impacto (Imagen con texto superpuesto) */}
                <div className="relative w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgb(8,145,178,0.2)] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 group">
                    {/* Imagen de fondo */}
                    <img
                        src={camara}
                        alt="Impacto Funavid"
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    {/* Capa oscura para que el texto sea legible */}
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors duration-700"></div>

                    {/* Contenido flotante centrado */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 text-center">
                        <div className="max-w-4xl space-y-6">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
                                Nuestra aporta ha ayudado a varias familias y hecho muchos niños felices.
                            </h2>
                            <div className="w-20 sm:w-24 h-1.5 bg-cyan-400 rounded-full mx-auto shadow-lg"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
