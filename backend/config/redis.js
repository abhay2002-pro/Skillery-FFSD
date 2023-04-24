import redis from "ioredis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redis_client = await redis.createClient({
  url: "rediss://red-ch2kh4bh4hsum4720qp0:kapKnvVVti6U4VbLxSFSUJaU6mqcoO4q@singapore-redis.render.com:6379"
});
redis_client.on("connect", () => {
  console.log("connected to redis successfully!");
});

redis_client.on("error", (error) => {
  console.log("Redis connection error :", error);
});

export default redis_client;
