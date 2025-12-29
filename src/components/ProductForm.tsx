"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
    initialData?: {
        name: string;
        description: string;
        price: number;
        stock: number;
        category: string;
        material: string;
    };
    onSubmit?: (formData: FormData) => Promise<void>;
    submitLabel?: string;
}

export default function ProductForm({
    initialData,
    onSubmit,
    submitLabel = "Create Product"
}: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData?.price?.toString() || "",
        stock: initialData?.stock?.toString() || "",
        category: initialData?.category || "",
        material: initialData?.material || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const form = e.target as HTMLFormElement;
            const data = new FormData(form);

            if (onSubmit) {
                await onSubmit(data);
            } else {
                // Default submit to create API
                const res = await fetch("/api/products/create", {
                    method: "POST",
                    body: data,
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.error || "Failed to create product");
                }

                alert("Product created successfully!");
                router.push("/admin/products");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Details</h2>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        placeholder="Enter product name"
                        disabled={loading}
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition resize-none"
                        placeholder="Enter product description"
                        disabled={loading}
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (LKR) *
                    </label>
                    <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        placeholder="0.00"
                        disabled={loading}
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stock Quantity *
                    </label>
                    <input
                        type="number"
                        name="stock"
                        required
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        placeholder="0"
                        disabled={loading}
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        disabled={loading}
                    >
                        <option value="">Select category</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Decor">Decor</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                {/* Material */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Material
                    </label>
                    <select
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        disabled={loading}
                    >
                        <option value="">Select material</option>
                        <option value="Wood">Wood</option>
                        <option value="Metal">Metal</option>
                        <option value="Glass">Glass</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Ceramic">Ceramic</option>
                        <option value="Plastic">Plastic</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Image *
                    </label>
                    <input
                        type="file"
                        name="image"
                        required={!initialData}
                        accept="image/*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold file:text-white file:cursor-pointer hover:file:bg-opacity-90"
                        disabled={loading}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Supported formats: JPG, PNG, WebP (Max 5MB)
                    </p>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : submitLabel}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
