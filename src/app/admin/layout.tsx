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
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl hidden md:flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
            Grazie Admin
          </h2>
          <p className="text-gray-400 text-sm mt-1">Management Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Dashboard */}
          <Link href="/admin">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer group">
              <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-gold transition" />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>

          {/* Products Section */}
          <div className="pt-4">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Inventory
            </p>

            <Link href="/admin/products">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer group">
                <Package className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition" />
                <span className="font-medium">Products</span>
              </div>
            </Link>
          </div>

          {/* Organization Section */}
          <div className="pt-4">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Organization
            </p>

            <Link href="/admin/categories">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer group">
                <FolderTree className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition" />
                <span className="font-medium">Categories</span>
              </div>
            </Link>

            <Link href="/admin/materials">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer group">
                <Layers className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition" />
                <span className="font-medium">Materials</span>
              </div>
            </Link>
          </div>

          {/* Management Section */}
          <div className="pt-4">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Management
            </p>

            <Link href="/admin/users">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer group">
                <Users className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition" />
                <span className="font-medium">Users</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.user_metadata?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <AdminNavbar />
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
