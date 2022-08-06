import {AxiosGet, AxiosPost} from "../../Axios";

// Fetch Data List
const customerTierList = (params: any) => AxiosGet('/customer/tier', params)
const customerBadgeList = (params: any) => AxiosGet('/customer/badge', params)
const customerBrandList = (params: any) => AxiosGet('/customer/brand', params)
const customerList = (params: any) => AxiosGet('/customer', params)



const CUSTOMER_API = {
    customerTierList,
    customerBadgeList,
    customerBrandList,
    customerList
}
export default CUSTOMER_API
