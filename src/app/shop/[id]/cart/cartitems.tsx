"use client";

import { useEffect, useState } from "react";

const CartItem = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item: any) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (loading) return <div>Loading...</div>;

  if (cart.length === 0) return <div>Your cart is empty!</div>;

  return (
    <div>
      {cart.map((cartItem: any) => {
        // Find product details from the fetched products array
        const product = products.find((item: any) => item._id === cartItem.id);

        if (!product) {
          return <div key={cartItem.id}>Product not found</div>;
        }

        return (
          <div key={cartItem.id} className="flex items-center justify-between border-b py-4">
            {/* Product Image */}
            <div className="flex items-center gap-4">
              <img
                src={product.imageUrl}
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
            <div className="text-md md:text-lg font-bold">
              ${(product.price * cartItem.quantity).toFixed(2)}
            </div>

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
