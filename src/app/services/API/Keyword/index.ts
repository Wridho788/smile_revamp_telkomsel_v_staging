import {AxiosGet} from "../../Axios";

const getDataTes = (params?: string) => AxiosGet('/tes', params)
const getKeywordType = () => AxiosGet('/lov/keyword_type')
const getProgramType = () => AxiosGet('/lov/program_type')

const API = {
    getDataTes,
    getKeywordType,
    getProgramType
}
export default API
