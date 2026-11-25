import React from "react";
import {Link} from "react-router-dom";
import {ArrowRight, Minus, Plus, ShoppingBag, Trash2, X} from "lucide-react";
import {money} from "../utils/formatters";

export default function CartDrawer({cart, subtotal, changeQty, remove, close}) {
    const delivery = subtotal >= 1499 ? 0 : 79;

    return (
        <div className="overlay" onClick={close}>
            <aside className="drawer" onClick={event => event.stopPropagation()} aria-label="Shopping bag">
                <div className="drawer-head">
                    <div>
                        <div className="eyebrow">YOUR SELECTION</div>
                        <h2>Shopping Bag</h2></div>
                    <button type="button" className="close-btn" onClick={close} aria-label="Close shopping bag"><X/>
                    </button>
                </div>

                {!cart.length ? (
                    <div className="empty-cart">
                        <ShoppingBag size={42}/>
                        <h3>Your bag is empty</h3>
                        <p>Explore the collection and add something you love.</p>
                        <Link to="/shop" className="dark-btn" onClick={close}>Explore Shop</Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-list">
                            {cart.map(item => (
                                <div className="cart-row" key={item.id}>
                                    <img src={item.image} alt={item.name} loading="lazy"/>
                                    <div className="cart-info">
                                        <h3>{item.name}</h3>
                                        <p>{money(item.price)}</p>
                                        <div className="qty" aria-label={`Quantity for ${item.name}`}>
                                            <button type="button" onClick={() => changeQty(item.id, -1)}
                                                    aria-label={`Decrease ${item.name} quantity`}><Minus size={13}/>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button type="button" onClick={() => changeQty(item.id, 1)}
                                                    aria-label={`Increase ${item.name} quantity`}><Plus size={13}/>
                                            </button>
                                        </div>
                                    </div>
                                    <button type="button" className="delete-btn" onClick={() => remove(item.id)}
                                            aria-label={`Remove ${item.name}`}><Trash2 size={17}/></button>
                                </div>
                            ))}
                        </div>
                        <div className="drawer-footer">
                            <div className="total-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                            <div className="total-line">
                                <span>Delivery</span><strong>{delivery ? money(delivery) : "FREE"}</strong></div>
                            <Link to="/checkout" className="checkout-btn" onClick={close}>Continue to
                                Checkout <ArrowRight size={17}/></Link>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
