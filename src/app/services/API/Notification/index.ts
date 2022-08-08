import {AxiosGet, AxiosPost} from "../../Axios";

// Get List
const notificationList = (params: any) => AxiosGet('/notification/template', params)


const NOTIFICATION_API = {
    notificationList,
}
export default NOTIFICATION_API
