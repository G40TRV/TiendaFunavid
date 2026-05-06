
//muestra una grÃ¡fica de lÃ­nea para comparar las ventas vs devoluciones visualmente usando @tremor/react.

import React, { useState, useEffect } from 'react';
import { AreaChart } from '@tremor/react';

// FunciÃ³n auxiliar para formatear los nÃºmeros a pesos colombianos
const dataFormatter = (number) => {
  return `$${Intl.NumberFormat('COP').format(number).toString()}`;
};


// Componente principal de la vista detallada.
const DetailChart = () => {
  const [chartdata, setChartdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/purchases");
        const purchases = await response.json();
        
        // Agrupar por fecha
        const dailyData = purchases.reduce((acc, curr) => {
          const date = curr.date;
          if (!acc[date]) {
            acc[date] = { Ventas: 0, Devoluciones: 0 };
          }
          acc[date].Ventas += curr.total;
          // Simular devoluciones (ej: 10% del total)
          acc[date].Devoluciones += Math.floor(curr.total * 0.1);
          return acc;
        }, {});

        const formatted = Object.keys(dailyData).map(date => ({
          date: date,
          Ventas: dailyData[date].Ventas,
          Devoluciones: dailyData[date].Devoluciones
        })).sort((a, b) => new Date(a.date) - new Date(b.date));

        setChartdata(formatted);
      } catch (error) {
        console.error("Error cargando detalles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);

  return (
    // Contenedor principal
    <div className="h-96 w-full animate-in fade-in duration-700 relative">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <AreaChart
          data={chartdata}
          index="date"
          categories={['Ventas', 'Devoluciones']}
          colors={['sky', 'rose']}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          className="h-full w-full"
          showAnimation={true}
          customTooltip={({ payload, active }) => {
            if (!active || !payload) return null;
            return (
              <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl flex flex-col gap-2">
                <p className="text-slate-300 font-medium">{payload[0].payload.date}</p>
                {payload.map((category, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${category.color === 'sky' ? 'bg-sky-500' : 'bg-rose-500'}`}></span>
                      <span className="text-slate-400 capitalize">{category.dataKey}</span>
                    </div>
                    <span className="text-white font-bold">{dataFormatter(category.value)}</span>
                  </div>
                ))}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default DetailChart;
