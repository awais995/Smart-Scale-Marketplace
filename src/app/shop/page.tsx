"use client";

import React, { useState, useEffect } from "react";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Link from "next/link"; // Import Link from Next.js

const CategoryPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories] = useState(["T-Shirts", "Hoodies", "Jeans", "Shirts"]);
  const [colors] = useState(["red", "blue", "green", "black", "white"]);
  const [sizes] = useState(["S", "M", "L", "XL"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  const applyFilter = () => {
    const filtered = products.filter(
      (product) =>
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedColor || product.colors.includes(selectedColor)) &&
        (!selectedSize || product.sizes.includes(selectedSize)) &&
        product.price <= selectedPrice
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4 py-8">
      <aside className="w-full lg:w-1/4">
        <FilterBar
          categories={categories}
          colors={colors}
          sizes={sizes}
          priceRange={priceRange}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          applyFilter={applyFilter}
        />
      </aside>
      <section className="w-full lg:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Link key={product._id} href={`/shop/${product._id}`}>
              <ProductCard
                image={product.imageUrl}
                title={product.name}
                rating={4}
                reviews={100}
                price={product.price}
                originalPrice={product.price * 1.2}
                discount={product.discountPercent}
              />
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default CategoryPage;
