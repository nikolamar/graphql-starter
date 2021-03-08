import Redis from "ioredis";

export const redisConfig: Redis.RedisOptions = {
  retryStrategy: times => Math.max(times * 100, 3000),
};