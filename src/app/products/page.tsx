"use client";

import { useState, useEffect } from "react";
import { Package, Search, SlidersHorizontal, X } from "lucide-react";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import ProductCard from "@/src/components/ProductCard";
import FilterBar from "@/src/components/FilterBar";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  Category?: { Category: string };
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
    <div className="min-h-screen bg-base pb-20">
      <div className="bg-dark py-12 px-4 shadow-2xl border-b border-gold/30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-soft mb-2 font-heading tracking-wide">Sacred Collection</h1>
          <p className="text-accent italic font-body">Discover curated premium artifacts for your spiritual journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          categories={categories}
          materials={materials}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearFilters={clearFilters}
          resultsCount={filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-8">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300">
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
