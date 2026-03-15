const whoisService = require('../services/whoisService');

exports.lookup = async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ error: 'Domain parametresi gereklidir.' });
    }
    const data = await whoisService.lookup(domain);
    res.json({ success: true, data });
  } catch (err) {
    console.error('WHOIS hatası:', err.message);
    res.status(500).json({ error: 'WHOIS sorgusu başarısız oldu.' });
  }
};
