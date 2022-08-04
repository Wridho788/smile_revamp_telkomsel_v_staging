import Instance from "./Instance";

const baseUrl = process.env.REACT_APP_BASE_URL

const AxiosGet = async (
    endpoint: string,
    params?: string,
    isAuth?: boolean
) => {
    console.log("axiosGet")
    let response: any = []
    await Instance(isAuth).get(baseUrl + endpoint, {params: params})
        .then((res) => {

            console.log(res)
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