import { ShoppingBag } from "lucide-react";
import type { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const formatRupiah = (angka: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  return (
    <div className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-teal-600 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            No Image
          </div>
        )}
        {product.stock < 30 && (
          <span className="absolute right-3 top-3 rounded-full bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white">
            Stok Terbatas
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          {product.category}
        </p>
        <h3 className="mt-1 font-semibold text-neutral-900">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-neutral-500">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-teal-700">
            {formatRupiah(product.price)}
          </span>
          <span className="text-xs text-neutral-400">
            Stok: {product.stock}
          </span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-teal-600 hover:bg-teal-600 hover:text-white"
        >
          <ShoppingBag size={16} />
          Keranjang
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
