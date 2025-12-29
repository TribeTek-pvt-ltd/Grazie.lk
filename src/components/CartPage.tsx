"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /* -----------------------------------------
     Load cart from localStorage
  ----------------------------------------- */
  useEffect(() => {
    const savedCart = localStorage.getItem("grazieCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  /* -----------------------------------------
     Save cart to localStorage
  ----------------------------------------- */
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("grazieCart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("grazieCart");
    }
  }, [cartItems]);

  /* -----------------------------------------
     Quantity handlers
  ----------------------------------------- */
  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const setQuantity = (id: number, value: number) => {
    if (isNaN(value) || value < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* -----------------------------------------
     Calculations
  ----------------------------------------- */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* -----------------------------------------
     WhatsApp Message
  ----------------------------------------- */
  const generateWhatsAppMessage = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.name} (x${item.quantity}) - Rs. ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return `
🪔 Grazie.lk Cart Order

${itemsList}

Total Items: ${itemCount}
Grand Total: Rs. ${subtotal.toLocaleString()}
    `.trim();
  };

  const whatsappLink = `https://wa.me/94772220499?text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}`;

  /* -----------------------------------------
     Empty Cart
  ----------------------------------------- */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-soft py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <ShoppingCart className="w-24 h-24 text-accent/30 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-dark mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-accent/80 text-lg mb-10">
            Explore our sacred collection and add items to begin your order.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gold text-soft px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:bg-dark transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  /* -----------------------------------------
     Cart Page
  ----------------------------------------- */
  return (
    <div className="min-h-screen bg-soft py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-dark mb-4">
            Your Sacred Cart
          </h1>
          <p className="text-accent/80 text-lg">
            {itemCount} item{itemCount !== 1 ? "s" : ""} ready for order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-soft/60 p-6 md:p-8 border border-gold/20 shadow-lg flex flex-col md:flex-row gap-6"
              >
                <div className="relative w-full md:w-40 h-48 overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-heading font-medium text-dark mb-2">
                    {item.name}
                  </h3>
                  <p className="text-accent/80 text-sm mb-4">
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 bg-gold/10 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-soft transition"
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        min={1}
                        inputMode="numeric"
                        value={item.quantity}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) =>
                          setQuantity(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                        className="w-16 h-10 text-center text-lg font-bold text-dark border border-gold/50 bg-soft focus:outline-none focus:ring-2 focus:ring-gold"
                      />

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 bg-gold/10 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-soft transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-2xl font-semibold text-dark">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-accent/60 hover:text-red-600 transition self-start md:self-center"
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-soft/90 p-8 border border-gold/30 shadow-2xl">
              <h3 className="text-2xl font-heading font-semibold text-dark mb-8 text-center">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-dark/80">
                  <span>Items ({itemCount})</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-dark/80">
                  <span>Delivery</span>
                  <span className="text-accent/80">
                    Island-wide (Cash on Delivery)
                  </span>
                </div>
                <div className="border-t-2 border-gold/20 pt-4">
                  <div className="flex justify-between text-xl font-bold text-dark">
                    <span>Total</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-6 px-8 bg-gold text-soft font-bold text-xl rounded-xl hover:bg-dark transition-all shadow-2xl"
              >
                💬 Place Order via WhatsApp
              </a>

              <p className="text-center text-accent/70 text-sm mt-6">
                We’ll confirm your order and delivery details personally.
              </p>
            </div>

            <Link
              href="/products"
              className="block text-center mt-6 text-accent hover:text-dark underline font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
