import { useState } from 'preact/hooks';

{/* useProductList: Es el hook que se encarga de manejar la logica de los productos */ }
export const useProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
    // addedIds: identifica que producto acaba de aÃ±adirse
    const [addedIds, setAddedIds] = useState([]);

    // Función onAddProduct: Se ejecuta cada vez que se da click al botón del producto, 
    // Añade el producto al carrito considerando la cantidad seleccionada.
    const onAddProduct = (product, quantityToAdd = 1) => {
        // Encontrar si el producto ya está en el carrito para saber cuántos hay guardados
        const existingInCart = allProducts.find(item => item.id === product.id);
        const currentCartQty = existingInCart ? existingInCart.quantity : 0;
        
        // Verificar si la suma de lo que ya hay + lo nuevo supera el stock total
        if (currentCartQty + quantityToAdd > product.stock) {
            alert(`Lo sentimos, solo quedan ${product.stock} unidades disponibles de este producto.`);
            return;
        }

        if (!addedIds.includes(product.id)) {
            setAddedIds([...addedIds, product.id]);
            setTimeout(() => {
                setAddedIds(prev => prev.filter(id => id !== product.id));
            }, 1000);
        }

        if (existingInCart) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantityToAdd }
                    : item
            );
            setTotal(total + product.price * quantityToAdd);
            setCountProducts(countProducts + quantityToAdd);
            return setAllProducts([...products]);
        }

        setTotal(total + product.price * quantityToAdd);
        setCountProducts(countProducts + quantityToAdd);
        setAllProducts([...allProducts, { ...product, quantity: quantityToAdd }]);
    };

    return {
        addedIds,
        onAddProduct
    };
};
