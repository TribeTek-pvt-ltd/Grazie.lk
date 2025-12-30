"use client";

import { useEffect, useState, use } from "react";
import ProductForm from "@/src/components/ProductForm";
import LoadingSpinner from "@/src/components/LoadingSpinner";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/get/${productId}`);
        const result = await res.json();
        if (res.ok) {
          setProduct(result.data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleUpdate = async (formData: FormData) => {
    formData.append("id", productId);
    const res = await fetch(`/api/products/update/${productId}`, {
      method: "PUT",
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || "Failed to update product");
    }
  };

  if (loading) return <LoadingSpinner text="Loading product details..." />;
  if (!product) return <div className="p-8 text-center text-red-600">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600">Update product information and images</p>
      </div>
      <ProductForm
        initialData={{
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category_id,
          material: product.material,
          delivey_days: product.delivey_days,
        }}
        onSubmit={handleUpdate}
        submitLabel="Update Product"
      />
    </div>
  );
}
