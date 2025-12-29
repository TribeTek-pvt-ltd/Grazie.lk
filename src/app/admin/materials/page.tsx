"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layers, Plus, Edit2, Trash2 } from "lucide-react";
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

    const colors = [
        "bg-amber-600",
        "bg-gray-600",
        "bg-cyan-500",
        "bg-rose-500",
        "bg-orange-500",
        "bg-indigo-500",
    ];

    if (loading) {
        return <LoadingSpinner text="Loading materials..." />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Materials</h1>
                    <p className="text-gray-600 mt-2">Manage product materials</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Material
                </button>
            </div>

            {/* Materials Grid */}
            {materials.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <EmptyState
                        icon={Layers}
                        title="No materials yet"
                        description="Start by creating your first material type"
                        action={{
                            label: "Add Material",
                            onClick: () => setShowAddModal(true),
                        }}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((material, index) => (
                        <div
                            key={material.id}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${colors[index % colors.length]}`}>
                                    <Layers className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex gap-2">
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
                            <h3 className="text-xl font-bold text-gray-900">{material.name}</h3>
                            {material.description && (
                                <p className="text-sm text-gray-600 mt-2">{material.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Material Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Material</h2>
                        <input
                            type="text"
                            value={newMaterial.name}
                            onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                            placeholder="Material name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent mb-4"
                            autoFocus
                        />
                        <textarea
                            value={newMaterial.description}
                            onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                            placeholder="Description (optional)"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent mb-6"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddMaterial}
                                disabled={submitting || !newMaterial.name.trim()}
                                className="flex-1 bg-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
                            >
                                {submitting ? "Adding..." : "Add Material"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewMaterial({ name: "", description: "" });
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
