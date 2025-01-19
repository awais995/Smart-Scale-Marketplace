"use client";

import React from "react";

const ProductReviews: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
    <div className="grid grid-cols-1 gap-6">
      {Array(3).fill("").map((_, index) => (
        <div key={index} className="p-4 border rounded shadow-sm">
          <h3 className="font-medium">Reviewer Name</h3>
          <p className="text-gray-600">"Amazing product, loved it!"</p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">⭐</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductReviews;
