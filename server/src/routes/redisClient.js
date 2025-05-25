// redisClient.js
const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => console.error('Redis Error:', err));

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

// Set a key with TTL (in seconds)
const setWithTTL = async (key, value, ttlInSeconds) => {
  await connectRedis();
  await client.set(key, value, {
    EX: ttlInSeconds,
  });
};

// Get a key
const getValue = async (key) => {
  await connectRedis();
  return await client.get(key);
};

// Delete a key
const deleteKey = async (key) => {
  await connectRedis();
  await client.del(key);
};

// Get TTL
const getTTL = async (key) => {
  await connectRedis();
  return await client.ttl(key);
};

module.exports = {
  setWithTTL,
  getValue,
  deleteKey,
  getTTL,
};
