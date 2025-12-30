// src/app/admin/layout.tsx
import { cookies } from "next/headers";
import AdminNavbar from "@/src/components/AdminNavbar";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/src/lib/supabaseAuth";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  Users,
  ShoppingBag,
  Plus
} from "lucide-react";

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
    <div className="min-h-screen flex bg-soft">
      {/* Enhanced Sidebar */}
      <aside className="w-72 bg-dark text-soft shadow-2xl hidden md:flex flex-col border-r border-accent/10">
        {/* Logo/Brand */}
        <div className="p-8 border-b border-accent/10">

          <p className="text-accent text-xs mt-1 uppercase tracking-widest font-medium">Management Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {/* Dashboard */}
          <Link href="/admin">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all duration-300 cursor-pointer group">
              <LayoutDashboard className="w-5 h-5 text-accent group-hover:text-gold transition-colors" />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>

          {/* Products Section */}
          <div className="pt-6">
            <p className="px-4 text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
              Inventory
            </p>

            <Link href="/admin/products">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all duration-300 cursor-pointer group">
                <Package className="w-5 h-5 text-accent group-hover:text-gold transition-colors" />
                <span className="font-medium">Products</span>
              </div>
            </Link>
          </div>

          {/* Organization Section */}
          <div className="pt-6">
            <p className="px-4 text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
              Organization
            </p>

            <Link href="/admin/categories">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all duration-300 cursor-pointer group">
                <FolderTree className="w-5 h-5 text-accent group-hover:text-gold transition-colors" />
                <span className="font-medium">Categories</span>
              </div>
            </Link>

            <Link href="/admin/materials">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all duration-300 cursor-pointer group">
                <Layers className="w-5 h-5 text-accent group-hover:text-gold transition-colors" />
                <span className="font-medium">Materials</span>
              </div>
            </Link>
          </div>

          {/* Management Section */}
          <div className="pt-6">
            <p className="px-4 text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
              Management
            </p>

            <Link href="/admin/users">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all duration-300 cursor-pointer group">
                <Users className="w-5 h-5 text-accent group-hover:text-gold transition-colors" />
                <span className="font-medium">Users</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* User Info */}
        <div className="p-6 border-t border-accent/10 bg-dark/40">
          <div className="flex items-center gap-4 px-4 py-4 bg-accent/5 rounded-2xl border border-accent/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-soft">{user.user_metadata?.name || 'Admin'}</p>
              <p className="text-[10px] text-accent truncate mt-0.5">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <AdminNavbar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
