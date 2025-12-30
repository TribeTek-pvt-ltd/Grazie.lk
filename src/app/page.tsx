"use client";

import { useEffect, useState } from "react";
import Hero from "@/src/components/Hero"
import ProductGrid from "@/src/components/ProductGrid"
import Hero2 from "../components/Hero2"
import AboutSection from "../components/AboutSection"
import HowToOrder from "../components/HowToOrder"
import Link from "next/link"
import LoadingSpinner from "@/src/components/LoadingSpinner";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/public");
        const data = await res.json();
        if (res.ok && data.products) {
          setProducts(data.products.slice(0, 6)); // Display last 6 products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <Hero2 />
      <AboutSection />

      <section className="section">
        <div className="container mx-auto text-center px-6 md:px-16 m-12 ">
          <h2 className="section-title">Featured Products</h2>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner text="Loading featured products..." />
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="px-8 py-3 border border-dark text-dark rounded-xl hover:bg-dark hover:text-soft transition"
          >
            View All
          </Link>
          <HowToOrder />
        </div>
      </section>
    </>
  )
}
