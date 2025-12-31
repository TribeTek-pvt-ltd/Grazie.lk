"use client";

import { useState } from "react";
import { Star, X, Loader2 } from "lucide-react";

interface TestimonialFormProps {
    initialData?: {
        id?: string;
        name: string;
        content: string;
        rating: number;
        isActive: boolean;
    };
    onSuccess: () => void;
    onCancel: () => void;
}

export default function TestimonialForm({ initialData, onSuccess, onCancel }: TestimonialFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        content: initialData?.content || "",
        rating: initialData?.rating || 5,
        isActive: initialData?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData?.id
                ? `/api/testimonials/admin/update/${initialData.id}`
                : "/api/testimonials/admin/create";

            const method = initialData?.id ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save testimonial");

            onSuccess();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Failed to save testimonial. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-xl font-heading font-bold text-dark">
                    {initialData?.id ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
                <button type="button" onClick={onCancel} className="text-gray-400 hover:text-dark">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                        placeholder="e.g. Nimal Perera"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review Content</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition resize-none"
                        placeholder="Describe the customer's experience..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className={`p-1 transition-colors ${formData.rating >= star ? "text-gold" : "text-gray-200"}`}
                            >
                                <Star className="w-8 h-8 fill-current" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Visible on storefront</label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-dark text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData?.id ? "Update Testimonial" : "Create Testimonial"}
                </button>
            </div>
        </form>
    );
}
