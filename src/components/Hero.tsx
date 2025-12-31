import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-soft overflow-hidden">
      {/* Rich decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-base/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

      <div className="relative container mx-auto px-6 md:px-16 flex flex-col items-center text-center py-20 md:py-32 space-y-8">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-dark leading-tight tracking-tight md:leading-[1.1] max-w-4xl drop-shadow-sm">
          Welcome to <span className="text-gold italic relative">
            Grazie.lk
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl text-accent/90 max-w-2xl font-light leading-relaxed">
          Discover premium pooja items curated with love for your sacred rituals.
          Elevate your spiritual space with elegance, tradition, and style.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
          <Link
            href="/products"
            className="px-12 py-5 bg-dark text-soft rounded-md font-semibold text-lg hover:bg-gold hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="px-12 py-5 border-2 border-dark/10 text-dark bg-white/50 backdrop-blur-sm rounded-md font-semibold text-lg hover:bg-dark hover:text-soft transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            Contact Us
          </Link>
        </div>

        {/* Optional: subtle tagline */}
        <p className="text-accent/60 text-sm tracking-[0.2em] uppercase font-medium mt-8">
          Handcrafted & curated for your sacred moments
        </p>
      </div>
    </section>
  );
}
