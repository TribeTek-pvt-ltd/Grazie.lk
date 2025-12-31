import ProductInfo from "@/src/components/ProductInfo"
import { headers } from "next/headers";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  try {
    const res = await fetch(`${protocol}://${host}/api/products/get/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch product error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description?.substring(0, 160) || `Buy ${product.name} from Grazie.lk. Premium pooja items delivered island-wide.`,
    openGraph: {
      title: product.name,
      description: product.description?.substring(0, 160),
      images: product.images?.[0]?.image_url?.[0] ? [product.images[0].image_url[0]] : [],
    },
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <section className="container mx-auto py-20 text-center">
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
      <div className="gap-12 items-start">
        <ProductInfo product={product} />
      </div>
    </section>
  )
}
