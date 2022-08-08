
import {AxiosGet, AxiosPost} from "../../Axios";
import {ICreateProgram} from "../../../redux/Utils/Interface/IProgram";


// Create Data
const createProgram = (data: ICreateProgram) => AxiosPost('/program', data)



const PROGRAM_API = {
    createProgram,
}
export default PROGRAM_API
