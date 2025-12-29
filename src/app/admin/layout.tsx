// src/app/admin/layout.tsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AdminNavbar from "@/src/components/AdminNavbar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Get the token from cookies
  const token = (await cookies()).get("adminToken")?.value;

  // Verify token
  if (!token) {
    // No token -> redirect to login
    redirect("/admin/login");
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      console.log("Invalid JWT:", err);
      redirect("/admin/login");
    }
  }

  return (
    <div className="min-h-screen flex bg-base">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-soft p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin" className="block hover:text-gold">Dashboard</a>
          <a href="/admin/products" className="block hover:text-gold">Products</a>
          <a href="/admin/products/new" className="block hover:text-gold">Add Product</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <AdminNavbar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
