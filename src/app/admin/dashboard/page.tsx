import Link from "next/link";

export default function AdminDashboard() {
  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-6">
        <Link
          href="/admin/products"
          className="bg-dark text-soft px-6 py-4 rounded-lg"
        >
          Manage Products
        </Link>

        <Link
          href="/admin/products/new"
          className="bg-gold text-soft px-6 py-4 rounded-lg"
        >
          Add New Product
        </Link>
      </div>
    </section>
  );
}
