/* eslint-disable no-unused-vars */
const redis = require("redis");

const redisClient = redis.createClient({
   password: process.env.REDIS_PASSWORD,
   socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
   },
});

redisClient.on("error", (err) => console.log("Redis Server Error", err));
const redisCacheMiddleware = (handler) => async (event, context, callback) => {
   if (!redisClient.isOpen) {
      await redisClient.connect();
   }
   const cacheKey = event.path; // Use the event path as the cache key (customize as needed)

   // Check if the data exists in the Redis cache
   const cacheData = await redisClient.get(cacheKey);
   console.log("cacheData", cacheData);
   if (cacheData) {
      // Cache hit, return cached data
      // Data found in the cache, return it
      return callback(null, {
         statusCode: 200,
         body: cacheData,
      });
   }
   // Data not found in the cache, proceed with the actual logic
   const data = await handler(event, context, callback);
   // Cache the result in Redis

   await redisClient.set(cacheKey, JSON.stringify(data), {
      EX: 120,
   });
   // Return the result
   return callback(null, data);
};

module.exports = redisCacheMiddleware;
