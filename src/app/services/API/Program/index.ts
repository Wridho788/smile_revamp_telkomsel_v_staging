import {AxiosGet, AxiosPost} from "../../Axios";
import {ICreateKeywordState} from "../../../redux/Utils/Interface/IKeyword";


// Create Data
const createKeyword = (data: ICreateKeywordState) => AxiosPost('/keyword')



const KEYWORD_API = {
    createKeyword,
}
export default KEYWORD_API
