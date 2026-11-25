import React from "react";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ArrowLeft, Minus, Plus, ShoppingBag, Star} from "lucide-react";
import Reviews from "../components/Reviews";
import api from "../api";
import {imageFor, money} from "../utils/formatters";

export default function ProductDetails({add, user, notify}) {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            api.get(`/products/${id}`),
            api.get(`/reviews/${id}`)
        ])
            .then(([productResponse, reviewResponse]) => {
                setProduct(productResponse.product || productResponse);
                setReviews(reviewResponse.reviews || []);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="loading page-loading">Loading product…</div>;
    if (error) return <div className="not-found"><h2>{error}</h2><Link to="/shop" className="dark-btn">Back to
        shop</Link></div>;
    if (!product) return <div className="not-found"><h2>Product not found.</h2><Link to="/shop" className="dark-btn">Back
        to shop</Link></div>;

    const stock = Number(product.stock || 0);

    async function submitReview(event) {
        event.preventDefault();

        if (!user) {
            notify("Sign in required", "Please sign in before submitting a review.");
            return;
        }

        try {
            await api.post(`/reviews/${id}`, {rating, comment});
            const response = await api.get(`/reviews/${id}`);
            setReviews(response.reviews || []);
            setComment("");
            notify("Review saved", "Thank you for sharing your experience.");
        } catch (error) {
            notify("Review could not be saved", error.message);
        }
    }

    async function addCurrentProduct() {
        const result = await add(product, qty);
        if (result?.added > 0) {
            notify("Added to bag", `${product.name} × ${result.added} added successfully.`);
        } else {
            notify("Bag not changed", result?.message || "Unable to add this product.");
        }
    }

    return (
        <section className="detail-page">
            <Link to="/shop" className="back-link">
                <ArrowLeft size={16}/> Back to shop
            </Link>

            <div className="detail-grid">
                <div className="detail-image">
                    <img src={imageFor(product)} alt={product.name}/>
                </div>

                <div className="detail-copy">
                    <div className="eyebrow">{product.category} · MELLORA EDIT</div>
                    <h1>{product.name}</h1>

                    <div className="rating-line">
                        <Star size={16} fill="currentColor"/>
                        <span>{Number(product.rating || 5).toFixed(1)}</span>
                        <span>· {product.reviewCount || reviews.length || 0} reviews</span>
                    </div>

                    <div className="detail-price">{money(product.price)}</div>
                    <p className="detail-description">{product.description}</p>

                    {product.material && (
                        <div className="detail-spec">
                            <span>Material</span>
                            <strong>{product.material}</strong>
                        </div>
                    )}

                    {product.color && (
                        <div className="detail-spec">
                            <span>Colour</span>
                            <strong>{product.color}</strong>
                        </div>
                    )}

                    <div className="detail-spec">
                        <span>Availability</span>
                        <strong>{stock > 0 ? `${stock} available` : "Out of stock"}</strong>
                    </div>

                    <div className="purchase-row">
                        <div className="qty" aria-label="Product quantity">
                            <button
                                type="button"
                                onClick={() => setQty(value => Math.max(1, value - 1))}
                                aria-label="Decrease quantity"
                            >
                                <Minus size={14}/>
                            </button>
                            <span>{qty}</span>
                            <button
                                type="button"
                                onClick={() => setQty(value => Math.min(stock || 1, value + 1))}
                                aria-label="Increase quantity"
                                disabled={stock === 0 || qty >= stock}
                            >
                                <Plus size={14}/>
                            </button>
                        </div>

                        <button
                            type="button"
                            className="large-add"
                            disabled={stock === 0}
                            onClick={addCurrentProduct}
                        >
                            <ShoppingBag size={18}/>
                            {stock === 0 ? "Out of Stock" : "Add to Bag"}
                        </button>
                    </div>

                    <div className="trust">
                        <div><strong>01</strong> Carefully curated</div>
                        <div><strong>02</strong> Secure checkout</div>
                        <div><strong>03</strong> MongoDB-backed order history</div>
                    </div>
                </div>
            </div>

            <Reviews
                reviews={reviews}
                user={user}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                submit={submitReview}
            />
        </section>
    );
}
