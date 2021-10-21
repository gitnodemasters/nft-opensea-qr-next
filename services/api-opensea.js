import axios from "axios";
import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide, WyvernSchemaName } from "opensea-js/lib/types";

import { OPENSEA_URL } from "config";

const apiAxios = axios.create({
  baseURL: OPENSEA_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

const searchAllRedPandaNFTs = async (params) => {
  // const url = `/assets?order_direction=desc&offset=${params.first}&limit=${params.last}&collection=fun-nft-v2`
  const url = `/assets?order_direction=desc&offset=${params.first}&limit=${params.last}&collection=dronecadets`;
  return await apiAxios.get(url);
};

const getSingleAsset = async (params) => {
  const url = `/asset/${params.contract_address}/${params.token_id}`;
  return await apiAxios.get(url);
};

const placeBidOrder = async (params) => {
  try {
    console.log("**********params************", params);
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new Web3.providers.HttpProvider(
      "https://mainnet.infura.io"
    );

    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Main,
    });

    // const asset = {
    //   tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // CryptoKitties
    //   tokenId: "519509", // Token ID
    // };

    const asset = {
      tokenAddress: params.address,
      tokenId: params.token_id,
    };

    let _web3 = new Web3(window.ethereum);
    const accountAddress = _web3.eth.accounts[0];
    console.log("***************accountAddress************", accountAddress);
    // const accountAddress = "0xF9D86edAe6e63f5834ff487eee084161f8749500";

    const balanceOfWETH = await seaport.getTokenBalance({
      accountAddress, // string
      tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    });
    console.log("*****************balance", balanceOfWETH);

    const data = await seaport.api.getAsset(asset);
    console.log("****************asset", data);

    //compare price between account and asset

    // make offer
    const offer = await seaport.createBuyOrder({
      asset: asset,
      accountAddress: accountAddress,
      // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
      startAmount: 0.1,
    });
    console.log("****************offer", offer);

    //buy item
    // const order = await seaport.api.getOrder()
    // const transactionHash = await seaport.fulfillOrder({ order, accountAddress })

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { searchAllRedPandaNFTs, getSingleAsset, placeBidOrder };
