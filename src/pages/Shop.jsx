import React from "react";
import {useMemo, useState} from "react";
import {Search} from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Shop({products, loading, add, notify}) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("featured");

    const categories = useMemo(
        () => ["All", ...new Set(products.map(product => product.category).filter(Boolean))],
        [products]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return [...products]
            .filter(product => {
                const searchable = `${product.name} ${product.description} ${product.category}`.toLowerCase();
                return searchable.includes(q) && (category === "All" || product.category === category);
            })
            .sort((a, b) => {
                if (sort === "low") return a.price - b.price;
                if (sort === "high") return b.price - a.price;
                if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
                return 0;
            });
    }, [products, query, category, sort]);

    const handleAdded = (product, result) => {
        if (result?.added > 0) {
            notify("Added to bag", `${product.name} is now in your shopping bag.`);
        } else {
            notify("Bag not changed", result?.message || "Unable to add this item.");
        }
    };

    return (
        <section className="shop-page">
            <div className="shop-heading">
                <div>
                    <div className="eyebrow">THE COLLECTION</div>
                    <h1>Shop everything</h1>
                    <p>Thoughtfully selected pieces for a more beautiful everyday.</p>
                </div>
            </div>

            <div className="filters">
                <label className="search-field" htmlFor="product-search">
                    <Search size={17}/>
                    <input
                        id="product-search"
                        name="productSearch"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Search products…"
                        autoComplete="off"
                    />
                </label>

                <div className="category-pills" aria-label="Product categories">
                    {categories.map(item => (
                        <button
                            type="button"
                            key={item}
                            className={category === item ? "active" : ""}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <label className="sort-control" htmlFor="product-sort">
                    <span>Sort</span>
                    <select id="product-sort" name="productSort" value={sort}
                            onChange={event => setSort(event.target.value)}>
                        <option value="featured">Featured</option>
                        <option value="low">Price: low to high</option>
                        <option value="high">Price: high to low</option>
                        <option value="rating">Top rated</option>
                    </select>
                </label>
            </div>

            {loading ? (
                <div className="loading">Loading collection…</div>
            ) : filtered.length ? (
                <div className="product-grid shop-grid">
                    {filtered.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            add={add}
                            onAdded={handleAdded}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Search size={36}/>
                    <h2>No matches found</h2>
                    <p>Try another search or category.</p>
                    <button
                        type="button"
                        className="dark-btn"
                        onClick={() => {
                            setQuery("");
                            setCategory("All");
                        }}
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    );
}
