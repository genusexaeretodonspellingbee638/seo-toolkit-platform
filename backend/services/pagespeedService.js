const axios = require('axios');
const { ensureProtocol } = require('../utils/helpers');
const { getCache, setCache } = require('../utils/cache');

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

exports.analyze = async (url) => {
  const fullUrl = ensureProtocol(url);

  const cached = await getCache(`pagespeed:${fullUrl}`);
  if (cached) return cached;

  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  const params = {
    url: fullUrl,
    category: ['performance', 'accessibility', 'best-practices', 'seo'],
    strategy: 'desktop',
  };
  if (apiKey) params.key = apiKey;

  const { data } = await axios.get(PAGESPEED_API, {
    params,
    paramsSerializer: {
      indexes: null // Prevents axios from adding [] to array parameters
    },
    timeout: 60000,
  });

  const categories = data.lighthouseResult?.categories || {};

  const result = {
    url: fullUrl,
    fetchTime: data.analysisUTCTimestamp || new Date().toISOString(),
    scores: {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    },
    metrics: {
      firstContentfulPaint:
        data.lighthouseResult?.audits?.['first-contentful-paint']?.displayValue || 'N/A',
      largestContentfulPaint:
        data.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue || 'N/A',
      totalBlockingTime:
        data.lighthouseResult?.audits?.['total-blocking-time']?.displayValue || 'N/A',
      cumulativeLayoutShift:
        data.lighthouseResult?.audits?.['cumulative-layout-shift']?.displayValue || 'N/A',
      speedIndex:
        data.lighthouseResult?.audits?.['speed-index']?.displayValue || 'N/A',
      timeToInteractive:
        data.lighthouseResult?.audits?.['interactive']?.displayValue || 'N/A',
    },
  };

  await setCache(`pagespeed:${fullUrl}`, result, 1800);
  return result;
};
