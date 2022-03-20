import client from "./utils/redisClient";

const NFT_BALANCE_ENDPOINT_URL =
  "https://api.blockonelabs.com/api/nft/balance?";

const accessKey = process.env.ACCESS_KEY;
const chainId = "0x61" // BSC testnet

export default async function handler(req, res) {
  const { userId } = req.query;
  const wallet = await client.get(userId);
  const params = new URLSearchParams({
    wallet,
    nftAddress: "0xf009f8d7fb3d5934da6ddbe0e5a4695f5f4c1e53",
    chainId,
  });

  const response = await fetch(NFT_BALANCE_ENDPOINT_URL + params, {
    method: "GET",
    headers: {
      "x-api-key": accessKey,
    },
  });
  const nftBalanceResponse = await response.json();
  const nftBalance = nftBalanceResponse.result.map(nft => {
      const attributes = JSON.parse(nft.metadata).attributes
      return {
          id: nft.token_id,
          attributes
      }
  })
  res.status(200).json(nftBalance);
}
