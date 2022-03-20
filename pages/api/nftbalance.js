import client from "./utils/redisClient";

const NFT_BALANCE_ENDPOINT_URL =
  "https://api.blockonelabs.com/api/nft/balance?";

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
  console.log(JSON.stringify(nftBalanceResponse))
  const nftBalance = nftBalanceResponse.result.map(nft => {
      const metadata = JSON.parse(nft.metadata)
      const attributes = metadata.attributes
      const name = metadata.name
      const description = metadata.description
      return {
          id: nft.token_id,
          name,
          description,
          attributes
      }
  })
  res.status(200).json(nftBalance);
}
