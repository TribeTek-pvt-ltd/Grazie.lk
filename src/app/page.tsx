import Hero from "@/src/components/Hero"
import ProductGrid from "@/src/components/ProductGrid"
import { products } from "@/src/data/products"
import Hero2 from "../components/Hero2"
import AboutSection from "../components/AboutSection"
import HowToOrder from "../components/HowToOrder"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = products.slice(-6) // 👈 only newly added 3

  return (
    <>
     
      <Hero />
      <Hero2 />
      <AboutSection />

      <section className="section">

 <div className="container mx-auto text-center px-6 md:px-16 m-12 ">
  <h2 className="section-title">Featured Products</h2>
</div>

        <ProductGrid products={featuredProducts} />

        {/* View All button below the products */}
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
