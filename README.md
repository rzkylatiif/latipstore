# Latipstore — Full-Stack E-Commerce

Aplikasi toko online fashion pria dengan katalog produk, keranjang belanja, dan checkout yang memproses pesanan sekaligus mengurangi stok secara transaksional.

Dibangun sebagai proyek portofolio full-stack menggunakan stack yang umum dipakai di industri.

## Tech Stack

**Frontend**

- React + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query (data fetching & caching)
- Zustand (state keranjang, persisten via localStorage)
- React Hook Form + Zod (validasi form)
- Axios, React Router

**Backend**

- .NET 10 (ASP.NET Core Web API)
- Entity Framework Core (ORM + migrations)
- PostgreSQL (self-hosted)

## Fitur

- Katalog produk dari database dengan kategori dan gambar
- Keranjang belanja (tambah, ubah jumlah, hapus) yang persisten
- Checkout dengan validasi form
- Pemrosesan pesanan transaksional: menyimpan order, mengurangi stok, menolak jika stok tidak cukup
- Desain responsif

## Menjalankan Secara Lokal

### Prasyarat

- .NET 10 SDK
- Node.js
- PostgreSQL

### Backend

Masuk ke folder backend, set connection string via user-secrets, jalankan migration, lalu run:

- dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=ecommerce_db;Username=ecommerce_user;Password=YOUR_PASSWORD"
- dotnet ef database update
- dotnet run

API berjalan di http://localhost:5205

### Frontend

Masuk ke folder frontend:

- npm install
- npm run dev

Aplikasi berjalan di http://localhost:5173

## Arsitektur

React (5173) → REST API .NET (5205) → EF Core → PostgreSQL

## Pengembangan Selanjutnya

- Autentikasi (JWT) untuk admin & pelanggan
- Integrasi pembayaran
- Halaman detail produk & pencarian
- Riwayat pesanan pelanggan

---

Dibuat oleh Rizky Saputra Latief · GitHub: github.com/rzkylatiif · Portfolio: rzkylatif.my.id
