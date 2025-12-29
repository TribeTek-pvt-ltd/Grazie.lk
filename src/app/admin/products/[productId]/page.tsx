import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (res.status === 401) {
    // not logged in → redirect handled by middleware/layout
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function AdminProductView({
  params,
}: {
  params: { id: string };
}) {
  const result = await getProduct(params.id);

  if (!result || !result.data) {
    notFound();
  }

  const product = result.data;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        className="w-80 rounded-xl shadow mb-6"
      />

      <p className="mb-3">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="mb-3">
        <strong>Price:</strong> Rs. {product.price}
      </p>
      <p className="mb-6">
        <strong>Description:</strong> {product.description}
      </p>

      <a
        href={`/admin/products/${product.id}/edit`}
        className="bg-gold text-soft px-6 py-3 rounded-lg hover:bg-dark transition inline-block"
      >
        Edit Product
      </a>
    </div>
  );
}
