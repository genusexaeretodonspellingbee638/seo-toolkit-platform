const pagespeedService = require('../services/pagespeedService');

exports.analyze = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir.' });
    }
    const data = await pagespeedService.analyze(url);
    res.json({ success: true, data });
  } catch (err) {
    console.error('PageSpeed hatası:', err.message);
    if (err.response && err.response.status === 429) {
      return res.status(429).json({ error: 'PageSpeed API kotası doldu. Hız limitine takıldınız. Lütfen daha sonra tekrar deneyin veya .env dosyasına GOOGLE_PAGESPEED_API_KEY ekleyin.' });
    }
    res.status(500).json({ error: 'PageSpeed analizi başarısız oldu.' });
  }
};
