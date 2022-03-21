import client from "./utils/redisClient";
import {
  API_ENDPOINT_URL,
  accessKey,
  chainId,
  nftAddress,
} from "./utils/constants";
import setResponseHeaders from "./utils/headers";

const NFT_UPDATE_ENDPOINT_URL = `${API_ENDPOINT_URL}/nft/update/properties`;

export default async function handler(req, res) {
  const { tokenId } = req.body;

  const data = {
    NFTCollectionAddress: nftAddress,
    tokenId,
    "traits":[
        {
            "trait_type":"image",
            "value": "https://img.freepik.com/free-vector/modern-business-start-up-background_1361-1518.jpg?t=st=1647903361~exp=1647903961~hmac=5892b71636e853a9c99dfeae9667ade8e7015035b14d1e9df5a7b9a836779a3c&w=996"
        },
        {
            "trait_type":"used",
            "value": "true"
        },

    ]
    
    };
  const body = JSON.stringify(data);

  const response = await fetch(NFT_UPDATE_ENDPOINT_URL, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": accessKey,
    },
  });

  const jsonResponse = await response.text();

  console.log(`jsonResponse ${jsonResponse}`)
  setResponseHeaders(res);
  res.status(200).json(jsonResponse);
}
