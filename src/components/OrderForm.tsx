"use client";

import { useState } from "react";
import { getWhatsAppLink } from "../config/constants";

interface OrderItem {
  id?: string | number;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

interface OrderFormProps {
  items: OrderItem[];
  onOrderSuccess?: () => void;
}

export default function OrderForm({ items, onOrderSuccess }: OrderFormProps) {
  const isSingleItem = items.length === 1;
  const [internalQuantity, setInternalQuantity] = useState(items[0]?.quantity || 1);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const quantity = isSingleItem ? internalQuantity : items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = isSingleItem
    ? items[0].price * internalQuantity
    : items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const isFormValid = customerName.trim() && phoneNumber.trim() && location.trim();

  const generateWhatsAppMessage = () => {
    let itemsList = "";
    if (isSingleItem) {
      itemsList = `Item: ${items[0].name}\nCategory: ${items[0].category || "General"}\nUnit Price: Rs. ${items[0].price.toLocaleString()}\nQuantity: ${internalQuantity}`;
    } else {
      itemsList = items.map(item => `- ${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`).join("\n");
    }

    return `
 Grazie.lk Sacred Order

Customer Name: ${customerName.trim()}
Phone: ${phoneNumber.trim()}
Delivery Location: ${location.trim()}

${itemsList}

Total Amount: Rs. ${subtotal.toLocaleString()}

Special Notes: ${note.trim() || "None"}

Thank you for your trust and devotion. We will contact you soon to confirm 
    `.trim();
  };

  const whatsappLink = getWhatsAppLink(generateWhatsAppMessage());

  return (
    <div className="bg-soft/90 p-8 md:p-10 border border-gold/30 shadow-2xl">
      <h3 className="text-2xl md:text-3xl font-heading font-semibold text-dark mb-8 text-center">
        Complete Your Order
      </h3>

      {/* Personal Details */}
      <div className="space-y-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-dark mb-2">Your Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g., Nimal Perera"
            required
            className="w-full px-5 py-4 border border-accent/50 bg-base/50 text-dark placeholder-dark/50 focus:border-gold focus:outline-none transition shadow-inner"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Phone Number *</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 0771234567"
            required
            className="w-full px-5 py-4 border border-accent/50 bg-base/50 text-dark placeholder-dark/50 focus:border-gold focus:outline-none transition shadow-inner"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Delivery Location *</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Colombo 07, Sri Lanka"
            required
            className="w-full px-5 py-4 border border-accent/50 bg-base/50 text-dark placeholder-dark/50 focus:border-gold focus:outline-none transition shadow-inner"
          />
        </div>
      </div>

      {/* Quantity - Only for single item direct orders */}
      {isSingleItem && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-dark mb-4">
            Quantity
          </label>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setInternalQuantity((prev) => Math.max(1, prev - 1))}
              className="w-14 h-14 bg-gold/20 border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-soft transition shadow-md text-3xl"
            >
              −
            </button>

            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={internalQuantity}
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  setInternalQuantity(value);
                }
              }}
              className="w-20 h-14 text-center text-3xl font-bold text-dark border-2 border-gold bg-soft focus:outline-none focus:ring-2 focus:ring-gold"
            />

            <button
              onClick={() => setInternalQuantity((prev) => prev + 1)}
              className="w-14 h-14 bg-gold/20 border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-soft transition shadow-md text-3xl"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Subtotal */}
      <div className="py-6 border-t-2 border-b-2 border-gold/30 mb-8 text-center">
        <p className="text-lg text-dark/80 mb-2">Total Amount</p>
        <p className="text-4xl md:text-5xl font-bold text-dark">Rs. {subtotal.toLocaleString()}</p>
      </div>

      {/* Special Note */}
      <div className="mb-10">
        <label className="block text-sm font-medium text-dark mb-3">Special Requests (Optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Gift wrapping, pooja date, blessings, or personal message..."
          rows={4}
          className="w-full px-6 py-5 border border-gold/40 bg-base/50 text-dark placeholder-dark/50 focus:border-gold focus:outline-none transition shadow-inner"
        />
      </div>

      {/* Order Button - Disabled until form is valid */}
      <a
        href={isFormValid ? whatsappLink : undefined}
        target={isFormValid ? "_blank" : undefined}
        rel={isFormValid ? "noopener noreferrer" : undefined}
        className={`w-full block text-center py-6 px-8 font-bold text-xl shadow-2xl transition-all duration-500 ${isFormValid
          ? "bg-gold text-soft hover:bg-dark hover:shadow-3xl cursor-pointer"
          : "bg-accent/30 text-accent/60 cursor-not-allowed"
          }`}
        onClick={(e) => {
          if (!isFormValid) {
            e.preventDefault();
          } else {
            onOrderSuccess?.();
          }
        }}
      >
        {isFormValid ? "💬 Send Order via WhatsApp" : "⚠️ Please fill all required fields"}
      </a>

      {!isFormValid && (
        <p className="text-center text-accent/70 text-sm mt-4">
          Name, Phone, and Location are required to proceed.
        </p>
      )}
    </div>
  );
}