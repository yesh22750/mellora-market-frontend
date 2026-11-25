import React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Heart, LogOut, Package} from "lucide-react";
import api from "../api";

export default function Account({user, onLogout}) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        api.get("/users/wishlist")
            .then(data => setWishlist(data.products || []))
            .catch(() => {
            });
    }, []);

    return (
        <section className="account-page">
            <div className="account-hero">
                <div className="eyebrow">YOUR MELLORA CIRCLE</div>
                <h1>Hello, <em>{String(user?.name || "Customer").trim().split(/\s+/)[0]}.</em></h1>
                <p>{user.email}</p>
            </div>

            <div className="account-grid">
                <Link to="/orders" className="account-card">
                    <Package/>
                    <h3>My orders</h3>
                    <p>View your order history and live status.</p>
                </Link>

                <Link to="/wishlist" className="account-card">
                    <Heart/>
                    <h3>Wishlist</h3>
                    <p>{wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}.</p>
                </Link>

                {user.role === "admin" && (
                    <Link to="/admin" className="account-card">
                        <Package/>
                        <h3>Admin dashboard</h3>
                        <p>Monitor catalogue, revenue and orders.</p>
                    </Link>
                )}

                <button type="button" className="account-card logout-card" onClick={onLogout}>
                    <LogOut/>
                    <h3>Sign out</h3>
                    <p>End this session securely.</p>
                </button>
            </div>
        </section>
    );
}
