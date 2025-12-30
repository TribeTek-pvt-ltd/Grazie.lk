import Link from "next/link";
import { Trash2 } from "lucide-react";

interface Product {
  id: string | number;
  name: string;
  price: number;
  category?: string;
  image?: string | string[];
  images?: Array<{ image_url: string[] }>;
  description: string;
}

interface Props {
  product: Product;
  isAdmin?: boolean;
  onDelete?: (id: string | number) => void | Promise<void>;
}

export default function ProductCard({ product, isAdmin = false, onDelete }: Props) {
  const whatsappLink = `https://wa.me/947XXXXXXXX?text=I want to order ${encodeURIComponent(
    product.name
  )}`;

  // Determine the best image URL to show
  let mainImageUrl = "/placeholder.png";
  if (product.images && product.images.length > 0 && product.images[0].image_url?.[0]) {
    mainImageUrl = product.images[0].image_url[0];
  } else if (Array.isArray(product.image) && product.image.length > 0) {
    mainImageUrl = product.image[0];
  } else if (typeof product.image === "string") {
    mainImageUrl = product.image;
  }

  return (
    <div className="group relative bg-soft overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-in-out  hover:border-gold w-full flex flex-col h-full">
      {/* Image with responsive aspect ratio */}
      <Link href={isAdmin ? `/admin/products/${product.id}/edit` : `/products/${product.id}`} className="block w-full overflow-hidden relative" style={{ paddingTop: "70%" }}>
        <img
          src={mainImageUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        {/* Product Name */}
        <Link href={isAdmin ? `/admin/products/${product.id}/edit` : `/products/${product.id}`}>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-dark font-heading mb-1 tracking-wide line-clamp-1 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-accent text-xs sm:text-sm mb-2 uppercase tracking-wide font-medium">
          {product.category || "General"}
        </p>

        {/* Subtle gold divider */}
        <div className="w-10 h-px bg-gold mb-3"></div>

        {/* Price */}
        <p className="text-base sm:text-lg md:text-xl text-accent mb-3 font-medium mt-auto">
          Rs. {product.price.toLocaleString()}
        </p>


        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin ? (
            <>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="flex-1 text-center py-2 px-2 bg-amber-50 text-amber-700 text-sm font-medium rounded hover:bg-amber-100 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete?.(product.id)}
                className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/products/${product.id}`}
                className="flex-1 text-center py-1 px-4 border border-gold text-dark font-medium  hover:bg-gold hover:text-soft transition-colors duration-300"
              >
                View
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 px-4 bg-gold text-soft font-semibold hover:bg-dark transition shadow-md"
              >
                Order
              </a>
            </>
          )}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-dark transition-opacity duration-500"></div>
    </div>
  );
}