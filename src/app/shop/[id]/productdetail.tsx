"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorChange = (color: string) => setSelectedColor(color);
  const handleSizeChange = (size: string) => setSelectedSize(size);

  const handleQuantityChange = (operation: string) => {
    setQuantity((prevQuantity) => {
      if (operation === "increment" && prevQuantity < 10) {
        return prevQuantity + 1;
      }
      if (operation === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setNotification("Please select a color and size.");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = existingCart.findIndex(
      (item: any) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingProductIndex > -1) {
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setNotification("Successfully added to cart");
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link> &gt;{" "}
        <Link href="/shop" className="hover:text-black">Shop</Link> &gt;{" "}
        <span className="text-gray-700">{product.name}</span>
      </nav>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ alignItems: "start" }}>
        {/* Thumbnail Bar */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="grid gap-4">
            {product.imageslist.map((image: string, index: number) => (
              <div key={index} className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition">
                <Image
                  src={urlFor(image).url()}
                  alt={`Thumbnail ${index + 1}`}
                  width={720}
                  height={720}
                  className="w-full h-[150px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Product Image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="border rounded-lg p-4 bg-gray-50 w-[450px] max-w-md">
            <Image
              src={urlFor(product.image).url()}
              alt="Main Product Image"
              width={1080}
              height={1080}
              className="w-full h-[450px] object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-5">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="mb-2">
              <h3 className="text-lg font-medium mb-2">Select Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color: string) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer border ${
                      selectedColor === color ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Choose Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-4 py-2 border rounded hover:bg-gray-100 ${
                      selectedSize === size ? "bg-gray-300" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          {/* <Link href="/cart"> */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full sm:w-auto"
            >
            Add to Cart
          </button>
          {/* </Link> */}

          {notification && (
            <div className="mt-4 text-green-600 font-semibold">{notification}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
