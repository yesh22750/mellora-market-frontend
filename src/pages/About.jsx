import React from "react";
import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";

export default function About() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="about-hero-copy">
                    <div className="eyebrow light">ABOUT MELLORA</div>
                    <h1>Less noise.<br/><em>More beautiful things.</em></h1>
                    <p>We believe online shopping should feel calm, considered and personal.</p>
                </div>
            </section>
            <section className="about-story">
                <div>
                    <div className="eyebrow">OUR APPROACH</div>
                    <h2>Quiet luxury for everyday moments.</h2></div>
                <div className="about-story-copy">
                    <p>Mellora brings together refined essentials with an editorial, effortless feel. Every part of the
                        experience is designed to help you discover useful, beautiful products without unnecessary
                        noise.</p>
                    <p>From curated products and reviews to a personal wishlist, secure account and simple checkout,
                        Mellora keeps the shopping journey thoughtful from first click to final order.</p>
                    <Link to="/shop" className="dark-btn">Explore the collection <ArrowRight size={16}/></Link>
                </div>
            </section>
            <section className="about-values">
                <article><span>01</span><h3>Thoughtful selection</h3><p>Products are presented with clear information so
                    you can choose with confidence.</p></article>
                <article><span>02</span><h3>Calm design</h3><p>A clean editorial interface keeps attention on the
                    products rather than the clutter.</p></article>
                <article><span>03</span><h3>Built for everyday</h3><p>Simple cart, wishlist, reviews and order tools
                    make the experience practical as well as beautiful.</p></article>
            </section>
        </main>
    );
}
