import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
  heading?: string;
}

export default function ProductGrid({
  products,
  heading = "Products",
}: ProductGridProps) {
  return (
    <section className="container mx-auto m-12 section">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
