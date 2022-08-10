import {AxiosPost} from "../../Axios";
import {ICreateKeyword} from "../../../redux/Utils/Interface/IKeyword";


// Create Data
const createKeyword = (data: any) => AxiosPost('/keyword',data)



const KEYWORD_API = {
    createKeyword,
}
export default KEYWORD_API

