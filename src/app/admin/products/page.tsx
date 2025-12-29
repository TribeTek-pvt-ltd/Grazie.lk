"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Plus, Search, Edit2, Trash2, Eye } from "lucide-react";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import EmptyState from "@/src/components/EmptyState";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id?: string;
  material_id?: string;
  created_at: string;
  images?: Array<{ image_url: string[] }>;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/list");
      const result = await res.json();

      if (res.ok && result.products) {
        setProducts(result.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/new">
          <button className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <EmptyState
            icon={Package}
            title={searchQuery ? "No products found" : "No products yet"}
            description={searchQuery ? "Try adjusting your search" : "Start by adding your first product"}
            action={!searchQuery ? {
              label: "Add Your First Product",
              onClick: () => window.location.href = "/admin/products/new",
            } : undefined}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100 relative">
                {product.images && product.images.length > 0 && product.images[0].image_url[0] ? (
                  <img
                    src={product.images[0].image_url[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gold">
                      LKR {product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/admin/products/edit/${product.id}`} className="flex-1">
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
