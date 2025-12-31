"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
    initialData?: {
        name: string;
        description: string;
        price: number;
        stock: number;
        category: string;
        material: string;
        delivey_days?: number;
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
        delivey_days: initialData?.delivey_days?.toString() || "",
    });

    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [materials, setMaterials] = useState<{ id: string; name: string }[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, materialsRes] = await Promise.all([
                    fetch("/api/categories"),
                    fetch("/api/materials"),
                ]);

                if (categoriesRes.ok) {
                    const categoriesData = await categoriesRes.json();
                    setCategories(categoriesData.data || []);
                }

                if (materialsRes.ok) {
                    const materialsData = await materialsRes.json();
                    setMaterials(materialsData.data || []);
                }
            } catch (err) {
                console.error("Error fetching form data:", err);
            }
        };

        fetchData();
    }, []);

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

                {/* Delivery Days */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Days
                    </label>
                    <input
                        type="number"
                        name="delivey_days"
                        min="0"
                        value={formData.delivey_days}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                        placeholder="e.g. 3"
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
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Material */}
                <div className="md:col-span-2">
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
                        {materials.map((mat) => (
                            <option key={mat.id} value={mat.id}>
                                {mat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Images *
                    </label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        required={!initialData}
                        accept="image/*"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
                                setImagePreviews(newPreviews);
                            }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold file:text-white file:cursor-pointer hover:file:bg-opacity-90"
                        disabled={loading}
                    />
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Supported formats: JPG, PNG, WebP (Max 5MB each). You can select multiple images.
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
