"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

// Simple inline SVGs for menu/close (no dependencies)
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.417-5.012 9.984 9.984 0 0118.544 5.754c0 2.496-1.052 4.756-2.753 6.353z" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-soft/90 backdrop-blur-md border-b border-gold/10 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-3xl font-heading font-semibold text-gold tracking-wider hover:opacity-80 transition"
        >
          Grazie.lk
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-dark/80 font-medium">
          <Link
            href="/"
            className="relative hover:text-gold transition after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="relative hover:text-gold transition after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            products
          </Link>
          {/* <Link
            href="/contact"
            className="relative hover:text-gold transition after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link> */}

          <Link href="/cart" className="relative">
  <ShoppingCart size={24} />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-gold text-soft text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>


        </div>

         {/* WhatsApp CTA Button */}
          <a
            href="https://wa.me/947XXXXXXXXX" // Update with your number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold text-soft px-5 py-2.5 rounded-full font-semibold hover:bg-dark hover:text-soft transition shadow-md"
          >
            <WhatsAppIcon />
            Contact Us
          </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-dark"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-soft/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 text-2xl font-medium text-dark md:hidden">
          <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-gold transition">
            Products
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-gold transition">
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-gold transition">
            Contact
          </Link>
          <a
            href="https://wa.me/947XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 bg-gold text-soft px-8 py-4 rounded-full font-semibold hover:bg-dark transition"
          >
            <WhatsAppIcon />
            Order via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}