"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Star, MessageSquareQuote, Check, X, Loader2, Sparkles, Filter } from "lucide-react";
import TestimonialForm from "@/src/components/TestimonialForm";
import LoadingSpinner from "@/src/components/LoadingSpinner";

interface Testimonial {
    id: string;
    name: string;
    content: string;
    rating: number;
    isActive: boolean;
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials/admin/list");
            const data = await res.json();
            if (res.ok) setTestimonials(data.data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials/admin/delete/${id}`, { method: "DELETE" });
            if (res.ok) {
                setTestimonials(testimonials.filter((t) => t.id !== id));
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    const toggleStatus = async (testimonial: Testimonial) => {
        try {
            const res = await fetch(`/api/testimonials/admin/update/${testimonial.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !testimonial.isActive }),
            });

            if (res.ok) {
                setTestimonials(testimonials.map((t) =>
                    t.id === testimonial.id ? { ...t, isActive: !t.isActive } : t
                ));
            }
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-8 mt-10">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-gold" />
                        <span className="text-sm font-semibold text-gold uppercase tracking-wide">Community</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Testimonials</h1>
                    <p className="text-gray-600">Manage customer reviews and feedback</p>
                </div>
                <button
                    onClick={() => {
                        setEditingTestimonial(null);
                        setIsFormOpen(true);
                    }}
                    className="bg-dark text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Active on Site</p>
                    <p className="text-2xl font-bold text-green-600">
                        {testimonials.filter(t => t.isActive).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Average Rating</p>
                    <p className="text-2xl font-bold text-amber-500 flex items-center gap-2">
                        {(testimonials.reduce((acc, t) => acc + t.rating, 0) / (testimonials.length || 1)).toFixed(1)}
                        <Star className="w-5 h-5 fill-current" />
                    </p>
                </div>
            </div>

            {/* Testimonials List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Content</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <MessageSquareQuote className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                                        <p className="text-lg font-medium">No testimonials yet</p>
                                        <button
                                            onClick={() => setIsFormOpen(true)}
                                            className="text-gold hover:underline mt-2 text-sm"
                                        >
                                            Click here to add your first one
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                testimonials.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center overflow-hidden">
                                                    <span className="text-amber-600 font-bold text-sm">{t.name[0]}</span>
                                                </div>
                                                <span className="font-semibold text-gray-900">{t.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-gold">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < t.rating ? "fill-current" : "text-gray-200"}`}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-md">
                                            <p className="text-sm text-gray-600 line-clamp-2 italic">"{t.content}"</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(t)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase transition ${t.isActive
                                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {t.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                {t.isActive ? "Active" : "Hidden"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingTestimonial(t);
                                                        setIsFormOpen(true);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
                        onClick={() => setIsFormOpen(false)}
                    ></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8">
                            <TestimonialForm
                                initialData={editingTestimonial || undefined}
                                onSuccess={() => {
                                    fetchTestimonials();
                                    setIsFormOpen(false);
                                }}
                                onCancel={() => setIsFormOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
