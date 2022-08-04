import axios from 'axios'

const GlobalAPI = axios.create({
  baseURL: 'https://gicv.legionswap.com/api/v1',
})

export default GlobalAPI
