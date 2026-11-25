import React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Heart} from "lucide-react";
import ProductCard from "../components/ProductCard";
import api from "../api";

export default function Wishlist({add, notify}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = () =>
        api.get("/users/wishlist")
            .then(data => setItems(data.products || []))
            .finally(() => setLoading(false));

    useEffect(() => {
        load().catch(() => {
        });
    }, []);

    async function toggle(id) {
        try {
            await api.post(`/users/wishlist/${id}`, {});
            await load();
            notify("Wishlist updated", "Your saved items have been updated.");
        } catch (error) {
            notify("Wishlist error", error.message);
        }
    }

    return (
        <section className="shop-page">
            <div className="shop-heading">
                <div>
                    <div className="eyebrow">SAVED FOR LATER</div>
                    <h1>Your wishlist</h1>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading wishlist…</div>
            ) : items.length ? (
                <div className="product-grid shop-grid">
                    {items.map(product => (
                        <div key={product._id} className="wishlist-wrap">
                            <ProductCard product={product} add={add} onAdded={(p, result) => {
                                if (result?.added > 0) notify("Added to bag", `${p.name} is now in your bag.`);
                                else notify("Bag not changed", result?.message || "");
                            }}/>
                            <button type="button" className="wishlist-remove" onClick={() => toggle(product._id)}>
                                <Heart fill="currentColor" size={16}/> Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Heart size={38}/>
                    <h2>Your wishlist is waiting.</h2>
                    <Link to="/shop" className="dark-btn">Explore shop</Link>
                </div>
            )}
        </section>
    );
}
