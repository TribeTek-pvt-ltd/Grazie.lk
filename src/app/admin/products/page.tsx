"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/list")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-gold text-soft px-6 py-3 rounded-lg font-semibold hover:bg-dark transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-base border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-base/50">
                <td className="p-4">
                  <img
                    src={p.product_images?.[0]?.image_url || "/placeholder.png"}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">Rs. {p.price}</td>
                <td className="p-4 flex gap-3">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-gold hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
