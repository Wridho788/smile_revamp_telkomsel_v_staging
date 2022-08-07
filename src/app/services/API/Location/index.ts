import {AxiosGet, AxiosPost} from "../../Axios";

const locationList = (params: any) => AxiosGet('/location', params)


const LOCATION_API = {
    locationList,
}
export default LOCATION_API
