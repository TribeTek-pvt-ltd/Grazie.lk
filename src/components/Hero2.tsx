"use client";

import { useEffect, useState } from "react";
export default function ProductGridShowcase() {
  const localImages = [
    "/products/1.jpeg",
    "/products/2.jpeg",
    "/products/3.jpeg", "/products/4.jpeg",
    "/products/5.jpeg",
    "/products/6.jpeg", "/products/9.jpeg",
    "/products/7.jpeg",
    "/products/10.jpeg",
    "/products/8.jpeg",

  ];

  const allImages = localImages;

  const NUM_IMAGES = 9;

  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [heights, setHeights] = useState<string[]>([]);
  const [watermarks, setWatermarks] = useState<boolean[]>([]);

  // Initialize everything on client only (after mount)
  useEffect(() => {
    const initialImages: string[] = [];
    for (let i = 0; i < NUM_IMAGES; i++) {
      initialImages.push(allImages[i % allImages.length]);
    }
    setDisplayImages(initialImages);

    // Generate random heights and watermarks once on client
    const initialHeights = initialImages.map(() =>
      Math.random() < 0.6 ? "row-span-1" : "row-span-2"
    );
    setHeights(initialHeights);

    const initialWatermarks = initialImages.map(() => Math.random() < 0.3);
    setWatermarks(initialWatermarks);
  }, []);

  // Rotation logic
  useEffect(() => {
    if (displayImages.length === 0) return;

    const interval = setInterval(() => {
      setDisplayImages((prev) => {
        const shifted = prev.slice(1);
        const lastRemoved = prev[0];
        const lastIndex = allImages.indexOf(lastRemoved);
        const nextIndex = (lastIndex + 1) % allImages.length;
        return [...shifted, allImages[nextIndex]];
      });

      // Regenerate random heights & watermarks for fresh organic feel
      setHeights((prev) => {
        const newHeights = [...prev.slice(1)];
        newHeights.push(Math.random() < 0.6 ? "row-span-1" : "row-span-2");
        return newHeights;
      });

      setWatermarks((prev) => {
        const newWatermarks = [...prev.slice(1)];
        newWatermarks.push(Math.random() < 0.3);
        return newWatermarks;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [displayImages.length > 0]); // Only start when initialized

  // Show nothing or a subtle placeholder until client-side init
  if (displayImages.length === 0) {
    return (
      <section className="w-full h-[70vh] bg-soft flex items-center justify-center">
        <div className="text-accent/50 text-lg font-heading">Loading gallery...</div>
      </section>
    );
  }

  return (
    <section className="w-full h-[70vh] bg-soft flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-7xl px-6 md:px-12 lg:px-20 flex items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 auto-rows-[90px] md:auto-rows-[130px] w-full h-fit">
          {displayImages.map((img, index) => (
            <div
              key={index} // Stable key based on array position
              className={`
                relative overflow-hidden shadow-md hover:shadow-xl
                border border-transparent hover:border-gold/30
                transition-all duration-1000 ease-out
                group ${heights[index] || "row-span-1"}
              `}
            >
              <img
                src={img}
                alt="Premium pooja item"
                className="
                  w-full h-full object-cover
                  transition-transform duration-1200 ease-out
                  group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-1000" />

              {watermarks[index] && (
                <div className="absolute bottom-3 left-3 text-soft/80 text-xs font-heading tracking-widest opacity-60">
                  Grazie.lk
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}