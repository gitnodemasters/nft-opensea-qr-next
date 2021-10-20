import axios from "axios";
import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide, WyvernSchemaName } from "opensea-js/lib/types"

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

const makeOffer = async () => {
  // This example provider won't let you make transactions, only read-only calls:
  const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
  });

  const asset = {
    tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // CryptoKitties
    tokenId: "1", // Token ID
  };
  
  // const asset = {
  //   tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e", 
  //   tokenId: "18612397745365085073970914378915825028735601307837941132508731406718156668929", 
  // };

  const accountAddress = "0xF9D86edAe6e63f5834ff487eee084161f8749500";

  const balance = await seaport.getAssetBalance({
    accountAddress, // string
    asset, // Asset
  });

  console.log("*****************balance", balance);
  
  const data = await seaport.api.getAsset(asset)

  console.log("****************asset", data)

  // const order = await seaport.api.getOrder({ side: OrderSide.Sell,
  //   asset_contract_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // CryptoKitties
  //   token_id: "1", // Token ID 
  // })
  // const transactionHash = await seaport.fulfillOrder({ order, accountAddress })
  // console.log("****************transactionHash", transactionHash)

  return balance.greaterThan(0)
};

export { searchAllRedPandaNFTs, getSingleAsset, makeOffer };
