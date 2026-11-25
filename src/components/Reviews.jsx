import React from "react";
import {Star} from "lucide-react";

export default function Reviews({
                                    reviews,
                                    user,
                                    rating,
                                    setRating,
                                    comment,
                                    setComment,
                                    submit
                                }) {
    return (
        <section className="reviews-section">
            <div className="eyebrow">CUSTOMER NOTES</div>
            <h2>Reviews & ratings</h2>

            {reviews.length ? (
                <div className="review-list">
                    {reviews.map(review => (
                        <article className="review" key={review._id}>
                            <div>
                                <strong>
                                    {review.user?.name || "Mellora customer"}
                                </strong>

                                <span>
                                    {"★".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </span>
                            </div>

                            <p>
                                {review.comment || "Lovely product."}
                            </p>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="muted">
                    Be the first to share your experience.
                </p>
            )}

            <form className="review-form" onSubmit={submit}>
                <fieldset className="rating-field">
                    <legend>Rating</legend>

                    <div
                        className="stars"
                        role="radiogroup"
                        aria-label="Rating"
                    >
                        {[1, 2, 3, 4, 5].map(number => (
                            <button
                                type="button"
                                key={number}
                                onClick={() => setRating(number)}
                                className={
                                    number <= rating ? "selected" : ""
                                }
                                aria-label={`${number} star${
                                    number === 1 ? "" : "s"
                                }`}
                                aria-pressed={number === rating}
                            >
                                <Star fill="currentColor"/>
                            </button>
                        ))}
                    </div>
                </fieldset>

                <label htmlFor="review-comment">
                    Your review
                </label>

                <textarea
                    id="review-comment"
                    name="reviewComment"
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                    placeholder={
                        user
                            ? "Share a short review…"
                            : "Sign in to leave a review"
                    }
                    disabled={!user}
                    maxLength={500}
                />

                <button
                    type="submit"
                    className="checkout-btn"
                    disabled={!user}
                >
                    Submit review
                </button>
            </form>
        </section>
    );
}