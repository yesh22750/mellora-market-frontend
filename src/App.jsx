import React from "react";
import {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import api from "./api";
import {useCart} from "./hooks/useCart";
import {readStoredUser} from "./utils/storage";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import {ProtectedRoute} from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

export default function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const [user, setUser] = useState(readStoredUser);
    const [toast, setToast] = useState(null);
    const cart = useCart(user);

    const notify = (title, message) => setToast({id: Date.now(), title, message});

    useEffect(() => {
        const timer = toast ? window.setTimeout(() => setToast(null), 3200) : undefined;
        return () => timer && window.clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        api.get("/products")
            .then(data => setProducts(data.products || []))
            .catch(error => notify("Catalogue unavailable", error.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("mellora_token");
        if (!token) return;
        api.get("/auth/me")
            .then(data => {
                localStorage.setItem("mellora_user", JSON.stringify(data.user));
                setUser(data.user);
            })
            .catch(error => {
                if (error.status === 401) {
                    localStorage.removeItem("mellora_token");
                    localStorage.removeItem("mellora_user");
                    setUser(null);
                }
            });
    }, []);

    function logout() {
        localStorage.removeItem("mellora_token");
        localStorage.removeItem("mellora_user");
        setUser(null);
        setCartOpen(false);
        notify("Signed out", "Your Mellora session has ended.");
    }

    return (
        <>
            <Navbar cartCount={cart.count} user={user} onLogout={logout} openCart={() => setCartOpen(true)}/>
            {cart.cartLoading && user && <div className="cart-sync" role="status">Syncing your bag…</div>}

            <Routes>
                <Route path="/" element={<Home products={products} loading={loading} add={cart.add} notify={notify}/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/shop"
                       element={<Shop products={products} loading={loading} add={cart.add} notify={notify}/>}/>
                <Route path="/product/:id" element={<ProductDetails add={cart.add} user={user} notify={notify}/>}/>
                <Route path="/login" element={<Auth onLogin={setUser} notify={notify}/>}/>
                <Route path="/register" element={<Auth register onLogin={setUser} notify={notify}/>}/>
                <Route path="/account"
                       element={<ProtectedRoute user={user}><Account user={user} onLogout={logout}/></ProtectedRoute>}/>
                <Route path="/wishlist" element={<ProtectedRoute user={user}><Wishlist add={cart.add} notify={notify}/></ProtectedRoute>}/>
                <Route path="/checkout"
                       element={<Checkout cart={cart.cart} subtotal={cart.subtotal} clear={cart.clear} user={user}
                                          notify={notify}/>}/>
                <Route path="/orders" element={<ProtectedRoute user={user}><Orders/></ProtectedRoute>}/>
                <Route path="/admin" element={user?.role === "admin" ? <Admin/> :
                    <div className="empty-state"><h2>Admin access required.</h2></div>}/>
                <Route path="*"
                       element={<div className="not-found"><h1>Page not found</h1><Link to="/" className="dark-btn">Back
                           home</Link></div>}/>
            </Routes>

            <footer className="footer">
                <div>
                    <div className="brand-name">Mellora</div>
                    <p>Beautifully chosen, everyday.</p></div>
                <span>© 2026 Mellora Market · MERN + MongoDB</span>
            </footer>

            <Toast toast={toast} onClose={() => setToast(null)}/>
            {cartOpen &&
                <CartDrawer cart={cart.cart} subtotal={cart.subtotal} changeQty={cart.changeQty} remove={cart.remove}
                            close={() => setCartOpen(false)}/>}
        </>
    );
}
