import client from "./utils/redisClient"


export default async function handler(req, res) {
  const body = req.body
  const walletAddress = body.walletAddress
  const params = body.params
  const userId = params.userId
  await client.set(userId, walletAddress);
  res.status(200).json({
    walletAddress: walletAddress || "NOT FOUND",
    userId: userId || "NOT FOUND"
  });
}

