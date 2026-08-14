import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";

function HomePage() {
  const { data: products } = useProducts();
  const featured = products?.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal-600">
            Koleksi Terbaru
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Fashion Pria yang Bikin Kamu Tampil Beda
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-neutral-500">
            Kaos, kemeja, jaket, dan hoodie pilihan dengan kualitas premium dan
            harga bersahabat.
          </p>
          <Link
            to="/produk"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            Belanja Sekarang
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Produk Unggulan
            </h2>
            <p className="mt-1 text-neutral-500">Pilihan terbaik minggu ini.</p>
          </div>
          <Link
            to="/produk"
            className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {featured?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
