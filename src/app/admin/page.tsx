"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  Users,
  Layers,
  Plus,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  Activity,
  BarChart3,
  Clock,
  Sparkles,
  Image as ImageIcon,
  MessageSquareQuote
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images?: Array<{ image_url: string[] }>;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
  loading?: boolean;
}

function StatCard({ title, value, icon, trend, trendUp = true, color, loading }: StatCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 ${color}`}></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <div className={`${color.replace('bg-', 'text-')}`}>
              {icon}
            </div>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${trendUp ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
              }`}>
              <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
              {trend}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-20 bg-gray-100 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
}

function ActionCard({ title, description, href, icon, iconBg }: ActionCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 p-6 cursor-pointer">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${iconBg} flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gold transition">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
              <span>Open</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    materials: 0,
    users: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentProducts();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, materialsRes] = await Promise.all([
        fetch("/api/products/list"),
        fetch("/api/categories"),
        fetch("/api/materials"),
      ]);

      const [productsData, categoriesData, materialsData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        materialsRes.json(),
      ]);

      setStats({
        products: productsData.products?.length || 0,
        categories: categoriesData.data?.length || 0,
        materials: materialsData.data?.length || 0,
        users: 1,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentProducts = async () => {
    try {
      const res = await fetch("/api/products/list");
      const data = await res.json();
      if (res.ok && data.products) {
        // Get the 4 most recent products
        setRecentProducts(data.products.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching recent products:", error);
    }
  };

  return (
    <div className="space-y-12 mt-10">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold text-gold uppercase tracking-wide">Portal</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/products/new">
          <button className="bg-gold text-white px-5 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            New Product
          </button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<Package className="w-5 h-5" />}
            trend={stats.products > 0 ? "+12%" : undefined}
            color="bg-amber-50"
            loading={loading}
          />
          <StatCard
            title="Categories"
            value={stats.categories}
            icon={<FolderTree className="w-5 h-5" />}
            color="bg-amber-50"
            loading={loading}
          />
          <StatCard
            title="Materials"
            value={stats.materials}
            icon={<Layers className="w-5 h-5" />}
            color="bg-amber-50"
            loading={loading}
          />
          <StatCard
            title="Admin Users"
            value={stats.users}
            icon={<Users className="w-5 h-5" />}
            trend="+1"
            color="bg-amber-50"
            loading={loading}
          />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            title="Manage Products"
            description="View, edit, and organize your product inventory"
            href="/admin/products"
            icon={<Package className="w-5 h-5 text-amber-600" />}
            iconBg="bg-amber-50"
          />
          <ActionCard
            title="Organize Categories"
            description="Create and manage product categories"
            href="/admin/categories"
            icon={<FolderTree className="w-5 h-5 text-yellow-600" />}
            iconBg="bg-yellow-50"
          />
          <ActionCard
            title="Material Types"
            description="Define and manage material classifications"
            href="/admin/materials"
            icon={<Layers className="w-5 h-5 text-orange-600" />}
            iconBg="bg-orange-50"
          />
          <ActionCard
            title="User Management"
            description="Manage admin users and permissions"
            href="/admin/users"
            icon={<Users className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
          />
          <ActionCard
            title="Client Testimonials"
            description="Manage customer reviews and feedback"
            href="/admin/testimonials"
            icon={<MessageSquareQuote className="w-5 h-5 text-gold" />}
            iconBg="bg-amber-50"
          />
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
            </div>
            <Link href="/admin/products">
              <button className="text-sm font-medium text-gold hover:text-opacity-80 transition flex items-center gap-1">
                View all
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6">
          {recentProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-4">
                <ShoppingBag className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Start building your inventory by adding your first product
              </p>
              <Link href="/admin/products/new">
                <button className="bg-gold text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-32 bg-gradient-to-br from-amber-50 to-yellow-50 relative">
                    {product.images && product.images.length > 0 && product.images[0].image_url[0] ? (
                      <img
                        src={product.images[0].image_url[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-amber-200" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h4>
                    <p className="text-gold font-bold text-sm">LKR {product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
