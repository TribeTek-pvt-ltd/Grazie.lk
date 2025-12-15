import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react"; // Optional: install lucide-react for icons

export default function Footer() {
  return (
    <footer className="bg-dark text-soft  py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand / About */}
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-semibold text-gold tracking-wide">
              Grazie.lk
            </h2>
            <p className="text-accent/80 text-sm leading-relaxed max-w-xs">
              Premium pooja items curated with love and devotion for your sacred rituals and spiritual journeys.
            </p>
            <div className="w-16 h-px bg-gold/50"></div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-soft">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="text-accent/80 hover:text-gold transition-colors duration-300">
                All Products
              </Link>
              <Link href="/about" className="text-accent/80 hover:text-gold transition-colors duration-300">
                About Us
              </Link>
              <Link href="/contact" className="text-accent/80 hover:text-gold transition-colors duration-300">
                Contact
              </Link>
              <Link href="/privacy" className="text-accent/80 hover:text-gold transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Connect / Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-soft">Connect With Us</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/grazie.lk" // Update with real link
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/80 hover:text-gold transition-colors duration-300 flex items-center gap-2"
              >
                <Instagram size={18} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/grazie.lk" // Update with real link
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/80 hover:text-gold transition-colors duration-300 flex items-center gap-2"
              >
                <Facebook size={18} />
                Facebook
              </a>
              <a
                href="mailto:info@grazie.lk"
                className="text-accent/80 hover:text-gold transition-colors duration-300 flex items-center gap-2"
              >
                <Mail size={18} />
                info@grazie.lk
              </a>
            </div>
          </div>

          {/* Contact / WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium text-soft">Get In Touch</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://wa.me/947XXXXXXXXX" // Update with your number
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/80 hover:text-gold transition-colors duration-300 flex items-center gap-2"
              >
                <Phone size={18} />
                WhatsApp Us
              </a>
              <p className="text-accent/60 text-sm">
                We're here to help with your orders and inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-accent/70">
            <p>&copy; {new Date().getFullYear()} Grazie.lk. All rights reserved.</p>
            <p className="text-accent/60">Crafted with devotion in Sri Lanka</p>
          </div>
        </div>
      </div>
    </footer>
  );
}