"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const { productDetails: id } = useParams(); // Fetch the product ID from the URL
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State to track the selected color, size, and quantity
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details");

        const data = await res.json();
        setProduct(data);
        setSelectedColor(data.colors[0]); // Default to first color
        setSelectedSize(data.sizes[0]); // Default to first size
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleColorChange = (color: string) => setSelectedColor(color);
  const handleSizeChange = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (operation: string) => {
    setQuantity((prevQuantity) => {
      if (operation === "increment" && quantity < 10) {
        return prevQuantity + 1;
      }
      if (operation === "decrement" && quantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      image: product.imageUrl,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };

    // Get the current cart from localStorage (if exists)
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add the new product to the cart (or update quantity if product already exists)
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a>
        <span className="mx-2">›</span>
        <a href="/shop" className="hover:text-gray-700">Shop</a>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Thumbnails */}
        <div className="hidden lg:flex flex-col gap-4 lg:col-span-2">
          {product.images?.map((image: string, index: number) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition"
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={90}
                height={90}
                className="w-full h-[165px] object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main Product Image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="lg:col-span-5">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Color Options */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Select Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color: string, index: number) => (
                <button
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full cursor-pointer ${
                    color === selectedColor ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Choose Size</h3>
            <div className="flex gap-3">
              {product.sizes.map((size: string, index: number) => (
                <button
                  key={index}
                  className={`border rounded-md px-4 py-2 ${
                    size === selectedSize ? "bg-gray-200" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button onClick={() => handleQuantityChange("decrement")}>-</button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-12 text-center"
              />
              <button onClick={() => handleQuantityChange("increment")}>+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
