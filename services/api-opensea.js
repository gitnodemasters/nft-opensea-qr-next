import axios from 'axios'

import { OPENSEA_URL } from 'config'

const apiAxios = axios.create({
  baseURL: OPENSEA_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

const searchAllRedPandaNFTs = async (params) => {
  const url = `/assets?order_direction=desc&offset=${params.first}&limit=${params.last}&collection=fun-nft-v2`
  return await apiAxios.get(url)
}

const getSingleAsset = async (params) => {
  const url = `/asset/${params.contract_address}/${params.token_id}`
  return await apiAxios.get(url)
}

export {
  searchAllRedPandaNFTs,
  getSingleAsset
};
