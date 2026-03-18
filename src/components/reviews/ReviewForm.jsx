import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
const ReviewForm = ({ adId, setReviews }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, addReview, errorMSG, successMSG } = useAuthContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!user) {
            alert("You need to be logged in to leave a review.");
            setLoading(false);
            return;
        }
        if (rating === 0) {
            alert("Please provide a rating.");
            setLoading(false);
            return;
        }
        try {
            const response = await addReview(adId, {
                rating,
                comment,
            });
            if (response) {
                const newReview = {
                    ...response.data,
                    user: response.data.user && typeof response.data.user === 'object' 
                        ? response.data.user 
                        : user
                };
                setReviews((prevReviews) => [...prevReviews, newReview]);
                setRating(0);
                setComment("");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Leave a Review</h3>
            {successMSG && <div className="alert alert-success mb-4 text-white font-bold">{successMSG}</div>}
            {errorMSG && <div className="alert alert-error mb-4 text-white font-bold">{errorMSG}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Rating:
                    </label>
                    <div className="rating rating-md">
                        {[...Array(5)].map((_, i) => (
                            <input
                                key={i}
                                type="radio"
                                name="rating-radio"
                                className="mask mask-star-2 bg-orange-400"
                                checked={rating === i + 1}
                                onChange={() => setRating(i + 1)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                        Your Comment:
                    </label>
                    <textarea
                        id="comment"
                        className="textarea textarea-bordered w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Share your thoughts about this property..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full rounded-lg"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;