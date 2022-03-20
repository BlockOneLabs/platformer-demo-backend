import client from "./utils/redisClient";

const NFT_BALANCE_ENDPOINT_URL =
  "http://localhost:3005/api/nft/balance?";

const accessKey = process.env.ACCESS_KEY;
const chainId = "0x61" // BSC testnet
const nftAddress = ""

export default async function handler(req, res) {
  const { userId } = req.query;
  const wallet = await client.get(userId);
  const params = new URLSearchParams({
    wallet,
    nftAddress,
    chainId,
  });

  const response = await fetch(NFT_BALANCE_ENDPOINT_URL + params, {
    method: "GET",
    headers: {
      "x-api-key": accessKey,
    },
  });
  const nftBalanceResponse = await response.json();
  console.log("nftBalanceResponse")
  console.log(JSON.stringify(nftBalanceResponse))
  const nftBalance = nftBalanceResponse.map(nft => {
      console.log(JSON.stringify(nft))
      const name = nft.name
      return {
          id: nft.id,
          name,
      }
  })
  res.status(200).json(nftBalance);
}
