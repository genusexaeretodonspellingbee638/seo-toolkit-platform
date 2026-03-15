/**
 * URL and domain helper utilities
 */

function normalizeDomain(input) {
  let domain = input.trim().toLowerCase();
  domain = domain.replace(/^(https?:\/\/)/, '');
  domain = domain.replace(/\/.*$/, '');
  domain = domain.replace(/^www\./, '');
  return domain;
}

function ensureProtocol(url) {
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

function isValidDomain(domain) {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

module.exports = { normalizeDomain, ensureProtocol, isValidDomain };
