const whois = require('whois-json');
const { normalizeDomain } = require('../utils/helpers');
const { getCache, setCache } = require('../utils/cache');

exports.lookup = async (domain) => {
  const cleanDomain = normalizeDomain(domain);
  
  // Check cache
  const cached = await getCache(`whois:${cleanDomain}`);
  if (cached) return cached;

  const result = await whois(cleanDomain);

  const data = {
    domain: cleanDomain,
    registrar: result.registrar || 'Bilinmiyor',
    creationDate: result.creationDate || result.createdDate || 'Bilinmiyor',
    expirationDate: result.expirationDate || result.registryExpiryDate || 'Bilinmiyor',
    nameServers: result.nameServer
      ? (Array.isArray(result.nameServer) ? result.nameServer : [result.nameServer])
      : [],
    domainStatus: result.domainStatus
      ? (Array.isArray(result.domainStatus) ? result.domainStatus : [result.domainStatus])
      : [],
    updatedDate: result.updatedDate || 'Bilinmiyor',
    registrantOrganization: result.registrantOrganization || 'Bilinmiyor',
  };

  await setCache(`whois:${cleanDomain}`, data, 3600);
  return data;
};
