import {Dispatch} from "redux"
import API from "../../services/API/Keyword"
import {ProgramPageDataInitial} from "../Utils/InitialState/ProgramInitial";
import {ActionTypes, Types} from "../Types/Types";
import {ICreateProgramState} from "../Utils/Interface/IProgram";
import {IDefaultListInitial} from "../Utils/InitialState/DefaultListInitial";
import LOV_API from "../../services/API/Lov";
import CUSTOMER_API from "../../services/API/Customer";
import LOCATION_API from "../../services/API/Location";
import KEYWORD_API from "../../services/API/Keyword";
import {IParamsListDefault} from "../Utils/Interface/IParamList";

export const getProgramPage = () => {
    const mainInfo = ProgramPageDataInitial.main_info
    const notification = ProgramPageDataInitial.notification
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})

            await LOV_API.getProgramType()
                .then((res) => {
                    mainInfo.program_type = res.data
                })
            await LOV_API.getPointType()
                .then((res) => {
                    mainInfo.point_type = res.data
                })
            await LOV_API.getMechanism()
                .then((res) => {
                    mainInfo.mechanism = res.data
                })
            await LOV_API.getOwner()
                .then((res) => {
                    mainInfo.owner = res.data
                })
            await LOV_API.getNotifVia()
                .then((res) => {
                    notification.via = res.data
                })
            await LOV_API.getNotifType()
                .then((res) => {
                    notification.type = res.data
                })
            await LOV_API.getNotifTemplate()
                .then((res) => {
                    notification.template = res.data
                })
            await LOV_API.getTransactionType()
                .then((res) => {
                    notification.transactionType = res.data
                })

            setTimeout(() => {
                console.log(ProgramPageDataInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: ProgramPageDataInitial})

            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on Programs loading'})
        }
    }
}

export const customerList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip}
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await CUSTOMER_API.customerList(params)
                .then((res) => {
                    IDefaultListInitial.data = res.data
                    IDefaultListInitial.total = res.total
                })

            setTimeout(() => {
                console.log(IDefaultListInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: IDefaultListInitial})
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on todos loading'});
        }
    }
}
export const customerTierList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip}
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await CUSTOMER_API.customerTierList(params)
                .then((res) => {
                    IDefaultListInitial.data = res.data
                    IDefaultListInitial.total = res.total
                })

            setTimeout(() => {
                console.log(IDefaultListInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: IDefaultListInitial})
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on todos loading'});
        }
    }
}

export const customerBadgeList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {

        const params = {limit: limit, skip: skip}
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await CUSTOMER_API.customerBadgeList(params)
                .then((res) => {
                    IDefaultListInitial.data = res.data
                    IDefaultListInitial.total = res.total
                })

            setTimeout(() => {
                console.log(IDefaultListInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: IDefaultListInitial})
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on todos loading'});
        }
    }
}

export const customerBrandList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {

        const params = {limit: limit, skip: skip}
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await CUSTOMER_API.customerBrandList(params)
                .then((res) => {
                    IDefaultListInitial.data = res.data
                    IDefaultListInitial.total = res.total
                })

            setTimeout(() => {
                console.log(IDefaultListInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: IDefaultListInitial})
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on todos loading'});
        }
    }
}

export const locationList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {

        const params = {limit: limit, skip: skip}
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await LOCATION_API.locationList(params)
                .then((res) => {
                    IDefaultListInitial.data = res.data
                    IDefaultListInitial.total = res.total
                })

            setTimeout(() => {
                console.log(IDefaultListInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: IDefaultListInitial})
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on todos loading'});
        }
    }
}


interface ICreateProgramProps {
    data: ICreateProgramState
}

export const createProgram = ({data}: ICreateProgramProps) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            const response = await KEYWORD_API.createProgram(data)

            setTimeout(() => {
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: response.data})
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on Programs loading'})
        }
    }
}
