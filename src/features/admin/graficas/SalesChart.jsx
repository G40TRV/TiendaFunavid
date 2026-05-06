//SalesChart: Dibuja un grÃ¡fico de barras (BarChart) para el Resumen de Ventas.
//Usa datos simulados mensuales y se adapta al diseÃ±o oscuro del Dashboard.

import React, { useState, useEffect } from 'react';
import { BarChart } from '@tremor/react';

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const SalesChart = () => {
  const [chartdata, setChartdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:3001/purchases");
        const purchases = await response.json();
        
        // Agrupar por fecha
        const dailyData = purchases.reduce((acc, curr) => {
          const date = curr.date;
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += curr.total;
          return acc;
        }, {});

        // Convertir a formato de grÃ¡fica y ordenar por fecha
        const formatted = Object.keys(dailyData).map(date => ({
          name: date,
          Ventas: dailyData[date]
        })).sort((a, b) => new Date(a.name) - new Date(b.name));

        setChartdata(formatted);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSales();
  }, []);



  return (
    <div className="h-80 w-full animate-in fade-in duration-700 relative">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
      <BarChart
        data={chartdata}
        index="name"
        categories={['Ventas']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        className="h-full w-full"
        showAnimation={true}
        customTooltip={({ payload, active }) => {
          if (!active || !payload) return null;
          return (
            <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg shadow-xl">
              <p className="text-slate-300 font-medium mb-1">{payload[0].payload.name}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-white font-bold">{dataFormatter(payload[0].value)}</span>
              </div>
            </div>
          );
        }}
      />
      )}
    </div>
  );
};

export default SalesChart;
