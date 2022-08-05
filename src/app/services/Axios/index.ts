import Instance from "./Instance";
import {ICreateKeywordState} from "../../redux/Types/keyword";

const baseUrl = process.env.REACT_APP_BASE_URL

const AxiosGet = async (
    endpoint: string,
    params?: string,
    isAuth?: boolean
) => {
    let response: any = []
    await Instance(isAuth).get(baseUrl + endpoint, {params: params})
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            response = error.response
        })
    return response
}
const AxiosPost = async (
    endpoint: string,
    data?: ICreateKeywordState,
    isAuth?: boolean
) => {
    let response: any = []
    await Instance(isAuth).post(baseUrl + endpoint, data)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            response = error.response
        })
    return response
}
export {
    AxiosGet,
    AxiosPost
}