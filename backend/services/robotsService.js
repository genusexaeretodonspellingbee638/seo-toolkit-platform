const axios = require('axios');
const { normalizeDomain, ensureProtocol } = require('../utils/helpers');
const { getCache, setCache } = require('../utils/cache');

exports.analyze = async (domain) => {
  const cleanDomain = normalizeDomain(domain);
  const robotsUrl = `${ensureProtocol(cleanDomain)}/robots.txt`;

  const cached = await getCache(`robots:${cleanDomain}`);
  if (cached) return cached;

  const { data: robotsTxt } = await axios.get(robotsUrl, {
    timeout: 10000,
    headers: { 'User-Agent': 'SEO-Toolkit-Bot/1.0' },
  });

  const lines = robotsTxt.split('\n').map((l) => l.trim()).filter(Boolean);
  const allowRules = [];
  const disallowRules = [];
  const sitemaps = [];
  let currentUserAgent = '*';

  for (const line of lines) {
    if (line.startsWith('#')) continue;

    const [directive, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    const dir = directive.trim().toLowerCase();

    if (dir === 'user-agent') {
      currentUserAgent = value;
    } else if (dir === 'allow') {
      allowRules.push({ userAgent: currentUserAgent, path: value });
    } else if (dir === 'disallow') {
      disallowRules.push({ userAgent: currentUserAgent, path: value });
    } else if (dir === 'sitemap') {
      sitemaps.push(value);
    }
  }

  const result = {
    domain: cleanDomain,
    robotsUrl,
    rawContent: robotsTxt,
    allowRules,
    disallowRules,
    sitemaps,
    totalRules: allowRules.length + disallowRules.length,
  };

  await setCache(`robots:${cleanDomain}`, result, 3600);
  return result;
};
