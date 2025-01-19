"use client";
import React from "react";
import CartItem from "./cartitems";
import OrderSummary from "./ordersummary";
import Link from "next/link";
import products from "../../../products.json";
import { useParams } from "next/navigation";

const CartPage: React.FC = () => {
  const { productDetails } = useParams(); // Fetch the `productDetails` from the URL
  const product = products.find((item) => item.id === Number(productDetails));

  // Add product to cart in localStorage
  const addToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if the product is already in the cart
    const productIndex = existingCart.findIndex((item: any) => item.id === product.id);
    if (productIndex !== -1) {
      // If the product already exists, increment the quantity
      existingCart[productIndex].quantity += 1;
    } else {
      // If not, add the new product with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:px-20">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link> &gt; <Link href={`/productpage/${product.id}`} className="hover:text-gray-700">
          Shop
        </Link> &gt;<span className="text-black font-semibold">Cart</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">YOUR CART</h1>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-4 md:p-6">
          <CartItem key={product.id} {...product} />
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4 md:p-6">
          <OrderSummary />
        </div>
      </div>

      {/* Add to Cart Button */}
      {/* <button
        onClick={() => addToCart(product)}
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default CartPage;
