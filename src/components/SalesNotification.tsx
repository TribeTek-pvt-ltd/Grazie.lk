"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { products } from "@/src/data/products";
import { sriLankanNames, timeAgoOptions } from "@/src/data/salesData";

export default function SalesNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSale, setCurrentSale] = useState<{
        name: string;
        product: string;
        time: string;
    } | null>(null);

    useEffect(() => {
        const showNotification = () => {
            const randomName = sriLankanNames[Math.floor(Math.random() * sriLankanNames.length)];
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            const randomTime = timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)];

            setCurrentSale({
                name: randomName,
                product: randomProduct.name,
                time: randomTime
            });

            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Initial delay before first popup
        const firstTimeout = setTimeout(showNotification, 5000);

        // Repeat every 10 seconds
        const interval = setInterval(() => {
            showNotification();
        }, 10000);

        return () => {
            clearTimeout(firstTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!currentSale) return null;

    return (
        <div
            className={`fixed bottom-6 left-6 z-[200] max-w-[280px] w-full transition-all duration-700 ease-in-out transform ${isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-10 opacity-0 scale-90 pointer-events-none"
                }`}
        >
            <div className="bg-soft/90 backdrop-blur-md border border-gold/30 p-4 shadow-2xl flex items-center gap-4 relative group">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-dark text-soft p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                    <X className="w-3 h-3" />
                </button>

                <div className="flex-shrink-0 w-12 h-12 bg-gold/10 flex items-center justify-center border border-gold/20">
                    <ShoppingBag className="w-6 h-6 text-gold animate-pulse" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest leading-none mb-1">
                        Recent Purchase
                    </p>
                    <h4 className="text-sm font-heading text-dark truncate pr-2">
                        {currentSale.name}
                    </h4>
                    <p className="text-xs text-accent line-clamp-1 italic">
                        Bought: {currentSale.product}
                    </p>
                    <p className="text-[10px] text-gold/60 mt-1 font-medium italic">
                        {currentSale.time}
                    </p>
                </div>
            </div>

            {/* Decorative pulse element */}
            <div className={`absolute -inset-0.5 bg-gold/10 blur-sm -z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
}
