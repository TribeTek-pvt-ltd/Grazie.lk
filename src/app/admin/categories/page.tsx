"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FolderTree, Plus, Edit2, Trash2 } from "lucide-react";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import EmptyState from "@/src/components/EmptyState";

interface Category {
    id: string;
    name: string;
    description?: string;
    created_at: string;
}

export default function CategoriesPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const result = await res.json();
            if (res.ok) {
                setCategories(result.data || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            });

            if (res.ok) {
                setNewCategory({ name: "", description: "" });
                setShowAddModal(false);
                fetchCategories();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to create category");
            }
        } catch (error) {
            alert("Error creating category");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`/api/categories?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchCategories();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to delete category");
            }
        } catch (error) {
            alert("Error deleting category");
        }
    };

    const colors = [
        "bg-blue-500",
        "bg-purple-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];

    if (loading) {
        return <LoadingSpinner text="Loading categories..." />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 mt-2">Manage product categories</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            {categories.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <EmptyState
                        icon={FolderTree}
                        title="No categories yet"
                        description="Start by creating your first product category"
                        action={{
                            label: "Add Category",
                            onClick: () => setShowAddModal(true),
                        }}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${colors[index % colors.length]}`}>
                                    <FolderTree className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                        <Edit2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                            {category.description && (
                                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Category</h2>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="Category name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent mb-4"
                            autoFocus
                        />
                        <textarea
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            placeholder="Description (optional)"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent mb-6"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddCategory}
                                disabled={submitting || !newCategory.name.trim()}
                                className="flex-1 bg-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
                            >
                                {submitting ? "Adding..." : "Add Category"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewCategory({ name: "", description: "" });
                                }}
                                disabled={submitting}
                                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
