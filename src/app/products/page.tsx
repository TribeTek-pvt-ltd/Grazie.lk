"use client";

import { useState, useEffect } from "react";
import { Package, Search, SlidersHorizontal, X } from "lucide-react";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import ProductCard from "@/src/components/ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  material?: string;
  images?: Array<{ image_url: string[] }>;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [materials, setMaterials] = useState<{ id: string; name: string }[]>([]);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchFilterData();
  }, []);

  const fetchFilterData = async () => {
    try {
      const [catsRes, matsRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/materials")
      ]);

      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData.data || []);
      }

      if (matsRes.ok) {
        const matsData = await matsRes.json();
        setMaterials(matsData.data || []);
      }
    } catch (error) {
      console.error("Error fetching filter data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/public");
      const data = await res.json();

      if (res.ok && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesMaterial = selectedMaterial === "" || product.material === selectedMaterial;

    const productPrice = product.price;
    const matchesMinPrice = minPrice === "" || productPrice >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || productPrice <= parseFloat(maxPrice);

    return matchesSearch && matchesCategory && matchesMaterial && matchesMinPrice && matchesMaxPrice;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedMaterial("");
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <LoadingSpinner text="Loading products..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-dark mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our curated premium collection</p>
      </div>
      {/* </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Toggle Button (All Screens) */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-dark px-6 py-3 rounded-xl shadow-sm border border-gray-100 text-base font-semibold hover:border-gold transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className="text-sm font-medium text-base text-dark px-4 py-2">
            {filteredProducts.length} items found
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className={`${showFilters ? 'block animate-in fade-in slide-in-from-left duration-300' : 'hidden'} w-full lg:w-64 space-y-8`}>
            {/* Search (Sidebar) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find something..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm transition"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Category</h3>
                {selectedCategory && (
                  <button onClick={() => setSelectedCategory("")} className="text-xs text-gold hover:underline">Clear</button>
                )}
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.id
                      ? "bg-gold text-white font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Material</h3>
                {selectedMaterial && (
                  <button onClick={() => setSelectedMaterial("")} className="text-xs text-gold hover:underline">Clear</button>
                )}
              </div>
              <div className="space-y-2">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(selectedMaterial === mat.name ? "" : mat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedMaterial === mat.name
                      ? "bg-gold text-white font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Price Range</h3>
                {(minPrice || maxPrice) && (
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="text-xs text-gold hover:underline">Clear</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gold outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gold outline-none"
                />
              </div>
            </div>

            {/* Reset All */}
            {(selectedCategory || selectedMaterial || searchQuery || minPrice || maxPrice) && (
              <button
                onClick={clearFilters}
                className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-dark/90 transition flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Reset All Filters
              </button>
            )}
          </div>

          {/* Product Listing */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                <h3 className="text-2xl font-bold text-dark mb-2">
                  No products match your criteria
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid grid-cols-2 md:grid-cols-3 ${showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 transition-all duration-300`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product as any} />
                  ))}
                </div>

                {/* Results Count */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                  <p>Showing {filteredProducts.length} of {products.length} products</p>
                  <p>Prices in LKR</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
