const axios = require('axios');
const xml2js = require('xml2js');
const { normalizeDomain, ensureProtocol } = require('../utils/helpers');
const { getCache, setCache } = require('../utils/cache');

exports.analyze = async (url) => {
  let sitemapUrl = url.trim();

  // If it's just a domain, append /sitemap.xml
  if (!sitemapUrl.includes('sitemap')) {
    const cleanDomain = normalizeDomain(sitemapUrl);
    sitemapUrl = `${ensureProtocol(cleanDomain)}/sitemap.xml`;
  } else {
    sitemapUrl = ensureProtocol(sitemapUrl);
  }

  const cached = await getCache(`sitemap:${sitemapUrl}`);
  if (cached) return cached;

  const { data: xml, headers } = await axios.get(sitemapUrl, {
    timeout: 15000,
    headers: { 'User-Agent': 'SEO-Toolkit-Bot/1.0' },
  });

  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(xml);

  let urls = [];
  let isSitemapIndex = false;

  if (parsed.sitemapindex) {
    isSitemapIndex = true;
    const sitemaps = parsed.sitemapindex.sitemap;
    urls = (Array.isArray(sitemaps) ? sitemaps : [sitemaps]).map((s) => ({
      loc: s.loc,
      lastmod: s.lastmod || 'Bilinmiyor',
    }));
  } else if (parsed.urlset) {
    const urlEntries = parsed.urlset.url;
    urls = (Array.isArray(urlEntries) ? urlEntries : [urlEntries]).map((u) => ({
      loc: u.loc,
      lastmod: u.lastmod || 'Bilinmiyor',
      changefreq: u.changefreq || 'Bilinmiyor',
      priority: u.priority || 'Bilinmiyor',
    }));
  }

  const contentLength = headers['content-length']
    ? `${(parseInt(headers['content-length']) / 1024).toFixed(2)} KB`
    : `${(Buffer.byteLength(xml, 'utf8') / 1024).toFixed(2)} KB`;

  const result = {
    sitemapUrl,
    isSitemapIndex,
    totalUrls: urls.length,
    sitemapSize: contentLength,
    urls: urls.slice(0, 50), // Return first 50 for display
    lastModifiedDates: [...new Set(urls.map((u) => u.lastmod).filter((d) => d !== 'Bilinmiyor'))].slice(0, 10),
  };

  await setCache(`sitemap:${sitemapUrl}`, result, 3600);
  return result;
};
