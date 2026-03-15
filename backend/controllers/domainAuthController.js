const domainAuthService = require('../services/domainAuthService');

exports.check = async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ error: 'Domain parametresi gereklidir.' });
    }
    const data = await domainAuthService.check(domain);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Domain Authority hatası:', err.message);
    res.status(500).json({ error: 'Domain Authority sorgusu başarısız oldu.' });
  }
};
