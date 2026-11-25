import React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Package} from "lucide-react";
import api from "../api";
import {imageFor, money} from "../utils/formatters";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/orders/mine")
            .then(data => setOrders(data.orders || []))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="orders-page shop-page">
            <div className="shop-heading">
                <div>
                    <div className="eyebrow">YOUR MELLORA MOMENTS</div>
                    <h1>Orders & updates.</h1>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading your orders…</div>
            ) : error ? (
                <div className="form-error" role="alert">{error}</div>
            ) : orders.length ? (
                <div className="orders-list">
                    {orders.map(order => (
                        <article className="order-card" key={order._id}>
                            <div>
                                <div className="eyebrow">ORDER {order.orderNumber}</div>
                                <h3>{order.status}</h3>
                                <p>
                                    {new Date(order.createdAt).toLocaleDateString("en-IN")} · {order.items.length} item(s)
                                </p>
                                {order.items.map(item => (
                                    <div className="order-item" key={`${order._id}-${item.product || item.name}`}>
                                        <img src={imageFor(item)} alt={item.name} loading="lazy"/>
                                        <span>{item.name} × {item.quantity}</span>
                                        <b>{money(item.price * item.quantity)}</b>
                                    </div>
                                ))}
                            </div>
                            <strong>{money(order.totalAmount)}</strong>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Package size={40}/>
                    <h2>No orders yet.</h2>
                    <Link to="/shop" className="dark-btn">Start exploring</Link>
                </div>
            )}
        </section>
    );
}
