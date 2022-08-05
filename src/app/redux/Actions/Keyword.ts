import {Dispatch} from "redux"
import API from "../../services/API/Keyword"
import {
    ICreateKeywordState,
    KeywordAction,
    KeywordActionTypes,
} from "../Types/keyword"
import {KeywordPageDataInitial} from "../Reducers/keywordReducer";

export const getKeywordType = () => {
    const mainInfo = KeywordPageDataInitial.main_info
    const segmentation = KeywordPageDataInitial.segmentation
    const notification = KeywordPageDataInitial.notification
    return async (dispatch: Dispatch<KeywordAction>) => {
        try {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})

            await API.getKeywordType()
                .then((res) => {
                    mainInfo.keyword_type = res.data
                })
            await API.getPointType()
                .then((res) => {
                    mainInfo.point_type = res.data
                })
            await API.getMechanism()
                .then((res) => {
                    mainInfo.mechanism = res.data
                })
            await API.getOwner()
                .then((res) => {
                    mainInfo.owner = res.data
                })
            await API.getProgramType()
                .then((res) => {
                    segmentation.program_type = res.data
                    notification.program_type = res.data
                })

            setTimeout(() => {
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: KeywordPageDataInitial})

            }, 1500)
        } catch (e) {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on keywords loading'})
        }
    }
}

interface ICreateKeywordProps {
    data: ICreateKeywordState
}
export const createKeyword = ({data}: ICreateKeywordProps) => {
    return async (dispatch: Dispatch<KeywordAction>) => {
        try {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})
            const response = await API.createKeyword(data)

            setTimeout(() => {
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: response.data})
            }, 1500)
        } catch (e) {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on keywords loading'})
        }
    }
}
