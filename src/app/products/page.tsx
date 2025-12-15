"use client";

import { useState } from "react";
import { products } from "@/src/data/products";
import ProductGrid from "@/src/components/ProductGrid";
import FilterBar from "@/src/components/FilterBar";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, Infinity] as [number, number],
    material: "All",
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (filters.category !== "All" && p.category !== filters.category) return false;
    if (
      p.price < filters.priceRange[0] ||
      (filters.priceRange[1] !== Infinity && p.price > filters.priceRange[1])
    )
      return false;
    return true;
  });

  return (
    <section className="section mt-12">
      <h2 className="section-title text-center mb-6">Our Products</h2>

      {/* Toggle Filters Button */}
      <div className="flex justify-start px-24 mb-6">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="
      flex items-center gap-2
      px-6 py-3 rounded-xl font-medium
      border border-gold text-dark
      hover:bg-gold hover:text-soft
      transition-all duration-300 shadow-sm
    "
  >
     <span>
      {showFilters ? "Hide Filters" : "Show Filters"}
    </span>

    {/* Filter Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-8.586L3.293 6.707A1 1 0 013 6V4z"
      />
    </svg>

  </button>
</div>



      {/* Filters */}
      {showFilters && (
        <div className="mb-10">
          <FilterBar setFilter={setFilters} />
        </div>
      )}

      {/* Products */}
      <ProductGrid products={filteredProducts} heading="Our Collection" />
    </section>
  );
}
