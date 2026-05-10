
//DashboardBase: Pantalla principal para los administradores. 
//Organiza la visualizaciÃ³n de datos usando un sistema de PestaÃ±as.
import { TabGroup, TabList, Tab } from '@tremor/react'
import React, { useState } from 'react'
import CharDonut from '../graficas/CharDonut'
import SalesChart from '../graficas/SalesChart'
import DetailChart from '../graficas/DetailChart'

const DashboardBase = () => {
    // selectedIndex: Guarda quÃ© pestaÃ±a estÃ¡ activa. principal (0) y detalles (1)
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <main className='min-h-screen pt-28 bg-slate-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 p-6 sm:p-10 font-sans text-slate-900 selection:bg-blue-200'>
            <div className="mb-10 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
                    <br />
                    Dashboard
                </h1>
                <p className="text-slate-500 text-lg font-medium">Panel de control de administrador interactivo.</p>
            </div>

            {/* TabGroup enlaza su estado local con las pestaÃ±as de Tremor */}
            <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                <div className="p-1.5 rounded-xl bg-white backdrop-blur-md border border-slate-200 w-max mb-10 shadow-lg animate-in fade-in zoom-in-95 duration-500">
                    <TabList variant="solid" className="w-full flex gap-1">
                        <Tab className="ui-selected:bg-blue-600 ui-selected:text-white ui-selected:shadow-lg ui-selected:shadow-blue-500/30 ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 ui-not-selected:hover:bg-slate-50 transition-all duration-300 ease-out rounded-lg px-6 py-2.5 font-semibold text-sm outline-none border-none">
                            Principal
                        </Tab>
                        <Tab className="ui-selected:bg-blue-600 ui-selected:text-white ui-selected:shadow-lg ui-selected:shadow-blue-500/30 ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 ui-not-selected:hover:bg-slate-50 transition-all duration-300 ease-out rounded-lg px-6 py-2.5 font-semibold text-sm outline-none border-none">
                            Detalles
                        </Tab>
                    </TabList>
                </div>
            </TabGroup>

            <div className="transition-all duration-500 ease-in-out">
                {/* Si selectedIndex es 0 renderiza el contenido 'Principal', si no, 'Detalles' */}
                {selectedIndex === 0 ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="mt-8 flex flex-col lg:flex-row gap-8">
                            <div className="flex-1 rounded-2xl bg-white border border-slate-200 shadow-xl p-6 transition-all hover:shadow-2xl duration-300 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                                    Resumen de Ventas
                                </h3>
                                {/* Grafico de barras */}
                                <SalesChart />
                            </div>
                            <div className="w-full lg:w-[400px]">
                                {/*grafico de donut*/}
                                <CharDonut />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-6 transition-all hover:shadow-2xl duration-300 min-h-[500px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-sky-600 rounded-full inline-block"></span>
                                AnÃ¡lisis Detallado
                            </h3>
                            {/* integrar grÃ¡fica de detalle */}
                            <DetailChart />
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default DashboardBase
