import Link from "next/link";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
  heading?: string; // Optional heading
}

export default function ProductGrid({ products, heading = "Products" }: ProductGridProps) {
  return (
    <section className=" container m-12 mx-auto section">

      {/* Product cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
