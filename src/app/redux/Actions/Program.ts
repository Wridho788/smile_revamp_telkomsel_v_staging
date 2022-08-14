import {Dispatch} from "redux"
import {
    CreateProgramInitial,
    ProgramItemInitial,
    ProgramListInitial,
    ProgramPageDataInitial
} from "../Utils/InitialState/ProgramInitial";
import {ActionTypes, Types} from "../Types/Types";
import {
    ICreateProgram,
    ICreateProgramReducer,
    IProgramImportFile,
    IProgramItem,
    IProgramList
} from "../Utils/Interface/IProgram";
import {DefaultListInitial} from "../Utils/InitialState/DefaultListInitial";

import LOV_API from "../../services/API/Lov";
import CUSTOMER_API from "../../services/API/Customer";
import LOCATION_API from "../../services/API/Location";
import KEYWORD_API from "../../services/API/Keyword";
import {IParamsListDefault} from "../Utils/Interface/IParamList";
import PROGRAM_API from "../../services/API/Program";
import NOTIFICATION_API from "../../services/API/Notification";
import Instance from "../../services/Axios/Instance";

const params = {limit: 100, skip: 10, filter: {}, sort: {}};
// GET
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
                DefaultListInitial.data = res.data;
                DefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log("customer list")
                console.log(DefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: DefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            alert(e)
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
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
                DefaultListInitial.data = res.data;
                DefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(DefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: DefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
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
                DefaultListInitial.data = res.data;
                DefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(DefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: DefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
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
                DefaultListInitial.data = res.data;
                DefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(DefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: DefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
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
                DefaultListInitial.data = res.data;
                DefaultListInitial.total = res.total;
            });

            setTimeout(() => {
                console.log(DefaultListInitial);
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: DefaultListInitial,
                });
            }, 1500);
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
            });
        }
    }
}

export const getProgramList = ({limit = 100, skip = 0}: IParamsListDefault) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip, filter: {}, sort: {}};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            const response = await PROGRAM_API.getProgramList(params)
            ProgramListInitial.data = response.data
            ProgramListInitial.total = response.total
            setTimeout(() => {
                console.log(response)
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: ProgramListInitial,
                });
            }, 1500)

        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
            });
        }
    }
}

export const programDetail = (_id: string) => {
    return async (dispatch: Dispatch<Types>) => {
        try {

            const baseUrl = process.env.REACT_APP_BASE_URL
            dispatch({type: ActionTypes.FETCH_DATA});
            await PROGRAM_API.detailProgram(_id)
                .then((res) => {
                    dispatch({
                        type: ActionTypes.FETCH_DATA_SUCCESS,
                        payload: res.data,
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
            });
        }
    }
}
// export const getProgramTempList = ({limit = 10, skip = 0}: IParamsListDefault) => {
//     return async (dispatch: Dispatch<Types>) => {
//         try {
//             dispatch({type: ActionTypes.FETCH_DATA});
//            const response = await PROGRAM_API.getProgramTempList(params)
//             setTimeout(() => {
//                 dispatch({
//                     type: ActionTypes.FETCH_DATA_SUCCESS,
//                     payload: response.data,
//                 });
//             }, 1500)
//         } catch (e) {
//             dispatch({
//                 type: ActionTypes.FETCH_DATA_ERROR,
//                 payload: "Error on loading",
//             });
//         }
//     }
// }
export const getProgramSegmentationList = ({limit = 100, skip = 0}: IParamsListDefault, _id: string) => {
    return async (dispatch: Dispatch<Types>) => {
        const params = {limit: limit, skip: skip, filter: {}, sort: {}};
        try {
            dispatch({type: ActionTypes.FETCH_DATA});
            const response = await PROGRAM_API.getProgramSegmentationList(params, _id)
            ProgramListInitial.data = response.data
            ProgramListInitial.total = response.total
            setTimeout(() => {
                console.log(response)
                dispatch({
                    type: ActionTypes.FETCH_DATA_SUCCESS,
                    payload: ProgramListInitial,
                });
            }, 1500)

        } catch (e) {
            dispatch({
                type: ActionTypes.FETCH_DATA_ERROR,
                payload: "Error on loading",
            });
        }
    }
}


// POST
export const createProgram = (data: ICreateProgram) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await PROGRAM_API.createProgram(data)
                .then((res) => {
                    if (res.status != 200) {
                        alert(res.statusText)
                        dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: res.statusText})
                    }
                    return res
                })
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on keywords loading'})
        }
    }
}
export const programImportFile = (data: IProgramImportFile) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            await PROGRAM_API.programImportFile(data)
                .then(async (res) => {
                    if (res != 200) {
                        alert("Invalid load API")
                    }
                    await PROGRAM_API.getProgramTempList(params)
                        .then((res) => {
                            DefaultListInitial.data = res.data;
                            DefaultListInitial.total = res.total;
                        });
                })
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on program loading'})
        }
    }
}


// DELETE
export const deleteProgram = (_id: string) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await PROGRAM_API.deleteProgram(_id)
                .then((res) => {
                    if (res.status != 200) {
                        alert(res.statusText)
                        dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: res.statusText})
                    }
                    getProgramList({})
                })
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on program loading'})
        }
    }
}
export const deleteProgramTempList = (_id: string) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            await PROGRAM_API.deleteProgramTempList(_id)
                .then(async (res) => {
                    if (res.status != 200) {
                        alert(res)
                    }
                    await PROGRAM_API.getProgramTempList(params)
                        .then((res) => {
                            DefaultListInitial.data = res.data;
                            DefaultListInitial.total = res.total;
                        });
                })
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on program loading'})
        }
    }
}
