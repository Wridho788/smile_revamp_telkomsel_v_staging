import Instance from "./Instance";
import {ICreateKeywordState} from "../../redux/Utils/Interface/IKeyword";
import {AxiosRequestHeaders} from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const AxiosGet = async (
    endpoint: string,
    params?: any,
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
    data: any,
    header?: AxiosRequestHeaders,
    isAuth?: boolean,
) => {
    let response: any = []
    await Instance(isAuth, header).post(baseUrl + endpoint, data)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            response = error.response
        })
    return response
}
const AxiosPut = async (
    endpoint: string,
    data: any,
    header?: AxiosRequestHeaders,
) => {
    let response: any = []
    await Instance(true, header).put(baseUrl + endpoint, data)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            response = error.response
        })
    return response
}

const AxiosDelete = async (
    endpoint: string,
) => {
    let response: any = []
    await Instance().delete(baseUrl + endpoint)
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
    AxiosPost,
    AxiosPut,
    AxiosDelete
}
