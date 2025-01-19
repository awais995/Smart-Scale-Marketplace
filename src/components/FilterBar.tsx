"use client";

import React from "react";

interface FilterBarProps {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedPrice: number;
  setSelectedPrice: (price: number) => void;
  applyFilter: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  colors,
  sizes,
  priceRange,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedPrice,
  setSelectedPrice,
  applyFilter,
}) => (
  <div className="bg-white p-4 border rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4">Filters</h2>
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Category</h3>
      {categories.map((category) => (
        <div
          key={category}
          className={`cursor-pointer py-1 ${
            selectedCategory === category ? "font-bold" : ""
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
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
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Sizes</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-3 py-1 border rounded ${
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
);

export default FilterBar;
