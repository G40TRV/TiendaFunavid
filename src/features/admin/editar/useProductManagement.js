import { useState, useEffect } from 'react';

export const useProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [notification, setNotification] = useState({ message: "", type: "" });

    // Cargar productos al iniciar
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            showNotification("Error al cargar productos", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Â¿EstÃ¡s seguro de que deseas eliminar este producto?")) return;

        try {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
                showNotification("Producto eliminado correctamente", "success");
            } else {
                showNotification("Error al eliminar el producto", "error");
            }
        } catch (error) {
            showNotification("Error de conexiÃ³n", "error");
        }
    };

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setEditFormData({ ...product });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: name === "price" || name === "quantity" ? Number(value) : value
        });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3001/products/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                setProducts(products.map(p => p.id === editingId ? editFormData : p));
                setEditingId(null);
                showNotification("Producto actualizado correctamente", "success");
            } else {
                showNotification("Error al actualizar el producto", "error");
            }
        } catch (error) {
            showNotification("Error de conexiÃ³n", "error");
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return {
        products,
        isLoading,
        editingId,
        editFormData,
        notification,
        handleDelete,
        handleEditClick,
        handleEditChange,
        handleSaveEdit,
        cancelEdit
    };
};
