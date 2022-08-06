import {AxiosGet, AxiosPost} from "../../Axios";
import {ICreateProgramState} from "../../../redux/Utils/Interface/IProgram";


// Create Data
const createProgram = (data: ICreateProgramState) => AxiosPost('/Program')



const PROGRAM_API = {
    createProgram,
}
export default PROGRAM_API
