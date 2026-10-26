# PB_WEB_JS_MODUL 6

Perancangan 
1. Fitur preferensi dark mdoe
Logika preferensi tema diatur melalui fungsi `toggleTema()` yang mengubah kelas `dark-mode` pada `document.body` dan menyimpan status `"dark"` atau `"light"` ke `localStorage` menggunakan kunci `"tema"`. Saat halaman dibuka, fungsi `muatPreferensiTema()` dieksekusi secara otomatis untuk membaca kunci `"tema"` dan menerapkan tampilan yang sesuai.

2. Fitur like per artikel
Fungsi `simpanLike(judulArtikel, jumlah)` mengelola objek `semuaLike` di mana judul artikel berfungsi sebagai kunci pembeda. Data dibaca dari `localStorage` dengan `JSON.parse()`, diperbarui nilainya, lalu disimpan kembali dengan `JSON.stringify()`. Dalam *event listener* tombol *like*, judul artikel diekstrak dari elemen DOM sebelum memanggil `simpanLike()`. Saat artikel dirender, jumlah *like* dibaca kembali untuk menyinkronkan tampilan tombol.

3. Fitur daftar komentar
Fungsi `simpanKomentar(nama, pesan)` mengambil *array* komentar dari `localStorage`, menambahkan objek komentar baru, dan menyimpannya kembali dalam format JSON. Fungsi `muatKomentar()` mengekstrak elemen DOM `<ul>` melalui `document.getElementById()`, membaca *array* dari storage, lalu merender elemen `<li>` untuk setiap komentar saat halaman dimuat.</li></ul>

4. Fitur reset data
Fitur reset diimplementasikan dengan tombol `#btn-reset`. Saat diklik, sistem menampilkan dialog konfirmasi `confirm()`. Jika dikonfirmasi, fungsi `localStorage.clear()` dipanggil untuk menghapus seluruh data pada *origin*, dilanjutkan dengan `location.reload()` agar tampilan kembali ke kondisi awal.

