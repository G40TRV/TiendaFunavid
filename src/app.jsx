import { useState } from 'preact/hooks'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProducList } from './features/shop/ProductList'
import { Header } from './features/cart/Header'
import { Footer } from './features/shop/Footer'
import Login from './features/auth/LoginForm'
import CharDonut from './features/admin/CharDonut'
import DashboardBase from './features/admin/DashboardBase'
import { Checkout } from './features/checkout/Checkout'
import { PaymentGateway } from './features/payment/PaymentGateway'
import { SuccessPage } from './features/payment/SuccessPage'
import { ContactPage } from './features/contact/contact'
import { DonationView } from './features/donation/DonationView'
import { VolunteerView } from './features/voluntario/VolunteerView'
import { AdminNavbar } from './features/admin/AdminNavbar'
import { AddProduct } from './features/admin/AddProduct'
import { ProductManagement } from './features/admin/ProductManagement'
import { BondsPage } from './features/bonos/BondsPage'


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

  const navigate = useNavigate();

  // recordPurchase: Guarda la compra en el servidor simulado
  const recordPurchase = async () => {
    const purchase = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      timestamp: new Date().getTime(),
      products: allProducts,
      total: total
    };

    try {
      await fetch("http://localhost:3001/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchase)
      });
    } catch (error) {
      console.error("Error registrando compra:", error);
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
                <Route path="/" element={<DashboardBase />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="add-product" element={<AddProduct />} />
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
                  onProceedToPayment={() => navigate("/payment")}
                  onBack={() => navigate("/")}
                />
              } />
              <Route path="/payment" element={
                <PaymentGateway
                  total={total}
                  onBack={() => navigate("/checkout")}
                  onSuccess={async () => {
                    await recordPurchase();
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
              <Route path="/bonos" element={
                <BondsPage />
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
                  onSuccess={() => {
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
