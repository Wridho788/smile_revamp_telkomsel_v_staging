import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut} from "../../Axios";

// Get Data
const lovList = (params: any) => AxiosGet('/lov', params)
const getBonusType = () => AxiosGet('/lov/bonus_type')
const getCustomerType = () => AxiosGet('/lov/customer_type')
const getKeywordType = () => AxiosGet('/lov/keyword_type')
const getLocationType = () => AxiosGet('/lov/location_type')
const getMechanism = () => AxiosGet('/lov/mechanism')
const getNotifVia = () => AxiosGet('/lov/notif_via')
const getNotifType = () => AxiosGet('/lov/notif_type')
const getNotifReceiver = () => AxiosGet('/lov/notif_receiver')
const getPointType = () => AxiosGet('/lov/point_type')
const getOwner = () => AxiosGet('/lov/owner')
const getPointBalance = () => AxiosGet('/lov/c_point_balance')
const getProgramType = () => AxiosGet('/lov/program_type')
const getTransactionType = () => AxiosGet('/lov/transaction_type')


// Post Data
const lovAdd = (data: any) => AxiosPost('/lov', data)

// Update Data
const lovUpdate = (_id: string, data: any) => AxiosPut('/lov/' + {_id}, data)


// Delete Data
const lovDelete = (_id: string) => AxiosDelete('/lov/' + {_id})


const LOV_API = {
    lovList,
    getBonusType,
    getCustomerType,
    getKeywordType,
    getLocationType,
    getMechanism,
    getNotifVia,
    getNotifType,
    getNotifReceiver,
    getProgramType,
    getPointType,
    getOwner,
    getPointBalance,
    getTransactionType,
    lovAdd,
    lovUpdate,
    lovDelete
}
export default LOV_API
