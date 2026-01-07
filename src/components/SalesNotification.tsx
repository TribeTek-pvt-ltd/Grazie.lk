"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { products } from "@/src/data/products";
import { sriLankanNames, timeAgoOptions } from "@/src/data/salesData";

export default function SalesNotification() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [currentSale, setCurrentSale] = useState<{
        name: string;
        product: string;
        time: string;
    } | null>(null);

    useEffect(() => {
        const showNotification = () => {
            if (isDismissed) return;

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
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    if (isDismissed || !currentSale) return null;

    return (
        <div
            className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[200] max-w-[200px] md:max-w-[240px] w-full transition-all duration-700 ease-in-out transform ${isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-10 opacity-0 scale-95 pointer-events-none"
                }`}
        >
            <div className="bg-soft/95 backdrop-blur-md border border-gold/30 p-1.5 md:p-2.5 shadow-xl flex items-center gap-2 md:gap-3 relative group rounded-lg">
                <button
                    onClick={handleDismiss}
                    className="absolute -top-1.5 -right-1.5 bg-dark text-soft p-0.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
                    aria-label="Close notification"
                >
                    <X className="w-2.5 h-2.5" />
                </button>

                <div className="flex-shrink-0 w-6 h-6 md:w-10 md:h-10 bg-gold/5 flex items-center justify-center border border-gold/20 rounded-md">
                    <ShoppingBag className="w-3.5 h-3.5 md:w-5 md:h-5 text-gold animate-pulse" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[7px] md:text-[9px] text-accent font-bold uppercase tracking-widest leading-none mb-0.5">
                        Recent Purchase
                    </p>
                    <h4 className="text-[9px] md:text-xs font-heading text-dark truncate pr-1 font-semibold leading-tight">
                        {currentSale.name}
                    </h4>
                    <p className="text-[8px] md:text-[10px] text-accent line-clamp-1 italic leading-tight">
                        Bought: {currentSale.product}
                    </p>
                    <p className="text-[7px] md:text-[9px] text-gold/60 mt-0.5 font-medium italic leading-none">
                        {currentSale.time}
                    </p>
                </div>
            </div>

            {/* Decorative pulse element */}
            <div className={`absolute -inset-0.5 bg-gold/10 blur-sm -z-10 transition-opacity duration-1000 rounded-lg ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
}
