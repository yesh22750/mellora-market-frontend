const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

class ApiError extends Error {
    constructor(message, status = 0) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("mellora_token");
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            signal: controller.signal
        });

        const raw = await response.text();
        let data = {};

        try {
            data = raw ? JSON.parse(raw) : {};
        } catch {
            data = {message: raw || "Unexpected server response"};
        }

        if (!response.ok) {
            throw new ApiError(
                data.message || `Request failed with status ${response.status}`,
                response.status
            );
        }

        return data;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new ApiError("The server took too long to respond. Please try again.", 408);
        }

        if (error instanceof ApiError) throw error;

        throw new ApiError(
            "Unable to reach the Mellora server. Check that the backend is running.",
            0
        );
    } finally {
        window.clearTimeout(timeout);
    }
}

export const api = {
    get: endpoint => request(endpoint),
    post: (endpoint, body) =>
        request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        }),
    patch: (endpoint, body) =>
        request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body)
        }),
    delete: endpoint =>
        request(endpoint, {
            method: "DELETE"
        })
};

export default api;
