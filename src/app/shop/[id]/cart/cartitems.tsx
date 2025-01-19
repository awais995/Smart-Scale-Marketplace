"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import products from "../../../products.json";

const CartItem = () => {
  const { productDetails } = useParams(); // Fetch `productDetails` from the URL
  const [cart, setCart] = useState<any[]>([]);

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("Stored Cart from localStorage: ", storedCart); // Log cart data for debugging
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: number) => {
    // Remove product from cart based on its ID
    const updatedCart = cart.filter((item: any) => item.id !== id);
    // Update the state and localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Updated Cart: ", updatedCart); // Log updated cart for debugging
  };

  if (cart.length === 0) {
    return <div>Your cart is empty!</div>;
  }

  return (
    <div>
      {cart.map((cartItem: any) => {
        // Find the product details from products.json for each item in the cart
        const product = products.find((item) => item.id === cartItem.id);

        if (!product) {
          return <div key={cartItem.id}>Product not found in products.json</div>;
        }

        return (
          <div key={cartItem.id} className="flex items-center justify-between border-b py-4">
            {/* Product Image */}
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
              />
              <div>
                <h2 className="text-md md:text-lg font-semibold leading-tight">{product.name}</h2>
                <p className="text-sm text-gray-500">
                  Size: <span className="text-black">{cartItem.size}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Color: <span className="text-black">{cartItem.color}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: <span className="text-black">{cartItem.quantity}</span>
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="text-md md:text-lg font-bold">${(product.price * cartItem.quantity).toFixed(2)}</div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(cartItem.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;
