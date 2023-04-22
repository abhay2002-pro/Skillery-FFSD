import redis from "ioredis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redis_client = await redis.createClient(REDIS_PORT);
redis_client.on("connect", () => {
  console.log("connected to redis successfully!");
});

redis_client.on("error", (error) => {
  console.log("Redis connection error :", error);
});

export default redis_client;
