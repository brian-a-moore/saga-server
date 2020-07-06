const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
    enable_offline_queue: false
});

const maxPerDay = 100;
const maxPerLogin = 10;

const bruteRequest = new RateLimiterRedis({
    storeClient: redisClient,
    points: 10,
    duration: 1
});

const brutePerDay = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'max_per_day',
    points: maxPerDay,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24
});

const brutePerLogin = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'max_per_login',
    points: maxPerLogin,
    duration: 60 * 60 * 24 * 90,
    blockDuration: 60 * 60
});

module.exports = { bruteRequest, brutePerDay, brutePerLogin, maxPerDay, maxPerLogin };