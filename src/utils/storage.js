import {FALLBACK_IMAGE} from "./constants";

export function readStoredCart() {
    try {
        const raw = JSON.parse(localStorage.getItem("mellora_cart") || "[]");
        if (!Array.isArray(raw)) return [];

        return raw
            .filter(item => item?.id && Number(item.price) >= 0 && Number(item.quantity) > 0)
            .map(item => ({
                id: item.id,
                name: String(item.name || "Mellora item"),
                price: Number(item.price),
                image: item.image || FALLBACK_IMAGE,
                stock: Math.max(1, Number(item.stock || 999999)),
                quantity: Math.max(1, Number(item.quantity))
            }));
    } catch {
        return [];
    }
}

export function readStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("mellora_user") || "null");
    } catch {
        return null;
    }
}
