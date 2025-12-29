"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-dark">Admin</h1>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm hover:text-gold">
          View Site
        </Link>

        <button
          onClick={() => {
            document.cookie = "admin_token=; Max-Age=0; path=/";
            window.location.href = "/login";
          }}
          className="text-sm text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
