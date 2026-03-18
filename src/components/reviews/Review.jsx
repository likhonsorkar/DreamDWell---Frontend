import useAuthContext from "../../hooks/useAuthContext";
import apiClient from "../../services/api-client";
const Review = ({ reviews, adId, setReviews }) => {
    const { user, authTokens } = useAuthContext();
    const handleDelete = async (reviewId) => {
        try {
            await apiClient.delete(`/ads/${adId}/reviews/${reviewId}/`, {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            const updatedReviews = reviews.filter((review) => review.id !== reviewId);
            setReviews(updatedReviews);
            alert("Review deleted successfully");
        } catch (error) {
            alert(error.response?.data?.detail || "Failed to delete review");
        }
    };
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 mb-6">Reviews</h2>
            {reviews?.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
            ) : (
                <div className="space-y-6">
                    {reviews?.map((review) => {
                        const userProfile = review.user;
                        const firstName = userProfile?.first_name || "";
                        const lastName = userProfile?.last_name || "";
                        const fullName = `${firstName} ${lastName}`.trim() || userProfile?.username || (typeof userProfile === 'string' ? userProfile : "Anonymous");
                        const profileImage = userProfile?.profile_image;
                        const initial = fullName.charAt(0).toUpperCase();
                        return (
                            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center mb-3">
                                    {profileImage ? (
                                        <img 
                                            src={profileImage} 
                                            alt={fullName} 
                                            className="w-10 h-10 rounded-full object-cover mr-3 border border-orange-100"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-800 font-bold text-lg mr-3">
                                            {initial}
                                        </div>
                                    )}
                                    <h4 className="font-semibold text-gray-800">{fullName}</h4>
                                </div>
                                <div className="rating rating-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            type="radio"
                                            name={`rating-${review.id}`}
                                            className="mask mask-star-2 bg-orange-400"
                                            checked={review.rating === i + 1}
                                            readOnly
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 mt-3 leading-relaxed">
                                    {review.comment}
                                </p>
                                {user && (user.id === userProfile?.id || user.username === (typeof userProfile === 'string' ? userProfile : userProfile?.username)) && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Review;