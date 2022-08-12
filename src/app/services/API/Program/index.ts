
import {AxiosGet, AxiosPost} from "../../Axios";
import {ICreateProgram} from "../../../redux/Utils/Interface/IProgram";

// Get Data
const getProgramList = (params: any) => AxiosGet('/program', params)

// Create Data
const createProgram = (data: ICreateProgram) => AxiosPost('/program', data)



const PROGRAM_API = {
    createProgram,
    getProgramList
}
export default PROGRAM_API
