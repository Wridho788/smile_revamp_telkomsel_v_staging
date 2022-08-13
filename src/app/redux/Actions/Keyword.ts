import {Dispatch} from "redux"
import {KeywordPageDataInitial} from "../Utils/InitialState/KeywordInitial";
import {ActionTypes, Types} from "../Types/Types";
import {DefaultListInitial} from "../Utils/InitialState/DefaultListInitial";
import {CreateKeywordInitial} from "../Utils/InitialState/KeywordInitial";
import LOV_API from "../../services/API/Lov";
import CUSTOMER_API from "../../services/API/Customer";
import {IParamsListDefault} from "../Utils/Interface/IParamList";
import {ICreateKeyword, ISetCreateDataKeywordState} from "../Utils/Interface/IKeyword";
import KEYWORD_API from "../../services/API/Keyword";
import NOTIFICATION_API from "../../services/API/Notification";

export const getKeywordPage = () => {
    const mainInfo = KeywordPageDataInitial.main_info
    const bonus = KeywordPageDataInitial.bonus
    const notification = KeywordPageDataInitial.notification
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})

            await LOV_API.getKeywordType()
                .then((res) => {
                    mainInfo.keyword_type = res.data
                })
            await LOV_API.getPointType()
                .then((res) => {
                    mainInfo.point_type = res.data
                })
            await LOV_API.getBonusType()
                .then((res) => {
                    bonus.bonus_type = res.data
                })


            await LOV_API.getNotifVia()
                .then((res) => {
                    notification.via = res.data
                })
            const params = {limit: 100, skip: 0};
            await NOTIFICATION_API.notificationList(params)
                .then((res) => {
                    notification.notification = res.data
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
                console.log(KeywordPageDataInitial)
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: KeywordPageDataInitial})

            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on keywords loading'})
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
                    DefaultListInitial.data = res.data
                    DefaultListInitial.total = res.total
                    console.log(DefaultListInitial)
                    dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: DefaultListInitial})
                })
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on todos loading'});
        }
    }
}

export const createKeyword = (data: ICreateKeyword) => {
    return async (dispatch: Dispatch<Types>) => {
        try {
            dispatch({type: ActionTypes.FETCH_DATA})
            const response = await KEYWORD_API.createKeyword(data).then((res) => {
                console.log(CreateKeywordInitial)
                CreateKeywordInitial.keyword_type = res.data
                dispatch({type: ActionTypes.FETCH_DATA_SUCCESS, payload: CreateKeywordInitial})
            })

            setTimeout(() => {
            }, 1500)
        } catch (e) {
            dispatch({type: ActionTypes.FETCH_DATA_ERROR, payload: 'Error on keywords loading'})
        }
    }
}
