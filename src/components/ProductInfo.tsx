"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ← Import router
import OrderForm from "./OrderForm";
import SizeChartModal from "./SizeChartModal";
import { Truck, Package, Link2, ShoppingCart } from "lucide-react";

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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [stock, setStock] = useState(product.stock);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const orderFormRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // ← For navigation

  const handleOrderNow = () => {
    setShowOrderForm(true);
    setTimeout(() => {
      orderFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleAddToCart = () => {
    if (stock <= 0) return;

    // Load current cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("grazieCart") || "[]");

    // Check if product already in cart
    const existingItem = existingCart.find((item: any) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      // Increase quantity
      updatedCart = existingCart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item
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

    // Save back to localStorage
    localStorage.setItem("grazieCart", JSON.stringify(updatedCart));

    // Update UI state
    setCartCount(cartCount + 1);
    setStock(stock - 1);

    // Redirect to cart page immediately
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
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl group">
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
                  className={`flex-1 flex items-center justify-center gap-3 py-5 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl ${
                    inStock
                      ? "bg-dark text-soft hover:bg-gold hover:text-soft"
                      : "bg-accent/20 text-accent/50 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                {!showOrderForm && (
                  <button
                    onClick={handleOrderNow}
                    className="flex-1 flex items-center justify-center gap-3 bg-gold text-soft py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:bg-dark hover:shadow-3xl transition-all duration-500"
                  >
                    🪔 Order Now
                  </button>
                )}
              </div>

              {/* Copy Link - Aligned to the right */}
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

            {/* Order Form */}
            {showOrderForm && (
              <div ref={orderFormRef} className="animate-fadeIn">
                <OrderForm
                  productName={product.name}
                  productPrice={product.price}
                  productCategory={product.category}
                />
              </div>
            )}
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

      {/* Size Chart Modal */}
      {showSizeChart && product.sizes && (
        <SizeChartModal sizes={product.sizes} onClose={() => setShowSizeChart(false)} />
      )}

      {/* Fade Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}