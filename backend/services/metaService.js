const axios = require('axios');
const cheerio = require('cheerio');
const { ensureProtocol } = require('../utils/helpers');
const { getCache, setCache } = require('../utils/cache');

exports.analyze = async (url) => {
  const fullUrl = ensureProtocol(url);

  const cached = await getCache(`meta:${fullUrl}`);
  if (cached) return cached;

  const { data: html } = await axios.get(fullUrl, {
    timeout: 10000,
    headers: {
      'User-Agent': 'SEO-Toolkit-Bot/1.0',
    },
  });

  const $ = cheerio.load(html);

  const result = {
    url: fullUrl,
    title: $('title').text() || 'Bulunamadı',
    metaDescription:
      $('meta[name="description"]').attr('content') || 'Bulunamadı',
    canonical: $('link[rel="canonical"]').attr('href') || 'Bulunamadı',
    robots: $('meta[name="robots"]').attr('content') || 'Bulunamadı',
    ogTitle:
      $('meta[property="og:title"]').attr('content') || 'Bulunamadı',
    ogDescription:
      $('meta[property="og:description"]').attr('content') || 'Bulunamadı',
    ogImage:
      $('meta[property="og:image"]').attr('content') || 'Bulunamadı',
    ogUrl:
      $('meta[property="og:url"]').attr('content') || 'Bulunamadı',
    charset: $('meta[charset]').attr('charset') || 
             $('meta[http-equiv="Content-Type"]').attr('content') || 'Bulunamadı',
    viewport: $('meta[name="viewport"]').attr('content') || 'Bulunamadı',
    h1Count: $('h1').length,
    h2Count: $('h2').length,
    imgWithoutAlt: $('img:not([alt])').length,
    totalImages: $('img').length,
    totalLinks: $('a').length,
    internalLinks: $('a[href^="/"]').length,
    externalLinks: $('a[href^="http"]').length,
  };

  await setCache(`meta:${fullUrl}`, result, 1800);
  return result;
};
