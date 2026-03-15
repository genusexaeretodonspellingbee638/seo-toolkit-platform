const robotsService = require('../services/robotsService');

exports.analyze = async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) {
      return res.status(400).json({ error: 'Domain parametresi gereklidir.' });
    }
    const data = await robotsService.analyze(domain);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Robots.txt hatası:', err.message);
    res.status(500).json({ error: 'Robots.txt analizi başarısız oldu.' });
  }
};
