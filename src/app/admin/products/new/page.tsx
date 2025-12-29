import ProductForm from "@/src/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Create a new product for your inventory</p>
      </div>

      <ProductForm />
    </div>
  );
}
