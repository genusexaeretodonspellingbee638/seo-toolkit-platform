const backlinkService = require('../services/backlinkService');

exports.getBacklinks = async (req, res) => {
  try {
    const { domain, page = 1, limit = 10 } = req.query;
    if (!domain) {
      return res.status(400).json({ error: 'Domain parametresi gereklidir.' });
    }
    const data = await backlinkService.getBacklinks(domain, parseInt(page), parseInt(limit));
    res.json({ success: true, data });
  } catch (err) {
    console.error('Backlink hatası:', err.message);
    res.status(500).json({ error: 'Backlink sorgusu başarısız oldu.' });
  }
};
