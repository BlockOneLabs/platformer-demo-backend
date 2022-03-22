import client from "./utils/redisClient";
import {API_ENDPOINT_URL, accessKey, chainId, nftAddress} from "./utils/constants"
import setResponseHeaders from "./utils/headers";

const NFT_BALANCE_ENDPOINT_URL = `${API_ENDPOINT_URL}/nft/balance?`;


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
    const attributes = nft.attributes
    return {
      id: nft.id,
      name,
      tokenAddress,
      attributes,
    };
  });

  setResponseHeaders(res)
  res.status(200).json(nftBalance);
}
