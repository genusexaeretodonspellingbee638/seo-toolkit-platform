# 🔍 SEO Toolkit Platform

Modern, full-stack SEO araçları platformu. WHOIS sorgulama, meta etiket analizi, robots.txt test, site haritası analizi, sayfa hızı testi, backlink kontrol ve domain otorite skorlama araçlarını tek bir arayüzde sunar.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Tech Stack](https://img.shields.io/badge/Vite-8-purple) ![Tech Stack](https://img.shields.io/badge/TailwindCSS-4-cyan) ![Tech Stack](https://img.shields.io/badge/Node.js-Express-green) ![Tech Stack](https://img.shields.io/badge/PostgreSQL-blue)

---

## 📋 Özellikler

| Araç | Açıklama | API Endpoint |
|------|----------|-------------|
| **WHOIS Sorgulama** | Domain kayıt bilgileri, name server, tarihler | `GET /api/whois?domain=example.com` |
| **Meta Etiket Analizi** | Title, description, OG tags, sayfa istatistikleri | `GET /api/meta-analyzer?url=https://example.com` |
| **Robots.txt Test** | Allow/disallow kuralları, sitemap linkleri | `GET /api/robots?domain=example.com` |
| **Site Haritası Analizi** | URL sayısı, boyut, son düzenlenme tarihleri | `GET /api/sitemap?url=example.com` |
| **Sayfa Hızı Testi** | Google PageSpeed puanları ve Core Web Vitals | `GET /api/pagespeed?url=https://example.com` |
| **Backlink Kontrol** | Backlink listesi, dofollow/nofollow, pagination | `GET /api/backlinks?domain=example.com&page=1` |
| **Domain Otorite** | DA, PA, spam skoru (simülasyon) | `GET /api/domain-authority?domain=example.com` |

---

## 🛠️ Teknoloji

**Frontend:** React 18 · Vite · TailwindCSS v4 · React Router · Axios · React Icons

**Backend:** Node.js · Express · Axios · Cheerio · whois-json · xml2js

**Veritabanı:** PostgreSQL (opsiyonel – demo verisi ile de çalışır)

**Diğer:** Redis caching (opsiyonel) · Helmet · express-rate-limit

---

## 📂 Proje Yapısı

```
seo-toolkit-platform/
├── frontend/                # React + Vite + TailwindCSS
│   └── src/
│       ├── components/      # Navbar, Footer, LoadingSpinner, ResultCard, ScoreCircle
│       ├── pages/           # HomePage, WhoisPage, MetaAnalyzerPage, ...
│       ├── api.js           # Axios instance
│       ├── App.jsx          # Router setup
│       └── index.css        # TailwindCSS + custom styles
├── backend/                 # Node.js + Express
│   ├── routes/              # Express route definitions
│   ├── controllers/         # Request handlers
│   ├── services/            # Business logic
│   ├── utils/               # db.js, cache.js, helpers.js
│   ├── server.js            # Express app entry
│   └── .env.example         # Environment variables template
├── database/
│   └── init.sql             # PostgreSQL migration + seed data
└── README.md
```

---

## 🚀 Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/your-username/seo-toolkit-platform.git
cd seo-toolkit-platform
```

### 2. Backend kurulumu

```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenleyin (isteğe bağlı: PostgreSQL ve Google API key)
```

### 3. Frontend kurulumu

```bash
cd frontend
npm install
```

### 4. PostgreSQL (Opsiyonel)

```bash
# PostgreSQL veritabanı oluşturun
createdb seo_toolkit

# Migration script'ini çalıştırın
psql -d seo_toolkit -f database/init.sql
```

> **Not:** PostgreSQL kurulmamış olsa bile uygulama demo verisi ile çalışır.

### 5. Uygulamayı başlatın

**Backend** (port 3001):
```bash
cd backend
npm run dev
```

**Frontend** (port 5173):
```bash
cd frontend
npm run dev
```

Tarayıcıda açın: `http://localhost:5173`

---

## 🔑 Environment Variables

| Değişken | Açıklama | Zorunlu |
|----------|----------|---------|
| `PORT` | Backend port (varsayılan: 3001) | Hayır |
| `DATABASE_URL` | PostgreSQL bağlantı string'i | Hayır |
| `REDIS_URL` | Redis bağlantı string'i | Hayır |
| `GOOGLE_PAGESPEED_API_KEY` | Google PageSpeed API key | Hayır |

---

## 📡 API Örnekleri

### WHOIS Sorgulama
```json
GET /api/whois?domain=google.com

{
  "success": true,
  "data": {
    "domain": "google.com",
    "registrar": "MarkMonitor Inc.",
    "creationDate": "1997-09-15",
    "expirationDate": "2028-09-14",
    "nameServers": ["ns1.google.com", "ns2.google.com"],
    "domainStatus": ["clientDeleteProhibited"]
  }
}
```

### Meta Etiket Analizi
```json
GET /api/meta-analyzer?url=https://google.com

{
  "success": true,
  "data": {
    "title": "Google",
    "metaDescription": "...",
    "canonical": "https://www.google.com/",
    "ogTitle": "Google",
    "h1Count": 0,
    "totalImages": 1,
    "totalLinks": 15
  }
}
```

### Backlink Kontrol
```json
GET /api/backlinks?domain=example.com&page=1&limit=10

{
  "success": true,
  "data": {
    "domain": "example.com",
    "backlinks": [
      {
        "source_url": "https://blog.techsite.com/best-tools",
        "anchor_text": "Example Tools",
        "follow_type": "dofollow",
        "created_at": "2024-01-15"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalResults": 6
    }
  }
}
```

---

## 🎨 UI Özellikleri

- 🌙 Modern dark theme tasarım
- 💎 Glassmorphism kart efekti
- 📱 Tam responsive tasarım
- ⚡ Animasyonlu skor çemberleri
- 🔄 Loading state ve error handling
- 🎯 Gradient renk paleti
- 📊 Tablo ve kart görünümleri

---

## 📝 Lisans

MIT License
