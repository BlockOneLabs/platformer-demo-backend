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
            "value": "https://www.blockonelabs.com/assets/images/demo/used-star.png"
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

  const jsonResponse = await response.json();

  setResponseHeaders(res);
  res.status(200).json(jsonResponse);
}
