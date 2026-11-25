import React from "react";
import {Link} from "react-router-dom";
import {ShoppingBag, Star} from "lucide-react";
import {imageFor, money} from "../utils/formatters";

export default function ProductCard({product, add, onAdded}) {
    const stock = Number(product.stock ?? 0);

    const handleAdd = async event => {
        event.preventDefault();
        event.stopPropagation();
        const result = await add(product, 1);
        onAdded?.(product, result);
    };

    return (
        <article className="product-card">
            <Link to={`/product/${product._id}`} className="product-image-link">
                <img src={imageFor(product)} alt={product.name} loading="lazy"/>
                <span className="image-tag">{product.category || "MELLORA"}</span>
                {stock === 0 && <span className="stock-tag">SOLD OUT</span>}
            </Link>
            <div className="product-card-body">
                <div className="product-meta">{product.category || "ESSENTIALS"}</div>
                <Link to={`/product/${product._id}`}><h3>{product.name}</h3></Link>
                <p className="short-description">{product.description}</p>
                <div className="rating-line compact">
                    <Star size={13} fill="currentColor"/>
                    <span>{Number(product.rating || 5).toFixed(1)}</span>
                    <span>· {product.reviewCount || 0} reviews</span>
                </div>
                <div className="card-bottom">
                    <strong>{money(product.price)}</strong>
                    <button type="button" className="add-btn" disabled={stock === 0} onClick={handleAdd}>
                        <ShoppingBag size={15}/>
                        {stock === 0 ? "Sold Out" : "Add to Bag"}
                    </button>
                </div>
            </div>
        </article>
    );
}
