"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotals = () => {
    let grandTotal = 0;
    const cartDetails = cart.map((item) => {
      const subtotal = item.price * item.quantity;
      const discountAmount = (item.discount || 0) * item.quantity;
      const deliveryFee = item.deliveryFee || 0;
      const total = subtotal - discountAmount + deliveryFee;
      grandTotal += total;
      return {
        ...item,
        subtotal,
        discountAmount,
        total,
      };
    });
    return { cartDetails, grandTotal };
  };

  const { cartDetails, grandTotal } = calculateTotals();

  return (
    <div className="container mx-auto px-6 py-10">
        
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="lg:w-2/3 border p-4 rounded-[30px]">
            {cart.map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex items-center justify-between border-b pb-4 mb-6"
              >
                {/* Product Image and Details */}
                <div className="flex items-center gap-6">
                  <Image
                    src={cartItem.image}
                    alt={cartItem.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md"
                    
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{cartItem.name}</h2>
                    <p className="text-sm text-gray-500">
                      Size: <span className="text-gray-800">{cartItem.size}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Color: <span className="text-gray-800">{cartItem.color}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: <span className="text-gray-800">{cartItem.quantity}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-10">
                    {/* Price */}
                <div className="text-lg font-bold text-gray-800">
                  ${cartItem.price.toFixed(2)}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromCart(cartItem.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  aria-label="Remove item from cart"
                >
                  Remove
                </button>
                </div>
                
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 border rounded-[30px]">
            <div className=" p-6 rounded-lg shadow-md ">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>
              {cartDetails.map((item) => (
                <div key={item.id} className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Quantity</span>
                    <span>{item.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold">${item.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span className="text-red-500">-${item.discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>
                      {item.deliveryFee > 0 ? `$${item.deliveryFee.toFixed(2)}` : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${item.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="flex items-center mt-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  aria-label="Enter promo code"
                />
                <button className="bg-black text-white px-4 py-2 rounded-r-md text-sm hover:bg-blue-600 transition-colors">
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <Link href={`/checkout`}>
                <button className="w-full bg-black text-white mt-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
                  Go to Checkout →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
