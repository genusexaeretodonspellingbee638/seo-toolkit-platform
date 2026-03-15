-- SEO Toolkit Platform - Database Migration Script
-- PostgreSQL

-- Create backlinks table
CREATE TABLE IF NOT EXISTS backlinks (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(255) NOT NULL,
    source_url TEXT NOT NULL,
    anchor_text VARCHAR(500),
    follow_type VARCHAR(20) DEFAULT 'dofollow' CHECK (follow_type IN ('dofollow', 'nofollow')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on domain for fast lookups
CREATE INDEX IF NOT EXISTS idx_backlinks_domain ON backlinks(domain);

-- Seed demo data
INSERT INTO backlinks (domain, source_url, anchor_text, follow_type, created_at) VALUES
('example.com', 'https://blog.techsite.com/best-tools', 'Example Tools', 'dofollow', '2024-01-15'),
('example.com', 'https://news.developer.io/article/123', 'Visit Example', 'dofollow', '2024-02-20'),
('example.com', 'https://forum.webmaster.org/thread/456', 'example.com', 'nofollow', '2024-03-10'),
('example.com', 'https://directory.sites.net/listing/789', 'Example Website', 'dofollow', '2024-04-05'),
('example.com', 'https://review.platform.com/example', 'Read Review', 'nofollow', '2024-05-12'),
('example.com', 'https://social.media.net/share/101', 'Check this out', 'nofollow', '2024-06-01'),
('google.com', 'https://wikipedia.org/wiki/Google', 'Google', 'nofollow', '2024-01-01'),
('google.com', 'https://techcrunch.com/google-update', 'Google Search', 'dofollow', '2024-02-15'),
('google.com', 'https://blog.mozilla.org/engines', 'Search Engines', 'dofollow', '2024-03-20'),
('google.com', 'https://education.stanford.edu/resources', 'Google Scholar', 'dofollow', '2024-04-10'),
('google.com', 'https://news.ycombinator.com/item/12345', 'google.com', 'nofollow', '2024-05-05'),
('github.com', 'https://dev.to/top-platforms', 'GitHub', 'dofollow', '2024-01-20'),
('github.com', 'https://stackoverflow.com/questions/99999', 'See on GitHub', 'dofollow', '2024-02-28'),
('github.com', 'https://medium.com/dev-tools-review', 'Code Repository', 'dofollow', '2024-03-15'),
('github.com', 'https://twitter.com/dev_community/status/1234', 'github.com', 'nofollow', '2024-04-22'),
('test.com', 'https://seo-blog.com/analysis', 'Test Site', 'dofollow', '2024-01-10'),
('test.com', 'https://webdev.tips/resources', 'Testing Platform', 'dofollow', '2024-02-18'),
('test.com', 'https://comments.forum.net/post/321', 'test.com', 'nofollow', '2024-03-25'),
('test.com', 'https://links.aggregator.io/submit', 'Visit Test', 'dofollow', '2024-04-30'),
('test.com', 'https://review.trustpilot.com/test', 'User Reviews', 'nofollow', '2024-05-20');
