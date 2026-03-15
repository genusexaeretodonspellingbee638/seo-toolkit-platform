require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const whoisRoutes = require('./routes/whoisRoutes');
const metaRoutes = require('./routes/metaRoutes');
const robotsRoutes = require('./routes/robotsRoutes');
const sitemapRoutes = require('./routes/sitemapRoutes');
const pagespeedRoutes = require('./routes/pagespeedRoutes');
const backlinkRoutes = require('./routes/backlinkRoutes');
const domainAuthRoutes = require('./routes/domainAuthRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// --------------- Middleware ---------------
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting – max 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.' },
});
app.use(limiter);

// --------------- Routes ---------------
app.use('/api/whois', whoisRoutes);
app.use('/api/meta-analyzer', metaRoutes);
app.use('/api/robots', robotsRoutes);
app.use('/api/sitemap', sitemapRoutes);
app.use('/api/pagespeed', pagespeedRoutes);
app.use('/api/backlinks', backlinkRoutes);
app.use('/api/domain-authority', domainAuthRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Sunucu hatası:', err.message);
  res.status(500).json({ error: 'Sunucu hatası oluştu.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
  console.log(`   http://localhost:${PORT}`);
});

module.exports = app;
