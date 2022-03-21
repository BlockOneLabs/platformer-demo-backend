import client from "./utils/redisClient";
import {API_ENDPOINT_URL, accessKey, chainId} from "./utils/constants"

const NFT_BALANCE_ENDPOINT_URL = `${API_ENDPOINT_URL}/nft/balance?`;

const nftAddress = "0xf009f8d7fb3d5934da6ddbe0e5a4695f5f4c1e53";

export default async function handler(req, res) {

  console.log("NFT_BALANCE_ENDPOINT_URL " + NFT_BALANCE_ENDPOINT_URL)
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
  console.log("nftBalanceResponse");
  console.log(JSON.stringify(nftBalanceResponse));
  const nftBalance = nftBalanceResponse.map((nft) => {
    const name = nft.name;
    const tokenAddress = nft.tokenAddress;
    return {
      id: nft.id,
      name,
      tokenAddress,
    };
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key"
  );
  
  res.status(200).json(nftBalance);
}
