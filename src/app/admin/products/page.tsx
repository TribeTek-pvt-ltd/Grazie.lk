"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Plus, Search, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
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
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold text-gold uppercase tracking-wide">Inventory</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/new">
          <button className="bg-gold text-white px-5 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <EmptyState
            icon={Package}
            title={searchQuery ? "No products found" : "No products yet"}
            description={searchQuery ? "Try adjusting your search terms" : "Start building your inventory by adding your first product"}
            action={!searchQuery ? {
              label: "Add Your First Product",
              onClick: () => window.location.href = "/admin/products/new",
            } : undefined}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-amber-50 to-yellow-50 relative overflow-hidden">
                {product.images && product.images.length > 0 && product.images[0].image_url[0] ? (
                  <img
                    src={product.images[0].image_url[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-amber-200" />
                  </div>
                )}
                {/* Stock Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 10
                    ? 'bg-green-100 text-green-700'
                    : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-2xl font-bold text-gold">
                      LKR {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                    <button className="w-full bg-amber-50 text-amber-700 py-2 px-3 rounded-lg hover:bg-amber-100 transition flex items-center justify-center gap-2 text-sm font-medium">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      {filteredProducts.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </div>
  );
}
