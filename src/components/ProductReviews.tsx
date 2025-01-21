"use client";
import React, { useState } from "react";

export default function Reviews() {
  const initialReviews = [
    { name: "John Doe", rating: 5, reviewText: "This is a great product!", date: "August 14, 2023" },
    { name: "Jane Smith", rating: 4, reviewText: "Good quality, but could be improved.", date: "August 12, 2023" },
    { name: "Alice Brown", rating: 3, reviewText: "It's okay, but needs some work.", date: "August 10, 2023" },
    { name: "Bob White", rating: 5, reviewText: "Amazing product, highly recommend!", date: "August 8, 2023" },
    { name: "Charlie Green", rating: 2, reviewText: "Not as expected, could be better.", date: "August 5, 2023" },
    { name: "David Black", rating: 4, reviewText: "Good, but arrived late.", date: "August 3, 2023" },
    { name: "Emily Blue", rating: 5, reviewText: "Absolutely love it!", date: "July 30, 2023" },
    { name: "Frank Red", rating: 3, reviewText: "It's fine, nothing extraordinary.", date: "July 28, 2023" },
    { name: "Grace Yellow", rating: 4, reviewText: "Pretty good, will buy again.", date: "July 25, 2023" },
    { name: "Hannah Purple", rating: 5, reviewText: "Best purchase ever!", date: "July 20, 2023" },
  ];

  const [reviews, setReviews] = useState<any[]>(initialReviews);
  const [visibleReviews, setVisibleReviews] = useState<any[]>(initialReviews.slice(0, 4)); // Initially show only 4 reviews
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    reviewText: "",
  });
  const [sortOrder, setSortOrder] = useState("Latest");
  const [showReviewForm, setShowReviewForm] = useState(false); // Toggle for review form visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({
      ...newReview,
      rating,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
    sortReviews(order);
  };

  const sortReviews = (order: string) => {
    const sortedReviews = [...reviews].sort((a, b) => {
      if (order === "Latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    setReviews(sortedReviews);
    setVisibleReviews(sortedReviews.slice(0, 4)); // Reset visible reviews when sorted
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReviewEntry = {
      ...newReview,
      date: new Date().toLocaleDateString(),
    };
    const updatedReviews = [newReviewEntry, ...reviews];
    setReviews(updatedReviews);
    setVisibleReviews(updatedReviews.slice(0, 4)); // Show only 4 reviews initially after adding
    setNewReview({
      name: "",
      rating: 0,
      reviewText: "",
    });
    setShowReviewForm(false); // Hide form after submission
  };

  const handleLoadMore = () => {
    setVisibleReviews(reviews.slice(0, visibleReviews.length + 10)); // Load next 10 reviews
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b">
        <nav className="flex justify-evenly space-x-8 py-4">
          <a href="#" className="text-gray-500 hover:text-black">Product Details</a>
          <a href="#" className="text-black border-b-2 border-black">Rating & Reviews</a>
          <a href="#" className="text-gray-500 hover:text-black">FAQs</a>
        </nav>
      </header>

      {/* Reviews Section */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Reviews ({reviews.length})</h1>
          <div className="flex space-x-4">
            <select className="border rounded px-4 py-2" value={sortOrder} onChange={handleSortChange}>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => setShowReviewForm(!showReviewForm)} // Toggle form visibility
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleReviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <h2 className="font-bold">{review.name}  <span className="ml-2">
                  <span className="text-white bg-green-500 rounded-full px-2 py-1 text-xs font-semibold">✓</span>
                </span></h2>
              <p className="text-gray-600 text-sm">&quot;{review.reviewText}&quot;</p>
              <p className="text-gray-400 text-xs mt-2">Posted on {review.date}</p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {reviews.length > 4 && (
          <div className="text-center mt-8">
            <button
              className="bg-white px-4 py-2 border rounded-full hover:bg-gray-300"
              onClick={handleLoadMore}
            >
              Load More Reviews
            </button>
          </div>
        )}

        {/* Review Form - Only visible when showReviewForm is true */}
        {showReviewForm && (
          <div id="review-form" className="mt-8">
            <h2 className="text-xl font-bold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-semibold mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer ${star <= newReview.rating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="reviewText" className="block text-sm font-semibold mb-2">
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  value={newReview.reviewText}
                  onChange={handleInputChange}
                  rows={4}
                  className="border rounded px-4 py-2 w-full"
                  required
                ></textarea>
              </div>

              <button type="submit" className="bg-black text-white px-6 py-2 rounded">
                Post Review
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
