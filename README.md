# Crossword Stack

Web App untuk membuat dan bermain Teka-Teki Silang (Crossword Puzzle). Buat puzzle custom dengan kata-kata dan clue pilihanmu, lalu mainkan atau bagikan dengan teman.

## Tentang Project

Crossword Stack adalah platform interaktif di mana pengguna dapat:

- Membuat crossword puzzle custom dengan algoritma generate otomatis
- Bermain puzzle dengan pengalaman interaktif (keyboard navigation, timer, hints)
- Mencatat skor dan bersaing di leaderboard
- Mengeksport puzzle ke PDF

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 7** - Build tool dan development server
- **React Router v7** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components (Dialog, Select, Tabs, dll)
- **Lucide React** - Icon library
- **CVA (Class Variance Authority)** - Component variant management

### Utilities
- **html2pdf.js** - PDF export
- **date-fns** - Date formatting
- **clsx & tailwind-merge** - ClassName utilities

### Development
- **ESLint** - Code linting
- **PostCSS + Autoprefixer** - CSS processing

## Cara Menjalankan di Lokal

### Prerequisites
- Node.js (v18 atau lebih tinggi)
- npm atau bun
- Backend server harus berjalan di port `3001`

### Instalasi

```bash
# Clone repository
git clone https://github.com/YudaKusuma16/crossword-stack.git
cd crossword-stack

# Install dependencies
npm install

# Install dependencies server
cd server
npm install
```

### Development

```bash
# Jalankan vite
cd crossword-stack
npm run dev

# Jalankan server
cd server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Daftar Fitur

### Autentikasi
- **Login** dengan email/username atau password
- **Register** akun baru
- **Protected Routes** untuk halaman yang membutuhkan login
- **Token JWT** yang disimpan di localStorage

### Puzzle Creator (`/creator`)
- Input kata dan clue (minimal 3, maksimal 20 kata)
- **Generate Grid Otomatis** dengan algoritma khusus
- Preview grid secara real-time
- Edit puzzle yang sudah ada
- Simpan dengan status "Published" atau "Draft"

### Puzzle Player (`/play/:id`)
- Tampilan grid TTS interaktif dan responsif
- **Keyboard Navigation** (arrow keys, tab, backspace)
- **Timer** yang berjalan otomatis saat puzzle dimulai
- **Sistem Hint** (maksimal 3 hints per puzzle)
- **Validasi Jawaban** untuk mengecek kebenaran
- **Progress Bar** untuk melihat sejauh mana puzzle terisi
- **Export ke PDF** untuk dimainkan offline
- **Share Link** puzzle ke teman

### My Puzzles (`/my-puzzles`)
- Daftar semua puzzle yang telah dibuat
- Edit puzzle yang sudah ada
- Hapus puzzle
- Filter berdasarkan status (Published/Draft)

### Leaderboard (`/leaderboard/:puzzleId`)
- Peringkat pemain berdasarkan skor
- **Score Formula**: `Time + (5 seconds × hints used)`
- Tampilan top players dengan ikon medali

### Home Page (`/`)
- Daftar puzzle yang tersedia untuk dimainkan
- Filter puzzle berdasarkan status
- Quick actions: Play, Share, View Leaderboard


## Konfigurasi API

Aplikasi ini memerlukan backend server yang berjalan di port `3001`. Konfigurasi proxy ada di `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    }
  }
}
```

### API Endpoints

#### Auth
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

#### Puzzles
- `GET /api/puzzles` - Get all puzzles
- `GET /api/puzzles/:id` - Get puzzle by ID
- `POST /api/puzzles` - Create new puzzle
- `PUT /api/puzzles/:id` - Update puzzle
- `DELETE /api/puzzles/:id` - Delete puzzle
- `GET /api/puzzles/user/my` - Get current user's puzzles

#### Scores
- `POST /api/scores` - Submit score
- `GET /api/scores/puzzle/:puzzleId` - Get leaderboard
- `GET /api/scores/puzzle/:puzzleId/user` - Get user scores


## Author

Yuda Kusuma - [GitHub](https://github.com/YudaKusuma16)
