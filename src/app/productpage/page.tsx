"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("green");
  const [selectedSize, setSelectedSize] = useState<string>("Large");
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedPrice, setSelectedPrice] = useState<number>(1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  const colors = ["green", "yellow", "orange", "blue", "black", "pink", "white"];
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodies", "Jeans"];

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Adjust the API endpoint as per configuration
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        // Set price range dynamically based on the fetched products
        const prices = data.map((product: any) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
        setSelectedPrice(maxPrice);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to sort products based on the selected criteria
  const sortedProducts = () => {
    let sorted = [...filteredProducts];
    if (sortBy === "Price: Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  // Function to filter products by category and price range
  const applyFilter = () => {
    const filtered = products.filter(
      (product) =>
        (!selectedCategory || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= selectedPrice
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Function to calculate products for the current page
  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return sortedProducts().slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
      {/* Sidebar Section */}
      <div className="w-full lg:w-1/4 xl:w-1/5">
        <div className="flex items-center p-2 lg:p-4 mt-2 lg:mt-0">
          <div>
            <Link href="/">Home</Link>
          </div>
          <GoChevronRight />
          <div>Casual</div>
        </div>

        {/* Sidebar */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Categories */}
          <div id="category" className="mb-4">
            {categories.map((category) => (
              <div
                key={category}
                className={`flex justify-between py-2 cursor-pointer hover:text-black ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
                <GoChevronRight />
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price</h3>
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${selectedPrice}</span>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Colors</h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    selectedColor === color ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded text-sm ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-black text-white py-2 rounded"
            onClick={applyFilter}
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="w-full lg:w-3/4 xl:w-4/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Casual</h1>
          <div className="text-sm text-gray-500">
            Showing {paginatedProducts().length} of {filteredProducts.length} Products
            <select
              className="ml-2 border border-gray-300 rounded px-2 py-1"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {paginatedProducts().map((product) => (
            <Link key={product._id} href={`/productpage/${product._id}`}>
              <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={192}
                  height={192}
                  className="w-full h-72 object-cover rounded"
                />
                <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
                <div className="mt-4">
                  <span className="text-lg font-bold">${product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
