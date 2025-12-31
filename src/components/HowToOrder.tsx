import Link from "next/link";

export default function HowToOrder() {
  const steps = [
    {
      title: "Browse Collection",
      description: "Explore our carefully curated premium pooja items and find the perfect piece for your rituals.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: "Inquire via WhatsApp",
      description: "Tap 'Order via WhatsApp' on any product or message us directly for personalized assistance.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.417-5.012 9.984 9.984 0 0118.544 5.754c0 2.496-1.052 4.756-2.753 6.353z" />
        </svg>
      ),
    },
    {
      title: "Confirm Details",
      description: "We’ll confirm your order, price, and delivery details promptly with care and devotion.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      title: "Delivery & Payment",
      description: "Enjoy island-wide delivery with secure Cash on Delivery or bank transfer options.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h8a2 2 0 012 2v4m-12 0h12m-8 4h4m-8 4h8m-8-8h.01M7 20h10a2 2 0 002-2v-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full mt-12 py-16 md:py-24 bg-soft">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-gold font-heading uppercase tracking-widest text-sm">
            Simple & Easy
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-dark mt-3">
            How to Order
          </h2>
          <p className="text-accent/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Ordering from Grazie.lk is simple, transparent, and fully assisted via WhatsApp.
          </p>
        </div>

        {/* Steps Grid with Connecting Lines */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Lines (Desktop Only) */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-px bg-gold/30 -z-10">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Circle with Icon */}
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gold/10 border-8 border-gold flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-700">
                  <div className="text-gold">{step.icon}</div>
                </div>
                {/* Step Number */}
                <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-dark text-gold flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  0{index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-heading font-medium text-dark mb-4">
                {step.title}
              </h3>
              <p className="text-accent/80 text-sm md:text-base leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gold text-soft px-10 py-5 rounded-md font-semibold text-lg hover:bg-dark hover:shadow-2xl transition-all duration-500 shadow-xl"
          >
            Start Shopping Now
          </Link>
        </div>
      </div>
    </section>
  );
}