function Footer() {
  return (
    <footer className="mt-20 bg-teal-700 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">
              LATIP<span className="font-light text-teal-100">STORE</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-teal-50/80">
              Toko fashion pria modern dengan produk berkualitas dan harga
              bersahabat.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Navigasi</p>
            <ul className="space-y-2 text-sm text-teal-50/80">
              <li>Beranda</li>
              <li>Produk</li>
              <li>Keranjang</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">Kontak</p>
            <ul className="space-y-2 text-sm text-teal-50/80">
              <li>hello@latipstore.com</li>
              <li>Tangerang Selatan, ID</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-teal-600 pt-6 text-center text-xs text-teal-100/70">
          © 2026 Latipstore. Dibangun dengan React, TypeScript & .NET.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
