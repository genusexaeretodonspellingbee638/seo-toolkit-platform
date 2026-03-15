const { normalizeDomain } = require('../utils/helpers');

// Demo backlinks data (used when PostgreSQL is not available)
const demoBacklinks = [
  { id: 1, domain: 'example.com', source_url: 'https://blog.techsite.com/best-tools', anchor_text: 'Example Tools', follow_type: 'dofollow', created_at: '2024-01-15' },
  { id: 2, domain: 'example.com', source_url: 'https://news.developer.io/article/123', anchor_text: 'Visit Example', follow_type: 'dofollow', created_at: '2024-02-20' },
  { id: 3, domain: 'example.com', source_url: 'https://forum.webmaster.org/thread/456', anchor_text: 'example.com', follow_type: 'nofollow', created_at: '2024-03-10' },
  { id: 4, domain: 'example.com', source_url: 'https://directory.sites.net/listing/789', anchor_text: 'Example Website', follow_type: 'dofollow', created_at: '2024-04-05' },
  { id: 5, domain: 'example.com', source_url: 'https://review.platform.com/example', anchor_text: 'Read Review', follow_type: 'nofollow', created_at: '2024-05-12' },
  { id: 6, domain: 'example.com', source_url: 'https://social.media.net/share/101', anchor_text: 'Check this out', follow_type: 'nofollow', created_at: '2024-06-01' },
  { id: 7, domain: 'google.com', source_url: 'https://wikipedia.org/wiki/Google', anchor_text: 'Google', follow_type: 'nofollow', created_at: '2024-01-01' },
  { id: 8, domain: 'google.com', source_url: 'https://techcrunch.com/google-update', anchor_text: 'Google Search', follow_type: 'dofollow', created_at: '2024-02-15' },
  { id: 9, domain: 'google.com', source_url: 'https://blog.mozilla.org/engines', anchor_text: 'Search Engines', follow_type: 'dofollow', created_at: '2024-03-20' },
  { id: 10, domain: 'google.com', source_url: 'https://education.stanford.edu/resources', anchor_text: 'Google Scholar', follow_type: 'dofollow', created_at: '2024-04-10' },
  { id: 11, domain: 'google.com', source_url: 'https://news.ycombinator.com/item/12345', anchor_text: 'google.com', follow_type: 'nofollow', created_at: '2024-05-05' },
  { id: 12, domain: 'github.com', source_url: 'https://dev.to/top-platforms', anchor_text: 'GitHub', follow_type: 'dofollow', created_at: '2024-01-20' },
  { id: 13, domain: 'github.com', source_url: 'https://stackoverflow.com/questions/99999', anchor_text: 'See on GitHub', follow_type: 'dofollow', created_at: '2024-02-28' },
  { id: 14, domain: 'github.com', source_url: 'https://medium.com/dev-tools-review', anchor_text: 'Code Repository', follow_type: 'dofollow', created_at: '2024-03-15' },
  { id: 15, domain: 'github.com', source_url: 'https://twitter.com/dev_community/status/1234', anchor_text: 'github.com', follow_type: 'nofollow', created_at: '2024-04-22' },
  { id: 16, domain: 'test.com', source_url: 'https://seo-blog.com/analysis', anchor_text: 'Test Site', follow_type: 'dofollow', created_at: '2024-01-10' },
  { id: 17, domain: 'test.com', source_url: 'https://webdev.tips/resources', anchor_text: 'Testing Platform', follow_type: 'dofollow', created_at: '2024-02-18' },
  { id: 18, domain: 'test.com', source_url: 'https://comments.forum.net/post/321', anchor_text: 'test.com', follow_type: 'nofollow', created_at: '2024-03-25' },
  { id: 19, domain: 'test.com', source_url: 'https://links.aggregator.io/submit', anchor_text: 'Visit Test', follow_type: 'dofollow', created_at: '2024-04-30' },
  { id: 20, domain: 'test.com', source_url: 'https://review.trustpilot.com/test', anchor_text: 'User Reviews', follow_type: 'nofollow', created_at: '2024-05-20' },
];

let pool = null;
try {
  pool = require('../utils/db');
} catch {
  // PostgreSQL not configured, will use demo data
}

exports.getBacklinks = async (domain, page = 1, limit = 10) => {
  const cleanDomain = normalizeDomain(domain);
  const offset = (page - 1) * limit;

  // Try PostgreSQL first
  try {
    if (pool) {
      const countResult = await pool.query(
        'SELECT COUNT(*) FROM backlinks WHERE domain = $1',
        [cleanDomain]
      );
      const totalCount = parseInt(countResult.rows[0].count);

      const result = await pool.query(
        'SELECT * FROM backlinks WHERE domain = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [cleanDomain, limit, offset]
      );

      return {
        domain: cleanDomain,
        backlinks: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalResults: totalCount,
          perPage: limit,
        },
      };
    }
  } catch {
    // Fall through to demo data
  }

  // Fallback: use demo data
  const filtered = demoBacklinks.filter((b) => b.domain === cleanDomain);
  const paginated = filtered.slice(offset, offset + limit);

  return {
    domain: cleanDomain,
    backlinks: paginated,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filtered.length / limit),
      totalResults: filtered.length,
      perPage: limit,
    },
    note: 'Demo verisi kullanılıyor. PostgreSQL bağlantısı için .env dosyasını yapılandırın.',
  };
};
