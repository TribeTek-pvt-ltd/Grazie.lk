"use client";

import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function EditForm({ product }: any) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const update = async (e: any) => {
    e.preventDefault();

    await supabase
      .from("products")
      .update({ name, price })
      .eq("id", product.id);

    router.push("/admin/products");
  };

  return (
    <form
      onSubmit={update}
      className="max-w-lg bg-white p-6 shadow rounded"
    >
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <input
        className="w-full p-2 border mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-2 border mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="bg-black text-white px-3 py-2">
        Update
      </button>
    </form>
  );
}
