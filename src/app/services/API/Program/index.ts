import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut} from "../../Axios";
import {ICreateProgram} from "../../../redux/Utils/Interface/IProgram";

// Get Data
const getProgramList = (params: any) => AxiosGet('/program', params)
const getProgramTempList = (params: any) => AxiosGet('/program/temp_list', params)
const getProgramSegmentationList = (params: any, _id: string) => AxiosGet('/program/segmentation/' + _id + '/list', params)
const detailProgram = (_id: string) => AxiosGet('/program/' + _id + "/detail")

// Create Data
const createProgram = (data: ICreateProgram) => AxiosPost('/program', data)
const programImportFile = (data: any) => AxiosPost('/program/import_list', data)

// Update Data
const updateProgram = (data: ICreateProgram, _id: string) => AxiosPut('/program/' + _id + '/edit', data)

// Delete Data
const deleteProgram = (_id: string) => AxiosDelete('/program/' + _id + '/delete')
const deleteProgramTempList = (_id: string) => AxiosDelete('/program/temp_list/' + _id + '/delete')
const deleteProgramSegmentation = (_id: string) => AxiosDelete('/program/segmentation/' + _id + '/delete')


const PROGRAM_API = {
    createProgram,
    updateProgram,
    getProgramList,
    getProgramTempList,
    detailProgram,
    programImportFile,
    getProgramSegmentationList,
    deleteProgram,
    deleteProgramSegmentation,
    deleteProgramTempList,
}
export default PROGRAM_API
