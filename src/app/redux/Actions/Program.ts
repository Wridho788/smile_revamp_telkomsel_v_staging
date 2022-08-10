import {Dispatch} from "redux"
import {CreateProgramInitial, ProgramPageDataInitial} from "../Utils/InitialState/ProgramInitial";
import {ActionTypes, Types} from "../Types/Types";
import {ICreateProgram, ICreateProgramState} from "../Utils/Interface/IProgram";
import {IDefaultListInitial} from "../Utils/InitialState/DefaultListInitial";

import LOV_API from "../../services/API/Lov";
import CUSTOMER_API from "../../services/API/Customer";
import LOCATION_API from "../../services/API/Location";
import KEYWORD_API from "../../services/API/Keyword";
import {IParamsListDefault} from "../Utils/Interface/IParamList";
import PROGRAM_API from "../../services/API/Program";
import NOTIFICATION_API from "../../services/API/Notification";

export const getProgramPage = () => {

    const params = {limit: 10, skip: 0, filter: {}, sort: {}};

    const mainInfo = ProgramPageDataInitial.main_info
    const segmentation = ProgramPageDataInitial.segmentation
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
            await LOV_API.getCustomerType()
                .then((res) => {
                    segmentation.customer_type = res.data
                })

            // const params = {limit: 100, skip: 0};
            await NOTIFICATION_API.notificationList(params)
                .then((res) => {
                    notification.notification = res.data
                })
            await LOV_API.getNotifVia()
                .then((res) => {
                    notification.via = res.data
                })
            await LOV_API.getNotifReceiver()
                .then((res) => {
                    notification.receiver = res.data
                })
            await LOV_API.getTransactionType()
                .then((res) => {
                    notification.transactionType = res.data
                })


            await CUSTOMER_API.customerList(params).then((res) => {
                segmentation.customer_msisdn = res.data;
            });
            await CUSTOMER_API.customerTierList(params).then((res) => {
                segmentation.customer_tier = res.data;
                segmentation.customer_ARPU = res.data;
            });
            await CUSTOMER_API.customerBadgeList(params).then((res) => {
                segmentation.customer_badges = res.data;
            });
            await LOCATION_API.locationList(params).then((res) => {
                segmentation.customer_location = res.data;
            });
            await LOCATION_API.locationList(params).then((res) => {
                segmentation.customer_preferences = res.data;
            });
            await CUSTOMER_API.customerBrandList(params).then((res) => {
                segmentation.customer_brand = res.data;
            });
            setTimeout(() => {
                console.log(ProgramPageDataInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: ProgramPageDataInitial})

            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on Programs loading'})
        }
    }
};

export const customerList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip, filter: {}, sort: {}};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            await CUSTOMER_API.customerList(params).then((res) => {
                IDefaultListInitial.data = res.data;
                IDefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log("customer list")
                console.log(IDefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: IDefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            alert(e)
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on todos loading",
            });
        }
    };
};
export const customerTierList = ({
                                     limit = 10,
                                     skip = 0,
                                 }: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            await CUSTOMER_API.customerTierList(params).then((res) => {
                IDefaultListInitial.data = res.data;
                IDefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(IDefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: IDefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on todos loading",
            });
        }
    };
};

export const customerBadgeList = ({
                                      limit = 10,
                                      skip = 0,
                                  }: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            await CUSTOMER_API.customerBadgeList(params).then((res) => {
                IDefaultListInitial.data = res.data;
                IDefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(IDefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: IDefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on todos loading",
            });
        }
    };
};

export const customerBrandList = ({
                                      limit = 10,
                                      skip = 0,
                                  }: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            await CUSTOMER_API.customerBrandList(params).then((res) => {
                IDefaultListInitial.data = res.data;
                IDefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(IDefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: IDefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on todos loading",
            });
        }
    };
};

export const locationList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip, filter: {}, sort: {}};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            await LOCATION_API.locationList(params).then((res) => {
                IDefaultListInitial.data = res.data;
                IDefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(IDefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: IDefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on todos loading",
            });
        }
    }
}

export const getProgramList = ({limit = 10, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip, filter: {}, sort: {}};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            await PROGRAM_API.getProgramList(params).then((res) => {
                IDefaultListInitial.data = res.data;
                IDefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(IDefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: IDefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on todos loading",
            });
        }
    }

}
export const createProgram = (data: ICreateProgram) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await PROGRAM_API.createProgram(data)
                .then((res) => {
                    console.log(res)
                    console.log(CreateProgramInitial)
                })

            // setTimeout(() => {
            //     dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: CreateProgramInitial})
            // }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on keywords loading'})
        }
    }
};
