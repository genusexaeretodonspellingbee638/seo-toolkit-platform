const { normalizeDomain } = require('../utils/helpers');
const crypto = require('crypto');

/**
 * Simulates Domain Authority, Page Authority, and Spam Score
 * using a deterministic hash-based algorithm for consistent results per domain.
 */
exports.check = async (domain) => {
  const cleanDomain = normalizeDomain(domain);

  // Generate deterministic scores based on domain hash
  const hash = crypto.createHash('md5').update(cleanDomain).digest('hex');

  // Extract numbers from hash for scoring
  const hashNum1 = parseInt(hash.substring(0, 8), 16);
  const hashNum2 = parseInt(hash.substring(8, 16), 16);
  const hashNum3 = parseInt(hash.substring(16, 24), 16);

  // TLD-based boost (well-known TLDs get a bonus)
  const tld = cleanDomain.split('.').pop();
  const tldBoost = { com: 15, org: 12, net: 10, edu: 20, gov: 25 }[tld] || 5;

  // Domain length factor (shorter domains tend to be more authoritative)
  const lengthFactor = Math.max(0, 20 - cleanDomain.length);

  // Calculate scores
  const domainAuthority = Math.min(100, Math.max(1, (hashNum1 % 60) + tldBoost + lengthFactor));
  const pageAuthority = Math.min(100, Math.max(1, (hashNum2 % 55) + tldBoost + Math.floor(lengthFactor * 0.8)));
  const spamScore = Math.min(100, Math.max(0, hashNum3 % 30));

  // Determine rating
  let daRating, spamRating;
  if (domainAuthority >= 70) daRating = 'Mükemmel';
  else if (domainAuthority >= 50) daRating = 'İyi';
  else if (domainAuthority >= 30) daRating = 'Orta';
  else daRating = 'Düşük';

  if (spamScore <= 5) spamRating = 'Düşük Risk';
  else if (spamScore <= 15) spamRating = 'Orta Risk';
  else spamRating = 'Yüksek Risk';

  return {
    domain: cleanDomain,
    domainAuthority,
    pageAuthority,
    spamScore,
    daRating,
    spamRating,
    metrics: {
      totalBacklinks: (hashNum1 % 50000) + 100,
      referringDomains: (hashNum2 % 5000) + 10,
      totalKeywords: (hashNum3 % 10000) + 50,
    },
    note: 'Bu değerler demo amaçlı simüle edilmiştir.',
  };
};
