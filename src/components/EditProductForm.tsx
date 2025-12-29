"use client";

import { useEffect, useState } from "react";

export default function EditProductForm({ productId }: { productId: string }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/list?id=${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data.data));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/products/update", {
      method: "POST",
      body: formData,
    });

    if (res.ok) alert("Product updated");
    else alert("Update failed");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <input type="hidden" name="id" value={productId} />

      <input
        name="name"
        defaultValue={product.name}
        className="w-full p-3 border rounded"
      />

      <input
        name="price"
        type="number"
        defaultValue={product.price}
        className="w-full p-3 border rounded"
      />

      <textarea
        name="description"
        defaultValue={product.description}
        className="w-full p-3 border rounded"
      />

      <button className="bg-gold text-soft px-6 py-3 rounded font-semibold">
        Update Product
      </button>
    </form>
  );
}
