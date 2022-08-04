import Instance from "./Instance";

const AxiosGet = async (
    endpoint: string,
    params?: string,
    isAuth?: boolean
) => {
    let response:any = []
    await Instance(isAuth).get(endpoint, {params: params})
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