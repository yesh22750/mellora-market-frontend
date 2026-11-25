import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {LogOut, Search, ShoppingBag, User} from "lucide-react";

export default function Navbar({cartCount, user, onLogout, openCart}) {
    const nav = useNavigate();

    return (
        <header className="navbar">
            <Link to="/" className="brand" aria-label="Mellora Market home">
                <div className="brand-mark">M</div>
                <div>
                    <div className="brand-name">Mellora</div>
                    <div className="brand-sub">MARKET</div>
                </div>
            </Link>

            <nav className="nav-links" aria-label="Primary navigation">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/about">About</Link>
            </nav>

            <div className="nav-actions">
                <button type="button" className="round-btn" onClick={() => nav("/shop")} aria-label="Search products">
                    <Search size={18}/>
                </button>
                <button type="button" className="round-btn" onClick={() => nav(user ? "/account" : "/login")}
                        aria-label="Account">
                    <User size={18}/>
                </button>
                {user && (
                    <button type="button" className="round-btn" onClick={onLogout} aria-label="Sign out">
                        <LogOut size={17}/>
                    </button>
                )}
                <button type="button" className="bag-btn" onClick={openCart}
                        aria-label={`Shopping bag with ${cartCount} items`}>
                    <ShoppingBag size={18}/>
                    <span>Bag</span>
                    {cartCount > 0 && <b>{cartCount}</b>}
                </button>
            </div>
        </header>
    );
}
