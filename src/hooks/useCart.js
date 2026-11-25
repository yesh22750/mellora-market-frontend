import {useEffect, useState} from "react";
import api from "../api";
import {imageFor} from "../utils/formatters";
import {readStoredCart} from "../utils/storage";

export function useCart(user) {
    const [cart, setCart] = useState(() => user ? [] : readStoredCart());
    const [cartLoading, setCartLoading] = useState(Boolean(user));

    useEffect(() => {
        if (!user) {
            setCart(readStoredCart());
            setCartLoading(false);
            return;
        }

        let active = true;
        setCartLoading(true);

        async function syncCart() {
            try {
                const guestCart = readStoredCart();
                if (guestCart.length) {
                    await api.post("/cart/merge", {items: guestCart});
                    localStorage.removeItem("mellora_cart");
                }
                const data = await api.get("/cart");
                if (active) setCart(data.items || []);
            } catch {
                if (active) setCart([]);
            } finally {
                if (active) setCartLoading(false);
            }
        }

        syncCart();
        return () => {
            active = false;
        };
    }, [user?.id]);

    useEffect(() => {
        if (!user) localStorage.setItem("mellora_cart", JSON.stringify(cart));
    }, [cart, user]);

    const add = async (product, quantity = 1) => {
        const id = product?._id || product?.id;
        const maxStock = Math.max(0, Number(product?.stock ?? 999999));
        const requested = Math.max(1, Number(quantity || 1));

        if (!id || maxStock === 0) {
            return {added: 0, message: "This product is currently out of stock."};
        }

        if (!user) {
            const found = cart.find(item => item.id === id);
            const current = found?.quantity || 0;
            const nextQuantity = Math.min(maxStock, current + requested);
            const added = Math.max(0, nextQuantity - current);

            if (added === 0) return {added: 0, message: `Only ${maxStock} available for ${product.name}.`};

            setCart(items => {
                const existing = items.find(item => item.id === id);
                if (!existing) {
                    return [...items, {
                        id,
                        name: product.name,
                        price: Number(product.price || 0),
                        image: imageFor(product),
                        stock: maxStock,
                        quantity: Math.min(maxStock, requested)
                    }];
                }
                return items.map(item => item.id === id ? {...item, stock: maxStock, quantity: nextQuantity} : item);
            });

            return {
                added,
                message: added < requested ? `Only ${maxStock} available — bag updated.` : `${product.name} added to your bag.`
            };
        }

        try {
            const data = await api.post("/cart/items", {product: id, quantity: requested});
            setCart(data.items || []);
            return {added: data.added || 0, message: data.message || `${product.name} added to your bag.`};
        } catch (error) {
            return {added: 0, message: error.message};
        }
    };

    const remove = async id => {
        if (!user) {
            setCart(items => items.filter(item => item.id !== id));
            return;
        }
        try {
            const data = await api.delete(`/cart/items/${id}`);
            setCart(data.items || []);
        } catch {
            // The next cart refresh will reconcile the server state.
        }
    };

    const changeQty = async (id, delta) => {
        const item = cart.find(entry => entry.id === id);
        if (!item) return;
        const next = Math.max(0, Math.min(Number(item.stock || 999999), item.quantity + delta));

        if (!user) {
            setCart(items => items.map(entry => entry.id === id ? {
                ...entry,
                quantity: next
            } : entry).filter(entry => entry.quantity > 0));
            return;
        }

        try {
            const data = await api.patch(`/cart/items/${id}`, {quantity: next});
            setCart(data.items || []);
        } catch {
            // Server remains authoritative.
        }
    };

    const clear = async () => {
        if (!user) {
            setCart([]);
            return;
        }
        try {
            await api.delete("/cart");
            setCart([]);
        } catch {
            // Keep the UI intact if the server is temporarily unavailable.
        }
    };

    return {
        cart,
        add,
        remove,
        changeQty,
        clear,
        cartLoading,
        count: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
}
