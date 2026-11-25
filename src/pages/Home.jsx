import React from "react";
import {Link} from "react-router-dom";
import {ArrowRight, Package} from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Home({products, loading, add, notify}) {
    const handleAdded = (product, result) => {
        if (result?.added > 0) notify("Added to bag", `${product.name} is now in your shopping bag.`);
        else notify("Bag not changed", result?.message || "Unable to add this item.");
    };

    return (
        <>
            <section className="hero">
                <div className="hero-copy">
                    <div className="eyebrow light">THE MELLORA EDIT</div>
                    <h1>Everyday pieces,<br/><em>beautifully chosen.</em></h1>
                    <p>An elegant collection of fashion, lifestyle and everyday essentials — thoughtfully selected for
                        modern living.</p>
                    <Link to="/shop" className="light-btn">Discover the Collection <ArrowRight size={17}/></Link>
                </div>
            </section>
            <section className="intro">
                <div>
                    <div className="eyebrow">CURATED FOR YOU</div>
                    <h2>Quiet luxury for<br/>everyday moments.</h2></div>
                <p>Mellora brings together refined essentials with an editorial, effortless feel. Browse the latest
                    arrivals and find pieces that belong in your everyday life.</p>
            </section>
            <section className="featured">
                <div className="section-top">
                    <div>
                        <div className="eyebrow">FEATURED COLLECTION</div>
                        <h2>New arrivals</h2></div>
                    <Link to="/shop" className="text-link">View all <ArrowRight size={16}/></Link>
                </div>
                {loading ? <div className="loading">Loading collection…</div> : products.length ? (
                    <div className="product-grid">
                        {products.slice(0, 4).map(product => <ProductCard key={product._id} product={product} add={add}
                                                                          onAdded={handleAdded}/>)}
                    </div>
                ) : (
                    <div className="empty-state"><Package size={38}/><h2>Our collection is taking a moment.</h2>
                        <p>Please check the backend and MongoDB connection.</p></div>
                )}
            </section>
            <section className="editorial" id="about">
                <div className="editorial-image"><img
                    src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Elegant fashion editorial" loading="lazy"/></div>
                <div className="editorial-copy">
                    <div className="eyebrow">ABOUT MELLORA</div>
                    <h2>Less noise.<br/><em>More beautiful things.</em></h2><p>We believe online shopping should feel
                    calm, considered and personal. Mellora is designed around that idea — a clean space for products
                    worth discovering.</p></div>
            </section>
        </>
    );
}
