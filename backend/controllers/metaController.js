const metaService = require('../services/metaService');

exports.analyze = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parametresi gereklidir.' });
    }
    const data = await metaService.analyze(url);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Meta analiz hatası:', err.message);
    res.status(500).json({ error: 'Meta etiket analizi başarısız oldu.' });
  }
};
