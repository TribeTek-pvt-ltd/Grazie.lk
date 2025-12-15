import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-base">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-base/60 to-base/0"></div>

      <div className="relative container mx-auto px-6 md:px-16 flex flex-col items-center text-center py-10 md:py-18 space-y-8">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-dark leading-tight tracking-tight md:leading-snug">
          Welcome to <span className="text-gold">Grazie.lk</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-accent max-w-2xl">
          Discover premium pooja items curated with love for your sacred rituals. 
          Elevate your spiritual space with elegance, tradition, and style.
        </p>

        {/* Decorative underline */}
        <div className="w-24 h-1 bg-gold rounded-full mt-2 mb-6"></div>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-10 py-4 bg-dark text-soft rounded-xl font-medium text-lg hover:bg-black transition"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4 border border-dark text-dark rounded-xl font-medium text-lg hover:bg-dark hover:text-soft transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Optional: subtle tagline */}
        <p className="text-accent text-sm mt-4">
          Handcrafted & curated for your sacred moments.
        </p>
      </div>
    </section>
  );
}
