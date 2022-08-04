import axios from 'axios'
import instance from "./instance";

const AxiosGet = async (
    endpoint: string,
    params?: any,
    isAuth?:boolean
) => {
    let response = null
       await instance(isAuth ?? true).get(endpoint)
    .then((res) => {
        response = res
    })
    .catch((error) => {
        response = error.response
    })
    return response
}
export {
    AxiosGet,
}