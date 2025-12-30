import Link from "next/link";
import { Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string[];
  description: string;
}

interface Props {
  product: Product;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, isAdmin = false, onDelete }: Props) {
  const whatsappLink = `https://wa.me/947XXXXXXXX?text=I want to order ${encodeURIComponent(
    product.name
  )}`;

  return (
    <div className="group relative bg-soft overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-in-out  hover:border-gold w-full">
      {/* Image with responsive aspect ratio */}
      <div className="w-full overflow-hidden relative" style={{ paddingTop: "70%" }}>
        <img
          src={product.image?.[0] || "/placeholder.png"}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Product Name */}
        <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-dark font-heading mb-1 tracking-wide">
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-accent text-xs sm:text-sm mb-2 uppercase tracking-wide font-medium">
          {product.category}
        </p>

        {/* Subtle gold divider */}
        <div className="w-10 h-px bg-gold mb-3"></div>

        {/* Price */}
        <p className="text-base sm:text-lg md:text-xl text-accent mb-3 font-medium">
          Rs. {product.price.toLocaleString()}
        </p>


        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center py-1 px-4 border border-gold text-dark font-medium  hover:bg-gold hover:text-soft transition-colors duration-300"
          >
            View Product
          </Link>

          {/* ADMIN vs USER */}
          {isAdmin ? (
            <button
              onClick={() => onDelete?.(product.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-md"
            >
              <Trash2 size={16} />
              Delete
            </button>
          ) : (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-4 bg-gold text-soft font-semibold hover:bg-dark transition shadow-md"
            >
              Order Now
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-dark transition-opacity duration-500"></div>
    </div>
  );
}