"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquareQuote, Sparkles } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    content: string;
    rating: number;
}

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/testimonials/public")
            .then((res) => res.json())
            .then((data) => {
                setTestimonials(data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching testimonials:", err);
                setLoading(false);
            });
    }, []);

    if (loading || testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-soft/30 overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 blur-3xl -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-3xl translate-x-1/2 translate-y-1/2 rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-gold" />
                        <span className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Voice of Gratitude</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
                        Words from Our Community
                    </h2>
                    <div className="h-1 w-24 bg-gold mx-auto opacity-30"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`group bg-white p-8 rounded-2xl shadow-sm border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 flex flex-col ${index % 2 === 1 ? "md:translate-y-6" : ""
                                }`}
                        >
                            <div className="flex items-center gap-1 text-gold mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>

                            <div className="relative mb-8 flex-1">
                                <MessageSquareQuote className="absolute -top-4 -left-4 w-10 h-10 text-gold/10 group-hover:text-gold/20 transition-colors -z-0" />
                                <p className="text-gray-600 italic leading-relaxed relative z-10 font-body">
                                    "{testimonial.content}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6">
                                <div className="w-12 h-12 rounded-full bg-amber-50 border border-gold/20 flex items-center justify-center overflow-hidden flex-shrink-0 animate-pulse-slow">
                                    <span className="text-gold font-heading text-lg font-bold">
                                        {testimonial.name[0]}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-dark leading-tight">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs text-accent uppercase tracking-widest mt-0.5">
                                        Verified Customer
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
