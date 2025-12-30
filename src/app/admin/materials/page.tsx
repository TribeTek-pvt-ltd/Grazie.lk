"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layers, Plus, Edit2, Trash2, Search } from "lucide-react";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import EmptyState from "@/src/components/EmptyState";

interface Material {
    id: string;
    name: string;
    description?: string;
    created_at: string;
}

export default function MaterialsPage() {
    const router = useRouter();
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ name: "", description: "" });
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await fetch("/api/materials");
            const result = await res.json();
            if (res.ok) {
                setMaterials(result.data || []);
            }
        } catch (error) {
            console.error("Error fetching materials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMaterial = async () => {
        if (!newMaterial.name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch("/api/materials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMaterial),
            });

            if (res.ok) {
                setNewMaterial({ name: "", description: "" });
                setShowAddModal(false);
                fetchMaterials();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to create material");
            }
        } catch (error) {
            alert("Error creating material");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this material?")) return;

        try {
            const res = await fetch(`/api/materials?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchMaterials();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to delete material");
            }
        } catch (error) {
            alert("Error deleting material");
        }
    };

    const filteredMaterials = materials.filter(mat =>
        mat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const colors = [
        "bg-amber-700",
        "bg-yellow-700",
        "bg-orange-600",
        "bg-amber-600",
        "bg-yellow-600",
        "bg-orange-700",
    ];

    if (loading) {
        return <LoadingSpinner text="Loading materials..." />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-5 h-5 text-gold" />
                        <span className="text-sm font-semibold text-gold uppercase tracking-wide">Organization</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Materials</h1>
                    <p className="text-gray-600">Define and manage material types</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gold text-white px-5 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Material
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search materials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* Materials Grid */}
            {filteredMaterials.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <EmptyState
                        icon={Layers}
                        title={searchQuery ? "No materials found" : "No materials yet"}
                        description={searchQuery ? "Try adjusting your search" : "Start by creating your first material type"}
                        action={!searchQuery ? {
                            label: "Add Material",
                            onClick: () => setShowAddModal(true),
                        } : undefined}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMaterials.map((material, index) => (
                        <div
                            key={material.id}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden"
                        >
                            <div className={`h-1 ${colors[index % colors.length]}`}></div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${colors[index % colors.length]} bg-opacity-10`}>
                                        <Layers className={`w-5 h-5 ${colors[index % colors.length].replace('bg-', 'text-')}`} />
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(material.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{material.name}</h3>
                                {material.description && (
                                    <p className="text-sm text-gray-600">{material.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Material Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-bold text-gray-900">Add New Material</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Material Name *
                                </label>
                                <input
                                    type="text"
                                    value={newMaterial.name}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                                    placeholder="e.g., Wood"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={newMaterial.description}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                                    placeholder="Brief description of this material"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
                            <button
                                onClick={handleAddMaterial}
                                disabled={submitting || !newMaterial.name.trim()}
                                className="flex-1 bg-gold text-white py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Adding..." : "Add Material"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewMaterial({ name: "", description: "" });
                                }}
                                disabled={submitting}
                                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
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
