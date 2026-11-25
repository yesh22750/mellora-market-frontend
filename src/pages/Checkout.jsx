import React from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ShoppingBag} from "lucide-react";
import api from "../api";
import {money} from "../utils/formatters";

export default function Checkout({cart, subtotal, clear, user, notify}) {
    const nav = useNavigate();
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });
    const [placing, setPlacing] = useState(false);

    if (!user) {
        return (
            <div className="empty-state">
                <h2>Sign in before checkout.</h2>
                <Link to="/login" className="dark-btn">Sign in</Link>
            </div>
        );
    }

    if (!cart.length) {
        return (
            <div className="empty-state checkout-empty">
                <ShoppingBag size={42}/>
                <h2>Your bag is empty.</h2>
                <p>Add something beautiful before checking out.</p>
                <Link to="/shop" className="dark-btn">Continue shopping</Link>
            </div>
        );
    }

    const delivery = subtotal >= 1499 ? 0 : 79;

    async function place(event) {
        event.preventDefault();
        setPlacing(true);

        try {
            const data = await api.post("/orders", {
                customer: form,
                items: cart.map(item => ({
                    product: item.id,
                    quantity: item.quantity
                })),
                paymentMethod: "demo"
            });

            await clear();
            notify("Order placed", `Order ${data.order.orderNumber} was created successfully.`);
            nav("/orders");
        } catch (error) {
            notify("Checkout failed", error.message);
        } finally {
            setPlacing(false);
        }
    }

    return (
        <section className="checkout-page">
            <div className="checkout-main">
                <div className="eyebrow">SECURE DEMO CHECKOUT</div>
                <h1>Complete your order</h1>

                <form className="checkout-form" onSubmit={place}>
                    <div className="form-grid">
                        {[
                            ["name", "Full name", "text", "name"],
                            ["email", "Email", "email", "email"],
                            ["phone", "Phone", "tel", "tel"],
                            ["pincode", "Pincode", "text", "postal-code"]
                        ].map(([key, label, type, autocomplete]) => (
                            <label key={key} htmlFor={`checkout-${key}`}>
                                {label}
                                <input
                                    id={`checkout-${key}`}
                                    name={key}
                                    required
                                    type={type}
                                    autoComplete={autocomplete}
                                    inputMode={key === "phone" || key === "pincode" ? "numeric" : undefined}
                                    pattern={key === "phone" ? "[0-9]{10}" : key === "pincode" ? "[0-9]{6}" : undefined}
                                    value={form[key]}
                                    onChange={event => setForm({...form, [key]: event.target.value})}
                                />
                            </label>
                        ))}
                    </div>

                    <label htmlFor="checkout-address">
                        Address
                        <textarea
                            id="checkout-address"
                            name="address"
                            required
                            rows="4"
                            autoComplete="street-address"
                            value={form.address}
                            onChange={event => setForm({...form, address: event.target.value})}
                        />
                    </label>

                    <label htmlFor="checkout-city">
                        City
                        <input
                            id="checkout-city"
                            name="city"
                            required
                            autoComplete="address-level2"
                            value={form.city}
                            onChange={event => setForm({...form, city: event.target.value})}
                        />
                    </label>

                    <button type="submit" className="checkout-btn" disabled={placing}>
                        {placing ? "Placing order…" : "Place Order"}
                    </button>
                    <small className="muted">
                        Demo payment only. No card details are collected.
                    </small>
                </form>
            </div>

            <aside className="order-summary">
                <div className="eyebrow">YOUR BAG</div>
                {cart.map(item => (
                    <div className="summary-item" key={item.id}>
                        <span>{item.name} × {item.quantity}</span>
                        <strong>{money(item.price * item.quantity)}</strong>
                    </div>
                ))}
                <div className="summary-total">
                    <span>Delivery</span>
                    <strong>{delivery ? money(delivery) : "FREE"}</strong>
                </div>
                <div className="summary-total">
                    <span>Total</span>
                    <strong>{money(subtotal + delivery)}</strong>
                </div>
            </aside>
        </section>
    );
}
