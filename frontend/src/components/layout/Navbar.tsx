import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-neutral-900"
        >
          LATIPSTORE<span className="text-teal-600">.</span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-neutral-600 hover:text-teal-700"
          >
            Beranda
          </Link>
          <Link
            to="/produk"
            className="text-sm font-medium text-neutral-600 hover:text-teal-700"
          >
            Produk
          </Link>
        </nav>
        <Link
          to="/keranjang"
          className="relative flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <ShoppingBag size={16} />
          Keranjang
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
