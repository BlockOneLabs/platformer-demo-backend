const Redis = require("ioredis");

const REDIS_KEY = process.env.REDIS_KEY
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const connectionString = `redis://:${REDIS_KEY}@${REDIS_HOST}:${REDIS_PORT}`
let client = new Redis(connectionString);


export default async function handler(req, res) {
  const body = req.body
  console.log(JSON.stringify(body))
  const walletAddress = body.walletAddress
  const params = body.params
  const userId = params.userId
  console.log(userId, walletAddress)
  await client.set(userId, walletAddress);
  res.status(200).json({
    walletAddress: walletAddress || "NOT FOUND",
    userId: userId || "NOT FOUND"
  });
}

