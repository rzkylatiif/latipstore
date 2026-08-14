import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice());

  const formatRupiah = (angka: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  // Keranjang kosong
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <ShoppingBag className="mx-auto mb-4 text-neutral-300" size={56} />
        <h1 className="text-2xl font-bold text-neutral-900">
          Keranjang kamu kosong
        </h1>
        <p className="mt-2 text-neutral-500">
          Yuk mulai belanja dan temukan produk favoritmu.
        </p>
        <Link
          to="/produk"
          className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Keranjang</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Daftar barang */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-400">
                    {item.category}
                  </p>
                  <h3 className="font-semibold text-neutral-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-bold text-teal-700">
                    {formatRupiah(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-teal-600 hover:text-teal-700"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-teal-600 hover:text-teal-700"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="self-start text-neutral-400 transition hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Ringkasan */}
        <div className="h-fit rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-neutral-900">
            Ringkasan Belanja
          </h2>
          <div className="flex justify-between border-b border-neutral-100 pb-3 text-sm text-neutral-600">
            <span>Total Item</span>
            <span>{items.reduce((s, i) => s + i.quantity, 0)} produk</span>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold text-neutral-900">
            <span>Total</span>
            <span className="text-teal-700">{formatRupiah(totalPrice)}</span>
          </div>
          <Link
            to="/checkout"
            className="block rounded-lg bg-teal-600 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
          >
            Lanjut ke Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
