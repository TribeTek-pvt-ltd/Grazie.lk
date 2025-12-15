// components/ProductDetail.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderForm from "./OrderForm";
import SizeChartModal from "./SizeChartModal";
import { Truck, Package, Link2, ShoppingCart, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  material?: string;
  stock: number;
  shippingDays: number;
  sizes?: {
    size: string;
    height: string;
    width: string;
    depth?: string;
  }[];
}

export default function ProductDetail({ product }: { product: Product }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [stock, setStock] = useState(product.stock);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    if (stock <= 0) return;

    const existingCart = JSON.parse(localStorage.getItem("grazieCart") || "[]");
    const existingItem = existingCart.find((item: any) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("grazieCart", JSON.stringify(updatedCart));
    setCartCount(cartCount + 1);
    setStock(stock - 1);
    router.push("/cart");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard! 📋");
  };

  const inStock = stock > 0;
  const lowStock = stock <= 5 && stock > 0;

  return (
    <div className="min-h-screen m-12 bg-soft py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-dark/70 hover:text-dark transition mb-10 text-sm font-medium"
        >
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden  group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-heading font-semibold text-dark mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-6 py-3 bg-gold/20 text-gold rounded-full text-sm font-medium border border-gold/40">
                  {product.category}
                </span>
                {product.material && (
                  <span className="px-6 py-3 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {product.material}
                  </span>
                )}
              </div>

              <p className="text-5xl md:text-6xl font-medium text-dark mb-8">
                Rs. {product.price.toLocaleString()}
              </p>

              {/* Availability & Shipping */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gold" />
                  <span className={`font-medium ${inStock ? "text-dark" : "text-red-600"}`}>
                    {inStock ? (
                      lowStock ? (
                        <span className="text-red-600 font-bold">Only {stock} left!</span>
                      ) : (
                        `In Stock (${stock} available)`
                      )
                    ) : (
                      "Out of Stock"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gold" />
                  <span className="text-dark/80">
                    Estimated Delivery: {product.shippingDays}-7 days island-wide
                  </span>
                </div>
              </div>

              <p className="text-dark/80 text-lg md:text-xl leading-relaxed mb-12">
                {product.description}
              </p>

              {/* Size Chart */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-accent hover:text-dark underline transition font-medium"
                  >
                    View Size Chart →
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 flex items-center justify-center gap-3 py-5 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl ${
                    inStock
                      ? "bg-dark text-soft hover:bg-gold hover:text-soft"
                      : "bg-accent/20 text-accent/50 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button
                  onClick={() => setShowOrderModal(true)}
                  className="flex-1 flex items-center justify-center gap-3 bg-gold text-soft py-5 px-8 rounded-xl font-bold text-lg shadow-2xl hover:bg-dark hover:shadow-3xl transition-all duration-500"
                >
                  🪔 Order Now
                </button>
              </div>

              {/* Copy Link */}
              <div className="flex justify-end">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 text-dark/70 hover:text-dark transition font-medium"
                >
                  <Link2 size={20} />
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Badge */}
      {cartCount > 0 && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative">
            <div className="bg-dark/90 p-4 rounded-full shadow-2xl">
              <ShoppingCart className="w-12 h-12 text-gold" />
            </div>
            <span className="absolute -top-3 -right-3 bg-gold text-soft text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              {cartCount}
            </span>
          </div>
        </div>
      )}

      {/* Order Form Popup Modal */}
      {showOrderModal && (
        <div
          className="fixed inset-0 bg-dark/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowOrderModal(false)}
        >
          <div
            className="bg-soft shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-6 right-6 text-dark/60 hover:text-dark transition z-10"
              aria-label="Close order form"
            >
              <X size={28} />
            </button>

            {/* Form Content */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-dark mb-8 text-center">
                Order with Devotion
              </h2>
              <OrderForm
                productName={product.name}
                productPrice={product.price}
                productCategory={product.category}
              />
            </div>
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      {showSizeChart && product.sizes && (
        <SizeChartModal sizes={product.sizes} onClose={() => setShowSizeChart(false)} />
      )}
    </div>
  );
}