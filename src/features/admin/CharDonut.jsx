
//CharDonut: Componente visual de Dashboard que dibuja una grÃ¡fica de Dona (DonutChart) interactiva usando @tremor/react.

import React, { useState, useEffect } from 'react';
import { DonutChart } from '@tremor/react';
const CharDonut = () => {
  const [prod, setProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/purchases");
        const purchases = await response.json();
        
        // Agrupar por producto (sumar ventas de cada uno)
        const productSales = purchases.reduce((acc, purchase) => {
          purchase.products.forEach(product => {
            const name = product.nameProduct;
            if (!acc[name]) {
              acc[name] = 0;
            }
            acc[name] += product.price * product.quantity;
          });
          return acc;
        }, {});

        const formatted = Object.keys(productSales).map(name => ({
          name: name,
          sales: productSales[name]
        })).sort((a, b) => b.sales - a.sales);

        setProd(formatted);
      } catch (error) {
        console.error("Error cargando productos mÃ¡s vendidos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className="rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-6 transition-all hover:bg-slate-900/60 duration-300 relative overflow-hidden group h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-bl from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-violet-500 rounded-full inline-block"></span>
        Productos Vendidos
      </h3>

      <div className="flex-1 flex items-center justify-center p-4 bg-slate-950/30 rounded-xl border border-slate-800/80 shadow-inner relative">
        {isLoading ? (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : (
        <DonutChart
          data={prod}
          category='sales'
          index='name'
          className="h-60 mt-2 font-medium text-slate-100"
          colors={["blue-500", "violet-500", "rose-500", "sky-500"]}
          variant="pie"
          showAnimation={true}
        />
        )}
      </div>
    </div>
  )
}

export default CharDonut
