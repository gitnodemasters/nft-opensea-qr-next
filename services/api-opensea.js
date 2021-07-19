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
  const url = `/assets?order_direction=desc&offset=${params.first}&limit=${params.last}&asset_contract_addresses=0xEf42c7C855fC915dD1C81cC08101018dd77229E6`
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
