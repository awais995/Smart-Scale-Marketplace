"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity/lib/image";

export const RelatedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Shuffle the products array randomly
        const shuffledProducts = data.sort(() => Math.random() - 0.5);

        // Select only the first 4 products
        setProducts(shuffledProducts.slice(0, 4));
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    }
    fetchProducts();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">You Might Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/shop/${product._id}`}>
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition h-[480px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={192}
                height={192}
                className="w-full h-72 object-cover rounded"
              />
              <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  {"★".repeat(Math.floor(product.rating || 0))}
                  {"☆".repeat(5 - Math.floor(product.rating || 0))}
                </span>
                <span className="ml-2 text-sm text-gray-500">{product.rating || 0}/5</span>
              </div>
              <div className="mt-4">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm line-through text-gray-500">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
