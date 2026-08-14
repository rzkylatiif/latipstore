import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { createOrder } from "../api/orders";

// Aturan validasi form
const checkoutSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(10, "Nomor HP minimal 10 digit"),
  address: z.string().min(10, "Alamat terlalu pendek"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const formatRupiah = (angka: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  const onSubmit = async (data: CheckoutForm) => {
    try {
      await createOrder({
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        shippingAddress: data.address,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      setIsSuccess(true);
    } catch (error) {
      alert("Gagal membuat pesanan. Coba lagi.");
      console.error(error);
    }
  };

  // Halaman sukses
  if (isSuccess) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-teal-600" size={64} />
        <h1 className="text-2xl font-bold text-neutral-900">
          Pesanan Berhasil Dibuat!
        </h1>
        <p className="mt-2 text-neutral-500">
          Terima kasih sudah berbelanja. Pesananmu sedang kami proses.
        </p>
        <Link
          to="/produk"
          className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          Belanja Lagi
        </Link>
      </div>
    );
  }

  // Keranjang kosong
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          Belum ada yang bisa di-checkout
        </h1>
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
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 lg:col-span-2"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-neutral-900">
              Data Pengiriman
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Nama Lengkap
                </label>
                <input
                  {...register("name")}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600"
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600"
                  placeholder="email@contoh.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Nomor HP
                </label>
                <input
                  {...register("phone")}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600"
                  placeholder="08xxxxxxxxxx"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Alamat Lengkap
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600"
                  placeholder="Jalan, nomor rumah, kota, kode pos"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            Buat Pesanan
          </button>
        </form>

        {/* Ringkasan */}
        <div className="h-fit rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-neutral-900">
            Ringkasan Pesanan
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-neutral-600">
                  {item.name}{" "}
                  <span className="text-neutral-400">x{item.quantity}</span>
                </span>
                <span className="font-medium">
                  {formatRupiah(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-100 pt-4 text-lg font-bold">
            <span>Total</span>
            <span className="text-teal-700">{formatRupiah(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
