import { useState } from 'preact/hooks';

{/* useProductList: Es el hook que se encarga de manejar la logica de los productos */ }
export const useProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
    // addedIds: identifica que producto acaba de aÃ±adirse
    const [addedIds, setAddedIds] = useState([]);

    // Función onAddProduct: Se ejecuta cada vez que se da click al botón del producto, 
    // Añade el producto al carrito considerando la cantidad seleccionada.
    const onAddProduct = (product, quantityToAdd = 1) => {
        if (!addedIds.includes(product.id)) {
            setAddedIds([...addedIds, product.id]);
            setTimeout(() => {
                setAddedIds(prev => prev.filter(id => id !== product.id));
            }, 1000);
        }

        // Si el producto que intentamos subir ya esta en el carrito, 
        // en lugar de añadir un objeto nuevo incrementamos su cantidad.
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantityToAdd }
                    : item
            );
            setTotal(total + product.price * quantityToAdd);
            setCountProducts(countProducts + quantityToAdd);
            return setAllProducts([...products]);
        }

        // Si no estaba sumamos su precio al total
        setTotal(total + product.price * quantityToAdd);
        setCountProducts(countProducts + quantityToAdd);
        setAllProducts([...allProducts, { ...product, quantity: quantityToAdd }]);
    };

    return {
        addedIds,
        onAddProduct
    };
};
