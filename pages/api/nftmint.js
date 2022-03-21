import client from "./utils/redisClient";
import {
  API_ENDPOINT_URL,
  accessKey,
  chainId,
  nftAddress,
} from "./utils/constants";
import setResponseHeaders from "./utils/headers";

const NFT_MINT_ENDPOINT_URL = `${API_ENDPOINT_URL}/nft/mint`;

export default async function handler(req, res) {
  const { userId } = req.body;
  const wallet = await client.get(userId);

  const data = {
    to: wallet,
    NFTCollectionAddress: nftAddress,
    chainId,
  };
  const body = JSON.stringify(data);

  const response = await fetch(NFT_MINT_ENDPOINT_URL, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": accessKey,
    },
  });

  const jsonResponse = await response.text();

  setResponseHeaders(res);
  res.status(200).json(response);
}
