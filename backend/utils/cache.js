/**
 * Optional Redis caching helper
 * If Redis is not available, cache operations are no-ops.
 */
let redisClient = null;

async function initRedis() {
  try {
    const { createClient } = require('redis');
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', () => {
      redisClient = null;
    });
    await redisClient.connect();
    console.log('✅ Redis bağlantısı kuruldu');
  } catch {
    console.log('ℹ️  Redis kullanılmıyor (opsiyonel)');
    redisClient = null;
  }
}

async function getCache(key) {
  if (!redisClient) return null;
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

async function setCache(key, value, ttlSeconds = 3600) {
  if (!redisClient) return;
  try {
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // Ignore cache write errors
  }
}

// Try to initialize Redis on module load
initRedis();

module.exports = { getCache, setCache };
