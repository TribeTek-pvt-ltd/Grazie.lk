"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/products/create", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("Product added successfully");
      e.currentTarget.reset();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <input name="name" placeholder="Product name" required className="w-full p-3 border rounded" />

      <input name="price" type="number" placeholder="Price" required className="w-full p-3 border rounded" />

      <input name="stock" type="number" placeholder="Stock" required className="w-full p-3 border rounded" />

      <input name="category" placeholder="Category" className="w-full p-3 border rounded" />

      <input name="material" placeholder="Material" className="w-full p-3 border rounded" />

      <textarea name="description" placeholder="Description" required className="w-full p-3 border rounded" />

      <input name="image" type="file" accept="image/*" required />

      <button disabled={loading} className="bg-gold text-soft px-6 py-3 rounded">
        {loading ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}