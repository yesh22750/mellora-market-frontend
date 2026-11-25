import React from "react";
import {useEffect, useState} from "react";
import api from "../api";
import {money} from "../utils/formatters";

export default function Admin() {
    const [summary, setSummary] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState("");
    const statuses = ["Processing", "Shipped", "Out for delivery", "Delivered", "Cancelled"];

    async function load() {
        try {
            const [summaryResponse, ordersResponse] = await Promise.all([
                api.get("/admin/summary"),
                api.get("/orders")
            ]);
            setSummary(summaryResponse);
            setOrders(ordersResponse.orders || []);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function updateStatus(id, status) {
        setBusy(id);
        setError("");

        try {
            await api.patch(`/admin/orders/${id}/status`, {status});
            await load();
        } catch (error) {
            setError(error.message);
        } finally {
            setBusy("");
        }
    }

    return (
        <section className="shop-page">
            <div className="eyebrow">MELLORA ADMIN</div>
            <h1>Store overview</h1>

            {error && <div className="form-error" role="alert">{error}</div>}

            {summary && (
                <div className="admin-grid">
                    <div><span>Products</span><strong>{summary.products}</strong></div>
                    <div><span>Orders</span><strong>{summary.orders}</strong></div>
                    <div><span>Revenue</span><strong>{money(summary.revenue)}</strong></div>
                </div>
            )}

            <div className="admin-orders">
                <div className="eyebrow">ORDER MANAGEMENT</div>
                <h2>Recent orders</h2>

                {orders.length === 0 ? (
                    <p className="muted">No orders yet.</p>
                ) : (
                    orders.map(order => (
                        <article className="admin-order" key={order._id}>
                            <div>
                                <strong>{order.orderNumber}</strong>
                                <p>
                                    {order.customer?.name || "Customer"} ·{" "}
                                    {new Date(order.createdAt).toLocaleDateString("en-IN")} ·{" "}
                                    {money(order.totalAmount)}
                                </p>
                            </div>

                            <label className="sr-only" htmlFor={`status-${order._id}`}>
                                Status for {order.orderNumber}
                            </label>
                            <select
                                id={`status-${order._id}`}
                                name={`status-${order._id}`}
                                value={order.status}
                                disabled={busy === order._id}
                                onChange={event => updateStatus(order._id, event.target.value)}
                            >
                                {statuses.map(status => <option key={status}>{status}</option>)}
                            </select>
                        </article>
                    ))
                )}
            </div>

            <p className="muted">
                Inventory protection, order status controls, authentication and audit logging are enabled in the
                backend.
            </p>
        </section>
    );
}
