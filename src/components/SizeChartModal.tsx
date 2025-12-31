// components/SizeChartModal.tsx
interface Size {
  size: string;
  height: string;
  width: string;
  depth?: string;
}

interface SizeChartModalProps {
  sizes: Size[];
  onClose: () => void;
}

export default function SizeChartModal({ sizes, onClose }: SizeChartModalProps) {
  const hasDepth = sizes.some((s) => s.depth);

  return (
    <div
      className="fixed inset-0 bg-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-soft  p-8 md:p-12 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl md:text-4xl font-heading font-semibold text-dark mb-10 text-center">
          Size Chart
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gold/30">
                <th className="py-5 px-6 text-dark font-semibold text-lg">Size</th>
                <th className="py-5 px-6 text-dark font-semibold text-lg">Height</th>
                <th className="py-5 px-6 text-dark font-semibold text-lg">Width</th>
                {hasDepth && <th className="py-5 px-6 text-dark font-semibold text-lg">Depth</th>}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, i) => (
                <tr key={i} className="border-b border-gold/10">
                  <td className="py-6 px-6 font-medium text-lg">{size.size}</td>
                  <td className="py-6 px-6">{size.height}</td>
                  <td className="py-6 px-6">{size.width}</td>
                  {size.depth && <td className="py-6 px-6">{size.depth}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-12 w-full py-5 bg-gold text-soft rounded-xl font-bold text-xl hover:bg-dark hover:shadow-2xl transition-all duration-300 shadow-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}