import { products } from "./products";

export const filtersData = {
  categories: ["All", ...Array.from(new Set(products.map(p => p.category)))],

  materials: [
    "All",
    "Brass",
    "Clay",
    "Wood",
    "Copper",
    "Silver",
    "Glass",
  ],

  pricePresets: [
    { label: "All Prices", range: [0, Infinity] },
    { label: "Under Rs. 5,000", range: [0, 5000] },
    { label: "Rs. 5,000 - 15,000", range: [5000, 15000] },
    { label: "Rs. 15,000 - 30,000", range: [15000, 30000] },
    { label: "Over Rs. 30,000", range: [30000, Infinity] },
  ],
};
