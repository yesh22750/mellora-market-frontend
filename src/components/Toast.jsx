import React from "react";
import {CheckCircle2, X} from "lucide-react";

export default function Toast({toast, onClose}) {
    if (!toast) return null;

    return (
        <div className="toast-wrap" role="status" aria-live="polite">
            <div className="toast">
                <span className="toast-icon"><CheckCircle2 size={19}/></span>
                <div className="toast-copy">
                    <strong>{toast.title}</strong>
                    <span>{toast.message}</span>
                </div>
                <button type="button" className="toast-close" onClick={onClose} aria-label="Close notification">
                    <X size={16}/>
                </button>
            </div>
        </div>
    );
}
