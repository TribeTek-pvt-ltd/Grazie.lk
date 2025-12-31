"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { getWhatsAppLink } from "../config/constants";

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

          {/* WhatsApp CTA Button */}
          <a
            href={getWhatsAppLink("Hello Grazie.lk, I'd like to ask about...")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gold text-soft px-5 py-2.5 rounded-xl font-semibold hover:bg-dark hover:text-soft transition shadow-md"
          >
            <WhatsAppIcon />
            Contact Us
          </a>

          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-soft text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>



        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-dark hover:text-gold transition p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop with blur */}
            <div
              className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Menu Panel */}
            <div className="absolute right-0 top-0 h-screen w-full max-w-full bg-soft shadow-2xl flex flex-col animate-slideIn">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-dark/60 hover:text-gold transition z-10"
                aria-label="Close menu"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Menu Content */}
              <div className="flex flex-col h-full px-10 m-10 pt-24 pb-10 gap-8">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-6">

                  <Link
                    href="/"
                    className="text-4xl mb-6 font-heading font-semibold text-gold tracking-wider hover:opacity-80 transition"
                  >
                    Grazie.lk
                  </Link>

                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-medium text-dark hover:text-gold transition duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-medium text-dark hover:text-gold transition duration-300"
                  >
                    Products
                  </Link>

                </nav>

                {/* WhatsApp Contact */}
                <a
                  href={getWhatsAppLink("Hello Grazie.lk, I'd like to ask about...")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-4 bg-dark/90 text-soft px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-dark hover:shadow-2xl transition-all duration-300"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.417-5.012 9.984 9.984 0 0118.544 5.754c0 2.496-1.052 4.756-2.753 6.353z" />
                  </svg>
                  Contact Us
                </a>

                {/* Social Media Links */}
                <div className="mt-auto flex flex-col gap-6">
                  <div className="text-center">
                    <p className="text-dark/60 text-sm mb-4">Follow us for divine inspiration</p>
                    <div className="flex justify-center gap-8">
                      <a
                        href="https://instagram.com/grazie.lk" // ← Update with real link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark/70 hover:text-pink-600 transition"
                        aria-label="Instagram"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://facebook.com/grazie.lk" // ← Update with real link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark/70 hover:text-blue-600 transition"
                        aria-label="Facebook"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Cart Link */}
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-4 mt-8 py-4 border-t border-gold/20"
                  >
                    <div className="relative">
                      <ShoppingCart size={28} className="text-dark/80" />
                      {cartCount > 0 && (
                        <span className="absolute -top-3 -right-3 bg-gold text-soft text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-pulse">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xl font-medium text-dark/80">My Cart</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide-in Animation */}
        <style jsx>{`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  .animate-slideIn {
    animation: slideIn 0.4s ease-out forwards;
  }
`}</style>


      </nav>
    </header>
  );
}