"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, ChevronRight, RotateCcw } from "lucide-react";

interface FilterBarProps {
  categories: { id: string; name: string }[];
  materials: { id: string; name: string }[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (name: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  resultsCount: number;
}

export default function FilterBar({
  categories,
  materials,
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchQuery,
  setSearchQuery,
  clearFilters,
  resultsCount,
}: FilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedMaterial ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-10">
      {/* Search */}
      <div>
        <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] mb-4 font-body">Search Products</h3>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-soft border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-all placeholder:text-accent/50 text-dark"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] font-body">Categories</h3>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory("")} className="text-[10px] text-gold uppercase tracking-wider font-bold hover:underline">Clear</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 border ${selectedCategory === cat.id
                  ? "bg-gold text-soft border-gold shadow-md"
                  : "bg-soft/50 text-accent border-gold/10 hover:border-gold/30"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] font-body">Materials</h3>
          {selectedMaterial && (
            <button onClick={() => setSelectedMaterial("")} className="text-[10px] text-gold uppercase tracking-wider font-bold hover:underline">Clear</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelectedMaterial(selectedMaterial === mat.name ? "" : mat.name)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 border ${selectedMaterial === mat.name
                  ? "bg-gold text-soft border-gold shadow-md"
                  : "bg-soft/50 text-accent border-gold/10 hover:border-gold/30"
                }`}
            >
              {mat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-dark uppercase tracking-[0.2em] font-body">Price Range (LKR)</h3>
          {(minPrice || maxPrice) && (
            <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="text-[10px] text-gold uppercase tracking-wider font-bold hover:underline">Clear</button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50 text-xs">Min</span>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-soft border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-all text-sm text-dark"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50 text-xs">Max</span>
            <input
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-soft border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-all text-sm text-dark"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full py-4 mt-10 bg-dark text-soft rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gold transition-all duration-500 shadow-lg group"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-120deg] transition-transform duration-500" />
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full mb-10">
      {/* Horizontal Bar (Desktop) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-6 bg-soft/50 backdrop-blur-md border border-gold/20 rounded-2xl shadow-sm">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-dark text-soft rounded-xl shadow-lg hover:bg-gold transition-all duration-300 group"
        >
          <SlidersHorizontal className="w-4 h-4 text-gold group-hover:text-soft" />
          <span className="font-bold text-sm uppercase tracking-widest">Filter & Search</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 flex items-center justify-center bg-gold text-soft text-[10px] rounded-full font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Discovery</span>
            <span className="text-dark font-heading text-lg">
              {resultsCount} <span className="text-accent font-body text-sm italic">Items found</span>
            </span>
          </div>
          <div className="h-10 w-px bg-gold/20 hidden md:block"></div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Currency</span>
            <span className="text-dark font-medium">LKR (Rs.)</span>
          </div>
        </div>
      </div>

      {/* Mobile/Side Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-dark/40 backdrop-blur-sm z-[100] transition-all duration-500 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-base shadow-3xl transform transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-8 border-b border-gold/10">
            <div>
              <h2 className="text-2xl font-heading text-dark">Refine Selection</h2>
              <p className="text-xs text-accent uppercase tracking-widest mt-1 italic">Grazie.lk Premium Filter</p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-3 bg-soft text-dark hover:bg-gold hover:text-soft transition-all rounded-full shadow-inner"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <FilterContent />
          </div>

          {/* Drawer Footer */}
          <div className="p-8 border-t border-gold/10 bg-soft/30">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-5 bg-gold text-soft rounded-xl font-bold font-heading text-lg shadow-xl hover:bg-dark transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              Show {resultsCount} Items
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
