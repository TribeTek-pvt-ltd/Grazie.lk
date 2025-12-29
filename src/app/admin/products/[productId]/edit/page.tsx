import EditProductForm from "@/src/components/EditProductForm";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <EditProductForm productId={params.id} />
    </div>
  );
}
