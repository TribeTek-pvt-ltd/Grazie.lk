import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  Layers,
  Plus,
  TrendingUp,
  ShoppingBag
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

function QuickAction({ title, description, href, icon, color }: QuickActionProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer group">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="0"
          icon={<Package className="w-6 h-6 text-white" />}
          trend="+12% from last month"
          color="bg-blue-500"
        />
        <StatCard
          title="Categories"
          value="5"
          icon={<FolderTree className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Users"
          value="0"
          icon={<Users className="w-6 h-6 text-white" />}
          trend="+5 new this week"
          color="bg-green-500"
        />
        <StatCard
          title="Materials"
          value="6"
          icon={<Layers className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAction
            title="Add Product"
            description="Create a new product listing"
            href="/admin/products/new"
            icon={<Plus className="w-6 h-6 text-white" />}
            color="bg-gold"
          />
          <QuickAction
            title="Manage Products"
            description="View and edit all products"
            href="/admin/products"
            icon={<Package className="w-6 h-6 text-white" />}
            color="bg-blue-500"
          />
          <QuickAction
            title="Categories"
            description="Organize product categories"
            href="/admin/categories"
            icon={<FolderTree className="w-6 h-6 text-white" />}
            color="bg-purple-500"
          />
          <QuickAction
            title="Materials"
            description="Manage material types"
            href="/admin/materials"
            icon={<Layers className="w-6 h-6 text-white" />}
            color="bg-orange-500"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Products</h2>
        <div className="text-center py-12 text-gray-500">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No products yet. Start by adding your first product!</p>
          <Link href="/admin/products/new">
            <button className="mt-4 bg-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
              Add Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
