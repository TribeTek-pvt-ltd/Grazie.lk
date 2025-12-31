"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-accent/10 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold font-heading text-dark tracking-wide">Grazie Admin</h1>

      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-medium text-accent hover:text-gold transition-colors flex items-center gap-2"
        >
          View Storefront
        </Link>

        <button
          onClick={() => {
            // Remove the admin_token cookie
            document.cookie = "admin_token=; Max-Age=0; path=/";
            // Remove the Supabase auth cookie
            document.cookie = "sb-poikvtgcxpzfyykkvtkh-auth-token=; Max-Age=0; path=/";
            window.location.href = "/login";
          }}
          className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors px-4 py-2 rounded-lg border border-red-100 hover:border-red-200 bg-red-50/50"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
