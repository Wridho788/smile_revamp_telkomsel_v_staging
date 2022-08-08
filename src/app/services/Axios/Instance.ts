import axios from 'axios'

const intervalTimeout = 1000

const Instance = (isAuth?: boolean, timeout?: number) => {
    // TODO if get token with localstorage
    // const token = isAuth ? localStorage.getItem('token') : ""
    const token = isAuth ? process.env.TOKEN : ""
    return axios.create({
        timeout: timeout ?? intervalTimeout,
        headers: {
            "accept": "*/*",
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    });
}
export default Instance
