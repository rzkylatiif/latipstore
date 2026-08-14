import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";

function CatalogPage() {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Katalog Produk</h1>
        <p className="mt-2 text-neutral-500">
          Koleksi fashion pria pilihan untuk gaya kasual maupun formal.
        </p>
      </div>

      {isLoading && (
        <p className="py-20 text-center text-neutral-500">Memuat produk...</p>
      )}
      {isError && (
        <p className="py-20 text-center text-teal-700">Gagal memuat produk.</p>
      )}

      {products && (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
