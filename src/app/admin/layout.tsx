// src/app/admin/layout.tsx
import { cookies } from "next/headers";
import AdminNavbar from "@/src/components/AdminNavbar";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/src/lib/supabaseAuth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Create Supabase client and check session
  const supabase = await createSupabaseServerClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  // No session -> redirect to login
  if (!session || error) {
    redirect("/login");
  }

  // Verify user has admin role
  const user = session.user;
  if (user.user_metadata?.role !== 'admin') {
    redirect("/login");
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

