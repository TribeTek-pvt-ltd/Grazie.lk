"use client";

import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductTable() {
  const { data, error } = useSWR("/api/products/list", fetcher);

  if (error) return <p>Error loading products</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <table className="w-full bg-white shadow ">
      <thead className="bg-base text-left">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Price</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.data.map((product: any) => (
          <tr key={product.id} className="border-t">
            <td className="p-3">{product.name}</td>
            <td className="p-3">Rs. {product.price}</td>
            <td className="p-3 flex gap-3">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <form action="/api/products/delete" method="POST">
                <input type="hidden" name="id" value={product.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
