import axios, {AxiosRequestHeaders} from 'axios'

const intervalTimeout = 10000

const Instance = (isAuth?: boolean, header? : AxiosRequestHeaders, timeout?: number) => {
    // TODO if get token with localstorage
    // const token = isAuth ? localStorage.getItem('token') : ""

    const token = isAuth ? process.env.TOKEN : ""
    return axios.create({
        timeout: timeout ?? intervalTimeout,
        headers: header ?? {
            "accept": "*/*",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}
export default Instance
