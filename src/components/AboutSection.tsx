import { Sparkles, Flame, Flower } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full py-20 bg-soft">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="text-gold font-heading uppercase tracking-widest text-sm">
              About Grazie.lk
            </span>

            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-dark mt-3 mb-6 leading-snug">
              Curated with Devotion, <br /> Crafted with Tradition
            </h2>

            <p className="text-accent leading-relaxed mb-5">
              <strong>Grazie.lk</strong> is a carefully curated destination for
              premium pooja and spiritual products. We believe devotion deserves
              purity, beauty, and authenticity — reflected in every item we offer.
            </p>

            <p className="text-accent leading-relaxed mb-8">
              From handcrafted brass diyas to traditional pooja sets, each product
              is selected to elevate your sacred moments, rituals, and celebrations.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 text-dark font-medium">
                <Sparkles className="w-5 h-5 text-gold" />
                Authentic Materials
              </div>

              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 text-dark font-medium">
                <Flame className="w-5 h-5 text-gold" />
                Traditional Craftsmanship
              </div>

              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 text-dark font-medium">
                <Flower className="w-5 h-5 text-gold" />
                Sacred & Thoughtful
              </div>
            </div>
          </div>

          {/* Right Visualdd */}
          <div className="relative group perspective">
            <div className="absolute top-4 left-4 w-full h-full border-2 border-gold/30 rounded-md -z-10 group-hover:top-6 group-hover:left-6 transition-all duration-500"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
            <img
              src="/about/about-image.png"
              alt="Pooja items"
              className="relative z-10 rounded-md shadow-xl object-cover w-full h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
