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
    const [currentIndex, setCurrentIndex] = useState(0);

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

    // Auto-scroll effect
    useEffect(() => {
        if (testimonials.length <= 1) return; // Don't auto-scroll if only 1 testimonial

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (loading || testimonials.length === 0) return null;

    return (
        <section className="py-12 md:py-24 bg-soft/30 overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 blur-3xl -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-3xl translate-x-1/2 translate-y-1/2 rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-gold" />
                        <span className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Voice of Gratitude</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
                        Words from Our Community
                    </h2>
                    <div className="h-1 w-24 bg-gold mx-auto opacity-30"></div>
                </div>

                <div className="relative overflow-hidden max-w-3xl mx-auto">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="flex-shrink-0 w-full px-4"
                            >
                                <div className="group bg-white p-8 md:p-12 rounded-sm shadow-lg border border-gold/10 hover:border-gold/30 transition-all duration-500 flex flex-col h-full">
                                    <div className="flex items-center justify-center gap-1 text-gold mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonial.rating ? "fill-current" : "text-gray-200"}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="relative mb-8 flex-1 text-center">
                                        <MessageSquareQuote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-12 h-12 text-gold/10 group-hover:text-gold/20 transition-colors" />
                                        <p className="text-gray-600 italic leading-relaxed text-lg md:text-xl font-body">
                                            "{testimonial.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 border-t border-gray-50 pt-6">
                                        <div className="w-14 h-14 rounded-md bg-amber-50 border border-gold/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <span className="text-gold font-heading text-xl font-bold">
                                                {testimonial.name[0]}
                                            </span>
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-heading font-bold text-dark text-lg leading-tight">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-xs text-accent uppercase tracking-widest mt-0.5">
                                                Verified Customer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation dots */}
                    {testimonials.length > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                                            ? "bg-gold w-8"
                                            : "bg-gold/30 hover:bg-gold/50"
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
