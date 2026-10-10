# 🏁 Race Manager — Design System & UI Specification (`design.md`)

> **Versi:** 2.1.0  
> **Status:** Active Standard (Single Source of Truth)  
> **Tujuan:** Menetapkan standar estetika antarmuka (UI/UX) bertema federasi motorsport dunia (*FIA / World Motorsport Commission*), kombinasi warna yang adil (*equitable & accessible color contrast*), keterbacaan teks tingkat tinggi (*high-legibility typography*), hierarki tombol aksi, dan standarisasi SVG icon.

---

## 1. Filosofi Estetika Tampilan & Kombinasi Warna yang Adil

### 1.1 Tema Dualitas: *Federation White-Blue & Grand Prix Dark Telemetry*
Race Manager menerapkan arsitektur tema dualitas yang adil dan adaptif sesuai konteks pengalaman pengguna:

1. **Tema Default Manajemen: *FIA Federation White & Action Blue***
   - **Karakter:** Bersih, terstruktur, resmi, dan berwibawa seperti kantor pusat asosiasi motorsport dunia.
   - **Penerapan:** Aktif di seluruh halaman manajemen liga (Race Control HQ, Lokasi Sirkuit, Buku Regulasi, Karakteristik & Spek, Grid Tim & Bursa, Scrutineering, Finansial, dan Pengaturan).
   - **Palet Utama:**
     - **Canvas Background:** `#F8FAFC` (Slate 50) — Latar utama layar, bukan putih murni, sangat empuk di mata.
     - **Surface / Card:** `#FFFFFF` — Latar kartu/panel agar naik satu layer di atas canvas.
     - **Borders & Dividers:** `#E2E8F0` (Slate 200) — Garis pemisah tipis yang tegas tanpa terasa tajam.
     - **Primary Text (Heading):** `#0F172A` (Slate 900) — Teks utama; hitam kebiruan gelap yang jauh lebih nyaman daripada #000000.
     - **Secondary Text (Label/Muted):** `#475569` (Slate 600) — Label kecil, deskripsi, sub-heading.
     - **Accent / Action Blue:** `#2563EB` (Blue 600) — Tombol utama, link aktif, toggle slider.
     - **Subtle Blue Tint (Hover/Active):** `#EFF6FF` (Blue 50) — Background item aktif, badge info, hover kartu.
     - **Icon Stroke:** `#64748B` (Slate 500) — Warna default icon SVG agar tidak mendominasi teks.

2. **Mode Sesi Balap Intens: *Grand Prix Dark Telemetry Mode***
   - **Karakter:** Suasana ruang kendali sirkuit yang serius, intens, dan berfokus pada telemetri malam (*pit-wall telemetry*).
   - **Penerapan:** Otomatis aktif **hanya saat sesi Grand Prix berlangsung** (`liveRace.isRacing === true`).
   - **Palet Utama:** Latar belakang arang gelap (`#0A0B0E`), konsol permukaan gelap (`#11141C`), teks kontras tinggi putih es (`#F0F4F8`), dan aksen bendera balap (Green, Amber VSC, Crimson Safety Car). Begitu sesi selesai, aplikasi kembali secara mulus ke tema putih-biru federasi.

---

### 1.2 Prinsip Kombinasi Warna yang Adil (*Equitable Color Contrast*)
Prinsip "Warna yang Adil" menjamin bahwa setiap pemain dapat membaca seluruh informasi, angka telemetri, dan deskripsi regulasi tanpa kelelahan mata (*eye fatigue*) atau kesulitan akibat kontras buruk:

1. **Kepatuhan Rasio Kontras WCAG 2.1 Level AA & AAA:**
   - **Teks Konten & Body Text:** Rasio kontras wajib minimal **4.5:1** terhadap latar belakang permukaannya (`#0F172A` di `#FFFFFF` mencapai **15.2:1**).
   - **Teks Judul & Headline:** Rasio kontras minimal **3.0:1** (skala besar >18px tebal).
   - **Elemen Kontrol Interaktif (Input, Select, Button, Slider):** Garis batas wajib minimal **3.0:1** terhadap latar sekitarnya (`#2563EB` di `#FFFFFF` mencapai **4.6:1**).
   - **Larangan Kontras Buta:** Dilarang keras menempatkan teks putih (`#FFFFFF`) di atas latar putih (`#FFFFFF`), atau teks abu-abu gelap di atas latar gelap tanpa token semantik yang dinamis.

2. **Dualitas Token Semantik yang Dinamis:**
   Setiap token warna secara otomatis berganti nilai bergantung pada kelas tema aktif:
   - `--clr-white-pure`: Bernilai `#0F172A` (teks gelap kontras tinggi) di tema default White-Blue, dan berganti menjadi `#FFFFFF` (putih murni) saat berada di dalam `.theme-grandprix-dark`.
   - `--clr-text-primary`: `#0F172A` (kontras ~15:1 di putih) vs `#F0F4F8` (kontras ~14:1 di gelap).
   - `--clr-text-secondary`: `#475569` (kontras ~7:1 di putih) vs `#94A3B8` (kontras ~6.5:1 di gelap).
   - `--clr-text-muted`: `#64748B` (kontras ~4.6:1 di putih) vs `#64748B` di gelap.
   - `--clr-icon-default`: `#64748B` (Slate 500) agar netral dan tidak mendominasi teks.

3. **Keadilan Makna Warna Status (Tidak Ambigu):**
   Warna status balapan memiliki arti yang konsisten di semua layar:
   - **Hijau (`#16A34A` / `#2ECC71`):** Saldo surplus, transponder aktif, lolos uji kepatuhan teknis, bendera hijau normal (*Green Flag*).
   - **Amber / Emas (`#2563EB` di aksen UI / `#F5A623` di balap):** Peringatan pengawas, degradasi ban tinggi, Virtual Safety Car (VSC), piala podium.
   - **Merah (`#DC2626` / `#EF4444`):** Pelanggaran berat, investigasi terbuka, Full Safety Car (SC), tombol darurat / abort.
   - **Biru / Cyan (`#2563EB` / `#0284C7` / `#38BDF8`):** Data delta telemetri, lisensi federasi aktif, info regulasi.

---

### 1.3 Estetika Tampilan yang Bersih (*Anti-Visual Clutter & Anti AI-Slop*)
1. **Reduksi Border Glow Berlebih:**
   - **Dilarang** menggunakan efek border glow neon tebal atau permanen pada kartu, panel, tabel, maupun kontainer statis.
   - Glow hanya diperbolehkan dengan opasitas sangat halus (maksimal **10%–15%**, spread **4px–8px**) saat hover pada tombol aksi primer atau saat ada peringatan insiden kritis.
2. **Garis Batas Tegas (*Crisp 1px Border*):**
   - Struktur komponen dipisahkan menggunakan garis batas tegas berukuran `1px` solid (`var(--clr-border-subtle)` / `var(--clr-border-default)` bernilai `#E2E8F0`), bukan tumpukan bayangan gelap tebal yang membuat antarmuka terasa kotor.
3. **Bayangan Halus (*Soft Diffused Elevation*):**
   - Menggunakan bayangan kartu bernilai lembut (`box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.03)` pada tema canvas) untuk kedalaman yang elegan.

---

## 2. Keterbacaan Tulisan (*High-Legibility Typography Standards*)

Keterbacaan teks adalah prioritas tertinggi dalam game bertema manajer motorsport yang sarat data telemetri, tabel klasifikasi, dan pasal regulasi:

### 2.1 Peran Keluarga Huruf (*Font Families*)
1. **`Orbitron` (Display & Brand Title):**
   - Khusus lambang resmi, logo "RACE MANAGER", dan judul utama dokumen kejuaraan.
   - Sifat: Otoritatif, futuristik, bersudut tegas.
2. **`Rajdhani` (Headers, Timer & Numbers):**
   - Khusus judul seksi (`h1`, `h2`), label tombol, jam putaran lap `MM:SS`, posisi balap `P1..P12`, dan nominal uang finansial.
   - Sifat: Padat, proporsional, mudah dibaca dalam pemindaian cepat (*rapid scanning*).
3. **`Inter` (Body Text, Tables & Forms):**
   - Fondasi keterbacaan antarmuka di seluruh deskripsi kasus investigasi, tabel klasifikasi, opsi formulir, dan aturan regulasi.
   - Sifat: Sangat netral, jarak antar-huruf teroptimasi untuk layar digital, tidak melelahkan mata.

### 2.2 Batas Ukuran & Skala Font
* **Batas Teks Terkecil:** Minimum `12px` (`--text-xs`). Teks ukuran `10px` atau `11px` hanya diperbolehkan untuk tag mikro / status badge berbobot tebal (`font-weight: 700`).
* **Hirarki Ukuran Standar:**
  ```css
  --text-xs:   12px; /* Minimum standar: caption, label sub-metrik, unit */
  --text-sm:   13px; /* Teks baris tabel, deskripsi insiden, opsi select */
  --text-base: 14px; /* Teks standar antarmuka, input form, tombol medium */
  --text-md:   16px; /* Sub-heading kartu panel, display angka kompak */
  --text-lg:   18px; /* Judul modul kartu, tab aktif, nama sirkuit */
  --text-xl:   22px; /* Judul seksi halaman, angka lap counter */
  --text-2xl:  26px; /* Judul display utama dashboard */
  ```

### 2.3 Fitur OpenType Wajib Font `Inter` (*Tabular Numbers*)
Pada seluruh tampilan data yang memuat angka, waktu, atau klasifikasi, wajib menerapkan fitur OpenType berikut:
```css
font-feature-settings: 'tnum' 1, 'cv05' 1, 'cv11' 1;
```
* **`'tnum'` (*Tabular Numbers*):** Memastikan semua angka `0` sampai `9` memiliki lebar karakter yang seragam (*monospaced width*). Angka tidak akan bergetar atau berguncang saat penghitung waktu putaran lap bergerak maju.
* **`'cv05'` & `'cv11'`:** Membedakan dengan tegas antara angka `1`, huruf kecil `l`, dan huruf besar `I` agar kode sasis dan telemetri tidak menimbulkan salah tafsir.

### 2.4 Rasio Tinggi Baris (*Line-Height Ergonomics*)
* **Teks Paragraf & Narasi Regulasi:** `line-height: 1.55 – 1.6` dengan perataan kiri natural.
* **Baris Data Tabel & Input Kompak:** `line-height: 1.35 – 1.4` untuk kepadatan informasi yang teratur.

---

## 3. Matriks Palet Warna Spesifik (*Color Palette & Tokens Matrix*)

### 3.1 Spesifikasi Palet Warna Utama
| Komponen UI | Hex Code | Peran Visual |
| :--- | :--- | :--- |
| **Canvas Background** | `#F8FAFC` (Slate 50) | Latar utama layar, bukan putih murni, sangat empuk di mata |
| **Surface / Card** | `#FFFFFF` | Latar kartu/panel agar naik satu layer di atas canvas |
| **Borders & Dividers** | `#E2E8F0` (Slate 200) | Garis pemisah tipis yang tegas tanpa terasa tajam |
| **Primary Text (Heading)** | `#0F172A` (Slate 900) | Teks utama; hitam kebiruan gelap yang jauh lebih nyaman daripada `#000000` |
| **Secondary Text (Label/Muted)** | `#475569` (Slate 600) | Label kecil, deskripsi, sub-heading |
| **Accent / Action Blue** | `#2563EB` (Blue 600) | Tombol utama, link aktif, toggle slider |
| **Subtle Blue Tint (Hover/Active)** | `#EFF6FF` (Blue 50) | Background item aktif, badge info, hover kartu |
| **Icon Stroke** | `#64748B` (Slate 500) | Warna default icon SVG agar tidak mendominasi teks |

### 3.2 Pemetaan Token CSS Variabel
| Token CSS | Nilai Tema Default (White & Blue) | Nilai Mode Grand Prix (Dark Telemetry) | Penggunaan Semantik |
| :--- | :--- | :--- | :--- |
| `--clr-bg-primary` | `#F8FAFC` (Slate 50) | `#0A0B0E` (Charcoal Deep) | Latar dasar seluruh jendela aplikasi |
| `--clr-bg-surface` | `#FFFFFF` (Pure White) | `#11141C` (Dark Console) | Topbar navigation bar, header |
| `--clr-bg-card` | `#FFFFFF` (Pure White) | `#161B22` (Dark Surface) | Kartu modul, kontainer tabel |
| `--clr-bg-elevated`| `#EFF6FF` (Blue 50) | `#1E2530` (Elevated Panel) | Input form, item list hover, chip |
| `--clr-blue-tint` | `#EFF6FF` (Blue 50) | `rgba(56, 189, 248, 0.12)` | Background item aktif, badge info, hover kartu |
| `--clr-border-subtle`| `#E2E8F0` (Slate 200) | `#1E2433` (Subtle Dark) | Garis pemisah tabel, batas kartu |
| `--clr-border-default`| `#E2E8F0` (Slate 200) | `#2A3245` (Control Border) | Border tombol outline & select |
| `--clr-border-strong`| `#CBD5E1` (Slate 300) | `#3D4862` (Hover Border) | Border kartu hover |
| `--clr-blue-primary`| `#2563EB` (Action Blue 600) | `#38BDF8` (Telemetry Cyan) | Aksen otoritas federasi, tombol CTA utama |
| `--clr-amber` | `#2563EB` (Action Blue) | `#F5A623` (Racing Gold) | Status peringatan, VSC, podium |
| `--clr-white-pure` | `#0F172A` (Slate 900) | `#FFFFFF` (Pure White Text) | Judul kartu, teks bernilai kontras tinggi |
| `--clr-text-primary`| `#0F172A` (Slate 900) | `#F0F4F8` (Ice White) | Teks utama body & angka |
| `--clr-text-secondary`| `#475569` (Slate 600) | `#8B97A8` (Slate 400) | Deskripsi regulasi, label pendamping |
| `--clr-text-muted` | `#64748B` (Slate 500) | `#64748B` (Slate 500) | Caption, satuan unit, placeholder |
| `--clr-icon-default`| `#64748B` (Slate 500) | `#8B97A8` (Slate 400) | Warna default icon SVG agar tidak mendominasi teks |

---

## 4. Standar Interaksi UI & Komponen

### 4.1 Topbar Navigasi Model *Squeeze* (Accordion Nav)
* **Semua Menu Terlihat Tanpa Scroll:** 8 tautan navigasi muat dalam satu baris header tanpa memerlukan scrollbar horizontal.
* **Item Terpilih Melebar Otomatis:** Item aktif (`.active`) dan item saat di-hover melebar secara dinamis memperlihatkan teks namanya (`max-width: 150px; opacity: 1; margin-left: 7px`), sementara item yang tidak aktif tetap ringkas berupa ikon dengan *native tooltip* (`max-width: 0; opacity: 0`).
* **Durasi Animasi:** `0.24s – 0.28s` dengan kurva `cubic-bezier(0.4, 0, 0.2, 1)`.

### 4.2 Hierarki Tombol Aksi (*Action Buttons*)
1. **Primary Button (`.rm-btn-primary`):**  
   - White-Blue: Latar Action Blue `#2563EB`, teks putih murni `#FFFFFF`, hover `#1D4ED8`.
   - GP Dark: Latar Amber `#F5A623`, teks gelap `#0A0C10`, hover `#FFC95A`.
   - Kuota: Maksimal 1 tombol primer per pandangan aktif.
2. **Secondary / Outline Button (`.rm-btn-outline`):**  
   - Latar permukaan kartu `#FFFFFF`, border `1px solid var(--clr-border-default)` (`#E2E8F0`), teks `var(--clr-text-primary)` (`#0F172A`), hover background `var(--clr-blue-tint)` (`#EFF6FF`).
3. **Ghost Button (`.rm-btn-ghost`):**  
   - Latar transparan, warna teks sekunder, berubah cerah saat hover.
4. **Danger / Destructive Button (`.rm-btn-danger`):**  
   - Latar transparan bertinta crimson `rgba(239, 68, 68, 0.12)`, border `1px solid rgba(239, 68, 68, 0.35)`, teks crimson `#EF4444`.

### 4.3 Formulir & Kendali Input (*Form Controls*)
* Seluruh input teks, dropdown select, dan range slider memiliki latar belakang `var(--clr-bg-card)` (`#FFFFFF`), border `1px solid var(--clr-border-default)` (`#E2E8F0`), dan teks `var(--clr-text-primary)` (`#0F172A`).
* Saat *focus*, batas berganti menjadi `var(--clr-blue-primary)` (`#2563EB`) tanpa outline bawaan browser yang merusak estetika.

---

## 5. Standarisasi Ikon SVG (*SVG Icon Component*)
* **Komponen Tunggal:** Menggunakan `<Icon name="..." size={...} />` di [Icon.jsx](file:///d:/Data%20Project/Personal%20Project/Circuit%20Rush/src/components/common/Icon.jsx).
* **Warna Default Stroke:** Berwarna `#64748B` (Slate 500) melalui CSS token `--clr-icon-default` agar tampil rapi dan tidak mendominasi teks utama.
* **Pewarnaan Dinamis:** Menggunakan `stroke="currentColor"` sehingga otomatis mengikuti aksen saat berada di dalam tombol aktif, badge, tab aktif, atau tautan hover.
* **Ukuran Standar:**
  - Micro Inline (14px): Tag dan indikator status tabel.
  - Button & Nav (16px–18px): Menu top bar, tombol aksi.
  - Header Section (20px–22px): Judul kartu dan judul halaman.
  - Crest Emblem (42px): Lambang resmi federasi [RMLogo.jsx](file:///d:/Data%20Project/Personal%20Project/Circuit%20Rush/src/components/common/RMLogo.jsx).

---

*Dokumen ini merupakan pedoman wajib dan standar tunggal antarmuka Race Manager.*
