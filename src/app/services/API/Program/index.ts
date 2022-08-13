import {AxiosDelete, AxiosGet, AxiosPost} from "../../Axios";
import {ICreateProgram} from "../../../redux/Utils/Interface/IProgram";

// Get Data
const getProgramList = (params: any) => AxiosGet('/program', params)

// Create Data
const createProgram = (data: ICreateProgram) => AxiosPost('/program', data)

// Delete Data
const deleteProgram = (_id: string) => AxiosDelete('/program/' + _id)


// Delete Data
const detailProgram = (_id: string) => AxiosGet('/program/' + _id + "/detail")



const PROGRAM_API = {
    createProgram,
    getProgramList,
    deleteProgram,
    detailProgram
}
export default PROGRAM_API
