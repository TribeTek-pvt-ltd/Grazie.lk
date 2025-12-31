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

      <section className="section bg-white">
        <div className="container mx-auto text-center px-6 md:px-16 mt-20 mb-12">
          <h2 className="section-title">Sacred Highlights</h2>
          <p className="text-accent mt-2 italic font-body">Handpicked selection of our finest offerings</p>
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
            className="px-10 py-4 bg-dark text-soft rounded-xl hover:bg-opacity-90 transition font-bold tracking-widest uppercase text-xs"
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
