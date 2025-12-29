export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {children}
    </section>
  );
}
