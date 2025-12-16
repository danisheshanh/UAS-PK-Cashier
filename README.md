# ☕ Coffee Shop Cashier - Kalkulator Kasir Coffee Shop

**Coffee Shop Cashier** adalah aplikasi web berbasis JavaScript yang berfungsi sebagai kalkulator kasir untuk coffee shop. Aplikasi ini memungkinkan pengguna untuk menghitung total pembayaran dengan sistem diskon otomatis dan mencetak struk pembayaran.

**Coffee Shop Cashier** dikembangkan oleh
**Kelompok 1**

**Mata Kuliah:** Pemrograman Komputer

**Dosen Pengampu:** Dr. Nur Mohammad Farda, S.Si., M.Cs.

**Anggota Kelompok:**
1. Amalia Nur Istiqomah - 25/561714/SV/26638
2. Danish Eshan H - 25/568772/SV/27529
3. Dyah Ayu Kusumaningrum - 25/567955/SV/27320
4. Ezra Jiwa Elshama - 25/560196/SV/26403
5. Grace Melvin Estrada - 25/555837/SV/25853
6. Muhammad Fatan Siddik - 25/557171/SV/26115
7. Semai Bulir Asa - 25/566352/SV/27066

## 📌 Fitur Utama

### 🛒 Sistem Pemesanan

- **15+ Menu Coffee Shop**: Espresso, Cappuccino, Latte, Mocha, Americano, dan lainnya
- **Input Jumlah Dinamis**: Tombol +/- untuk mengatur jumlah pesanan
- **Tambah Pesanan**: Menambahkan item ke dalam daftar pesanan
- **Reset Pesanan**: Mengosongkan semua pesanan dengan satu klik

### 💰 Sistem Pembayaran Otomatis

- **Perhitungan Otomatis**: Subtotal, diskon, dan total dihitung otomatis
- **Sistem Diskon Ganda**:
  - Diskon 5% untuk pembelian di atas Rp 100.000
  - Diskon tambahan 10% untuk pelanggan member
- **Format Mata Uang Rupiah**: Tampilan harga dalam format Rp

### 📱 Antarmuka Pengguna

- **Desain Responsif**: Dapat digunakan di desktop dan mobile
- **Status Real-time**: Status bar dengan informasi waktu terkini
- **Modal Struk Pembayaran**: Tampilan struk dalam modal terpisah
- **Validasi Input**: Pencegahan input tidak valid


## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur halaman web
- **CSS3** - Styling dan layout responsif
- **JavaScript (ES6+)** - Logika aplikasi dan interaktivitas

### Arsitektur Modul
- **Modular JavaScript** - Pemisahan kode menjadi modul terpisah


## 🎮 Cara Menggunakan

### 1. Memilih Menu
- Pilih item dari **dropdown menu** atau klik langsung dari **daftar menu**
- Atur jumlah menggunakan tombol **+/-** atau ketik langsung
- Harga satuan akan otomatis ditampilkan

### 2. Menambahkan Pesanan
- Klik tombol **"Tambah ke Pesanan"**
- Item akan muncul di bagian **"Daftar Pesanan"**
- Subtotal akan otomatis diperbarui

### 3. Mengatur Diskon
- Centang checkbox **"Pelanggan Member"** untuk diskon 10%
- Diskon 5% otomatis untuk pembelian di atas Rp 100.000

### 4. Menghitung Total
- Klik tombol **"Hitung Total"**
- Sistem akan menghitung:
  - Subtotal
  - Diskon (jika ada)
  - Total akhir
- Hasil ditampilkan di bagian **"Ringkasan Pembayaran"**

### 5. Mencetak Struk
- Klik tombol **"Cetak Struk"**
- Modal akan muncul dengan detail struk
- Tutup modal dengan klik × atau area di luar modal

### 6. Reset Pesanan
- Klik tombol **"Reset Pesanan"**
- Konfirmasi tindakan
- Semua pesanan akan dihapus


## ✅ Kriteria Teknis yang Dipenuhi

### 1. Percabangan (Branching) ✓
```javascript
// Contoh implementasi di order.js
if (subtotal > 100000) {
    discountRate += 0.05;  // Diskon 5% untuk pembelian > Rp 100.000
}
if (isMember) {
    discountRate += 0.10;  // Diskon 10% untuk pelanggan member
}
```

### 2. Perulangan (Looping) ✓
``` javascript
// Contoh implementasi di ui.js - Menampilkan semua menu
for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    // Kode untuk menampilkan setiap item menu
}

// Contoh validasi input
for (let i = 0; i < inputValue.length; i++) {
    if (!char.isDigit()) {
        // Validasi karakter input
    }
}
```

### 3. Fungsi/Prosedur Terpisah ✓
``` javascript
// File menu.js - Fungsi terkait data menu
export function getAllMenuItems() {
    return menuItems;
}

// File order.js - Fungsi manajemen pesanan
export function addOrderItem(itemId, quantity) {
    // Logika untuk menambah pesanan
}

// File ui.js - Fungsi manipulasi antarmuka
export function displayOrderItems(orders) {
    // Logika untuk menampilkan pesanan
}
```