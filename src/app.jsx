import { useState } from 'preact/hooks'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProducList } from './features/shop/ProductList'
import { Header } from './features/cart/Header'
import { Footer } from './features/shop/Footer'
import Login from './features/auth/LoginForm'
import { Checkout } from './features/checkout/Checkout'
import { PaymentGateway } from './features/payment/PaymentGateway'
import { SuccessPage } from './features/payment/SuccessPage'
import { ContactPage } from './features/contact/contact'
import { DonationView } from './features/donation/DonationView'
import { VolunteerView } from './features/voluntario/VolunteerView'
import { AdminNavbar } from './features/admin/dashboard/AdminNavbar'
import { AddProduct } from './features/admin/add/AddProduct'
import { ProductManagement } from './features/admin/editar/ProductManagement'
import { PaymentReview } from './features/admin/review/PaymentReview'
import { VerifiedHistory } from './features/admin/verify/VerifiedHistory'


//guardar el estado global

export function App() {

  // allProducts: Guarda la lista de productos que estÃ¡n en el carrito.
  const [allProducts, setAllProducts] = useState([]);

  // total: Guarda cuÃ¡nto dinero suma del carrito.
  const [total, setTotal] = useState(0);

  // countProducts: Guarda cuÃ¡ntos Ã­tems hay en total en el carrito.
  const [countProducts, setCountProducts] = useState(0);

  // isAuth: verifica si el usuario ingresÃ³ exitosamente.
  const [isAuth, setIsAuth] = useState(false);

  // user: diferencia si el que inicio sesion es admin o usuario
  const [user, setUser] = useState(null);

  // donationAmount: Guarda el monto que el usuario quiere donar
  const [donationAmount, setDonationAmount] = useState(0);

  // customerInfo: Guarda los datos de envio del cliente
  const [customerInfo, setCustomerInfo] = useState(null);

  const navigate = useNavigate();

  // recordPurchase: Guarda la compra en el servidor y actualiza el stock
  const recordPurchase = async (paymentProof) => {
    const purchase = {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().getTime(),
      products: allProducts,
      total: total,
      paymentProof: paymentProof,
      customer: customerInfo,
      status: 'pending'
    };

    try {
      // 1. Guardar la compra
      const response = await fetch("http://localhost:3001/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchase)
      });

      if (!response.ok) throw new Error('Error guardando compra');

      // 2. Actualizar el stock de cada producto
      for (const item of allProducts) {
        // Obtenemos la data actual del producto para tener el stock más reciente
        const pResponse = await fetch(`http://localhost:3001/products/${item.id}`);
        const currentProduct = await pResponse.json();
        
        const newQuantity = Math.max(0, currentProduct.quantity - item.quantity);
        
        await fetch(`http://localhost:3001/products/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity })
        });
      }
    } catch (error) {
      console.error("Error registrando compra o actualizando stock:", error);
      alert("Hubo un problema al procesar tu pedido.");
    }
  };

  return (
    <Routes>
      {/* Rutas de Administrador */}
      {isAuth && user?.role === "admin" && (
        <Route path="/admin/*" element={
          <div className="flex flex-col min-h-screen">
            <AdminNavbar logout={() => { setIsAuth(false); setUser(null); }} />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<ProductManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="payments" element={<PaymentReview />} />
                <Route path="history" element={<VerifiedHistory />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </div>
          </div>
        } />
      )}

      {/* Ruta de Login */}
      <Route path="/login" element={
        isAuth && user?.role === "admin"
          ? <Navigate to="/admin" replace />
          : <Login setIsAuth={setIsAuth} setUser={setUser} />
      } />

      {/* Rutas PÃºblicas (Tienda) */}
      <Route path="*" element={
        <div className="flex flex-col min-h-screen">
          <Header
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
            onCheckout={() => navigate("/checkout")}
          />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={
                <ProducList
                  allProducts={allProducts}
                  setAllProducts={setAllProducts}
                  total={total}
                  setTotal={setTotal}
                  countProducts={countProducts}
                  setCountProducts={setCountProducts}
                />
              } />
              <Route path="/checkout" element={
                <Checkout
                  allProducts={allProducts}
                  total={total}
                  onProceedToPayment={(data) => {
                    setCustomerInfo(data);
                    navigate("/payment");
                  }}
                  onBack={() => navigate("/")}
                />
              } />
              <Route path="/payment" element={
                <PaymentGateway
                  total={total}
                  onBack={() => navigate("/checkout")}
                  onSuccess={async (paymentProof) => {
                    await recordPurchase(paymentProof);
                    navigate("/success");
                  }}
                />
              } />
              <Route path="/success" element={
                <SuccessPage
                  onContinue={() => {
                    setAllProducts([]);
                    setTotal(0);
                    setCountProducts(0);
                    setCustomerInfo(null);
                    navigate("/");
                  }}
                />
              } />
              <Route path="/about" element={
                <ContactPage
                  onContinue={() => navigate("/")}
                />
              } />
              <Route path="/voluntario" element={
                <VolunteerView />
              } />
              <Route path="/donar" element={
                <DonationView
                  onProceed={(amount) => {
                    setDonationAmount(amount);
                    navigate("/payment-donation");
                  }}
                />
              } />
              <Route path="/payment-donation" element={
                <PaymentGateway
                  total={donationAmount}
                  onBack={() => navigate("/donar")}
                  onSuccess={async (paymentProof) => {
                    // También podríamos registrar las donaciones si quisiéramos
                    // Por ahora solo vamos al éxito
                    navigate("/success-donation");
                  }}
                />
              } />
              <Route path="/success-donation" element={
                <SuccessPage
                  title="¡Gracias por tu donación!"
                  message="Tu aporte ha sido procesado exitosamente y nos ayudará a seguir brindando servicios y productos médicos de calidad."
                  onContinue={() => {
                    setDonationAmount(0);
                    navigate("/");
                  }}
                />
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      } />
    </Routes>
  );
}
