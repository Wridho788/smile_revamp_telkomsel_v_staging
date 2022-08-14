import {AxiosDelete, AxiosGet, AxiosPost} from "../../Axios";
import {ICreateProgram} from "../../../redux/Utils/Interface/IProgram";

// Get Data
const getProgramList = (params: any) => AxiosGet('/program', params)
const getProgramTempList = (params: any) => AxiosGet('/program/temp_list', params)
const getProgramSegmentationList = (params: any, _id:string) => AxiosGet('/program/segmentation/' + _id + '/list', params)
const detailProgram = (_id: string) => AxiosGet('/program/' + _id + "/detail")

// Create Data
const createProgram = (data: ICreateProgram) => AxiosPost('/program', data)
const programImportFile = (data: any) => AxiosPost('/program/import_list', data)

// Delete Data
const deleteProgram = (_id: string) => AxiosDelete('/program/' + _id)
const deleteProgramTempList = (_id: string) => AxiosDelete('/program/temp_list/' + _id)
const deleteProgramSegmentation = (_id: string) => AxiosDelete('/program/segmentation/' + _id)




const PROGRAM_API = {
    createProgram,
    getProgramList,
    getProgramTempList,
    detailProgram,
    programImportFile,
    getProgramSegmentationList,
    deleteProgram,
    deleteProgramSegmentation,
    deleteProgramTempList
}
export default PROGRAM_API
