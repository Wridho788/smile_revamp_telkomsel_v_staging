import axios from 'axios'

const baseUrl = process.env.BASE_URL

const instance =(isAuth?: boolean, timeout?:number) => axios.create({
    baseURL: baseUrl,
    timeout: timeout ?? 1000,
    headers: {
        "Content-type": "application/json",
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    }
});
export default instance