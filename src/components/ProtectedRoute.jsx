import React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export function ProtectedRoute({user, children}) {
    return user ? children : <AuthRedirect/>;
}

function AuthRedirect() {
    const nav = useNavigate();
    useEffect(() => nav("/login", {replace: true}), [nav]);
    return <div className="page-loading">Redirecting to sign in…</div>;
}
