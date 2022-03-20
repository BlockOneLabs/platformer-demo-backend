import client from "./utils/redisClient"

const NFT_BALANCE_ENDPOINT_URL = "https://api.blockonelabs.com/api/nft/balance?"

export default async function handler(req, res) {

  const {userId} = req.query
  const wallet = await client.get(userId)
  const params = new URLSearchParams({
     wallet,
    nftAddress: "0xf009f8d7fb3d5934da6ddbe0e5a4695f5f4c1e53",
    chainId:"0x61"
})
const accessKey = process.env.ACCESS_KEY


  const response = await fetch(NFT_BALANCE_ENDPOINT_URL + params, {
    method: 'GET',
    headers: {
        'x-api-key': accessKey
      },
  });
  const result = await response.json();
  console.log(result)
  res.status(200).json(result);



//   const response = await fetch("http://example.com/api/endpoint")
  

//   .catch(function (err) {
//     console.log("Unable to fetch -", err);
//   });


//   res.status(200).json({
//     walletAddress: walletAddress || "NOT FOUND",
//     userId: userId || "NOT FOUND"
//   });
}

