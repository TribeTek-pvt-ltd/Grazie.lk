import { products } from "@/src/data/products"
// import ProductImage from "@/src/components/ProductImage"
import ProductInfo from "@/src/components/ProductInfo"
import Link from "next/link"


interface Props {
  params: Promise<{ id: string }>; // params is a Promise!
}

export default async function ProductDetailsPage({ params }: Props) {
  // ✅ MUST await params
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section className="container mx-auto  py-20 text-center">
        <h2 className="text-3xl font-heading font-medium text-dark mb-8">
          Product Not Found
        </h2>
        <a
          href="/products"
          className="inline-block px-8 py-4 border border-gold text-dark font-medium rounded-xl hover:bg-gold hover:text-soft transition"
        >
          Back to Collection
        </a>
      </section>
    );
  }

  return (
    <section className="section container mx-auto">
      <div className=" gap-12 items-start">
        {/* <ProductImage
          image={product.image}
          name={product.name}
        /> */}
        <ProductInfo product={product} />
      </div>
    </section>
  )
}
