import {AxiosGet} from "../../Axios";

const getDataTes = (params?: string) => AxiosGet('/tes', params)
const getKeywordType = () => AxiosGet('/lov/keyword_type')

const API = {
    getDataTes,
    getKeywordType
}
export default API
