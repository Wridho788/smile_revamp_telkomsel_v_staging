import axios from 'axios'

const intervalTimeout = 1000
const baseUrl = process.env.REACT_APP_BASE_URL

const Instance = (isAuth?: boolean, timeout?: number) => {
    // TODO if get token with localstorage
    // const token = isAuth ? localStorage.getItem('token') : ""
    const token = isAuth ? "AOszriZuleeaXXTMAvcZH0tYoysStfXQc1Xo0D9zUFo0tuaWc3yz08p.BLNLobb4rxSHCLWl5s65BuQy7IKmq4DZXGQXEij4oBg" : ""
    return axios.create({
        baseURL: baseUrl,
        timeout: timeout ?? intervalTimeout,
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    });
}
export default Instance