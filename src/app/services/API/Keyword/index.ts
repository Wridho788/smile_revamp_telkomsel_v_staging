import {AxiosGet} from "../../Axios";

const getDataTes = (params?: string) => AxiosGet('/tes', params)
const getKeywordType = () => AxiosGet('/lov/keyword_type')
const getPointType = () => AxiosGet('/lov/point_type')
const getMechanism= () => AxiosGet('/lov/mechanism')
const getOwner= () => AxiosGet('/lov/owner')
const getPointBalance= () => AxiosGet('/lov/c_point_balance')





const getProgramType = () => AxiosGet('/lov/program_type')

const API = {
    getDataTes,
    getKeywordType,
    getProgramType,
    getPointType,
    getMechanism,
    getOwner,
    getPointBalance
}
export default API
