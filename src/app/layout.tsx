import "./globals.css"
import ClientLayout from "@/src/components/ClientLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Grazie.lk",
    default: "Grazie.lk | Premium Pooja Items & Spiritual Essentials",
  },
  description: "Discover a premium collection of pooja items, spiritual essentials, and handpicked devotional offerings at Grazie.lk. Crafted with care and devotion in Sri Lanka.",
  keywords: ["pooja items", "spiritual essentials", "devotional offerings", "Sri Lanka", "handcrafted pooja products", "Grazie.lk"],
  authors: [{ name: "Grazie.lk" }],
  creator: "Grazie.lk",
  publisher: "Grazie.lk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://grazie.lk",
    siteName: "Grazie.lk",
    title: "Grazie.lk | Premium Pooja Items",
    description: "Premium pooja items curated with love and devotion for your sacred rituals.",
    images: [
      {
        url: "https://grazie.lk/og-image.jpg", // Placeholder until they have a real one
        width: 1200,
        height: 630,
        alt: "Grazie.lk - Premium Pooja Items",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grazie.lk | Premium Pooja Items",
    description: "Premium pooja items curated with love and devotion.",
    images: ["https://grazie.lk/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
