const sitemapService = require('../services/sitemapService');

exports.analyze = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir.' });
    }
    const data = await sitemapService.analyze(url);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Sitemap hatası:', err.message);
    res.status(500).json({ error: 'Sitemap analizi başarısız oldu.' });
  }
};
