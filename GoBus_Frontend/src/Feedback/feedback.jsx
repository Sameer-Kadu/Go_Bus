import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { feedback } from "../services/user";
import { toast } from "react-toastify";

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // Get bookingId from URL
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      toast.error("Invalid feedback link. Please check your email.");
    }
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.warning("Please select a rating.");
      return;
    }

   const response = feedback(bookingId, rating, review);

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        toast.error("Error submitting feedback.");
      }
   
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      {submitted ? (
        <h2 className="text-xl text-green-600">Thank you for your feedback! 🎉</h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Rate Your Experience</h2>
          <p className="mb-4">Your feedback helps us improve our service.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="0">Select Rating</option>
                <option value="1">⭐ 1 - Poor</option>
                <option value="2">⭐⭐ 2 - Fair</option>
                <option value="3">⭐⭐⭐ 3 - Good</option>
                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium">Review (Optional):</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Share your experience..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Feedback;
