
//DashboardBase: Pantalla principal para los administradores. 
//Organiza la visualizaciÃ³n de datos usando un sistema de PestaÃ±as.
import { TabGroup, TabList, Tab } from '@tremor/react'
import React, { useState } from 'react'
import CharDonut from './CharDonut'
import SalesChart from './SalesChart'
import DetailChart from './DetailChart'

const DashboardBase = () => {
    // selectedIndex: Guarda quÃ© pestaÃ±a estÃ¡ activa. principal (0) y detalles (1)
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <main className='min-h-screen pt-28 bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 p-6 sm:p-10 font-sans text-slate-100 selection:bg-blue-500/30'>
            <div className="mb-10 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 drop-shadow-sm">
                    <br />
                    Dashboard
                </h1>
                <p className="text-slate-400 text-lg font-medium">Panel de control de administrador interactivo.</p>
            </div>

            {/* TabGroup enlaza su estado local con las pestaÃ±as de Tremor */}
            <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                <div className="p-1.5 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-700/50 w-max mb-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                    <TabList variant="solid" className="w-full flex gap-1">
                        <Tab className="ui-selected:bg-blue-600 ui-selected:text-white ui-selected:shadow-lg ui-selected:shadow-blue-500/30 ui-not-selected:text-slate-400 ui-not-selected:hover:text-slate-200 ui-not-selected:hover:bg-slate-800/50 transition-all duration-300 ease-out rounded-lg px-6 py-2.5 font-semibold text-sm outline-none border-none">
                            Principal
                        </Tab>
                        <Tab className="ui-selected:bg-blue-600 ui-selected:text-white ui-selected:shadow-lg ui-selected:shadow-blue-500/30 ui-not-selected:text-slate-400 ui-not-selected:hover:text-slate-200 ui-not-selected:hover:bg-slate-800/50 transition-all duration-300 ease-out rounded-lg px-6 py-2.5 font-semibold text-sm outline-none border-none">
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
                            <div className="flex-1 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-6 transition-all hover:bg-slate-900/60 duration-300 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
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
                        <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-6 transition-all hover:bg-slate-900/60 duration-300 min-h-[500px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-sky-500 rounded-full inline-block"></span>
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
