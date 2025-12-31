"use client";

import { useEffect, useState } from "react";
import Hero from "@/src/components/Hero"
import ProductGrid from "@/src/components/ProductGrid"
import Hero2 from "../components/Hero2"
import AboutSection from "../components/AboutSection"
import HowToOrder from "../components/HowToOrder"
import Link from "next/link"
import LoadingSpinner from "@/src/components/LoadingSpinner";
import TestimonialSection from "@/src/components/TestimonialSection";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/public");
        const data = await res.json();
        if (res.ok && data.products) {
          setProducts(data.products.slice(0, 4)); // Display featured products
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

      <section className="section py-20 md:py-28 bg-gradient-to-b from-white via-white to-soft/30 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        <div className="container mx-auto text-center px-6 md:px-16 mt-20 mb-12">
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-2 block">Our Curated Collection</span>
          <h2 className="section-title text-4xl md:text-5xl drop-shadow-sm">Sacred Highlights</h2>
          <p className="text-accent mt-3 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Handpicked selection of our finest offerings, crafted for your spiritual journey
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner text="Loading featured products..." />
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid products={products} />
          </div>
        )}

        <div className="text-center mt-12 mb-20">
          <Link
            href="/products"
            className="px-12 py-4 border border-dark text-dark rounded-md hover:bg-dark hover:text-white transition-all duration-300 font-bold tracking-widest uppercase text-xs hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore Full Collection
          </Link>
        </div>
      </section>

      <TestimonialSection />

      <HowToOrder />
    </>
  )
}
