import React from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api";

export default function Auth({register, onLogin, notify}) {
    const nav = useNavigate();
    const [form, setForm] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setBusy(true);
        setError("");

        try {
            const payload = register
                ? form
                : {email: form.email, password: form.password};

            const data = await api.post(register ? "/auth/register" : "/auth/login", payload);

            localStorage.setItem("mellora_token", data.token);
            localStorage.setItem("mellora_user", JSON.stringify(data.user));
            onLogin(data.user);
            notify("Welcome to Mellora", register ? "Your account is ready." : "You are signed in.");
            nav("/account");
        } catch (error) {
            setError(error.message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-art">
                <div className="eyebrow">MELLORA CIRCLE</div>
                <h2>Good things,<br/><em>thoughtfully chosen.</em></h2>
                <p>
                    Save your favourites, track orders and keep every little detail in one place.
                </p>
            </div>

            <form className="auth-form" onSubmit={submit}>
                <div className="eyebrow">{register ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</div>
                <h1>{register ? "Create an account" : "Sign in"}<em>.</em></h1>

                {register && (
                    <label htmlFor="auth-name">
                        Your name
                        <input
                            id="auth-name"
                            name="name"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={event => setForm({...form, name: event.target.value})}
                        />
                    </label>
                )}

                <label htmlFor="auth-email">
                    Email
                    <input
                        id="auth-email"
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={event => setForm({...form, email: event.target.value})}
                    />
                </label>

                <label htmlFor="auth-password">
                    Password
                    <input
                        id="auth-password"
                        name="password"
                        required
                        minLength="6"
                        type="password"
                        autoComplete={register ? "new-password" : "current-password"}
                        value={form.password}
                        onChange={event => setForm({...form, password: event.target.value})}
                    />
                </label>

                {error && <div className="form-error" role="alert">{error}</div>}

                <button type="submit" className="checkout-btn" disabled={busy}>
                    {busy ? "Please wait…" : register ? "Create account" : "Sign in"}
                </button>

                <p>
                    {register ? "Already have an account? " : "New to Mellora? "}
                    <Link to={register ? "/login" : "/register"}>
                        {register ? "Sign in" : "Create an account"}
                    </Link>
                </p>
            </form>
        </section>
    );
}
