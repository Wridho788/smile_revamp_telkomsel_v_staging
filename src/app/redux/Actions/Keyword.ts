import {Dispatch} from "redux"
import API from "../../services/API/Keyword"
import {KeywordAction,
    KeywordActionTypes,
    KeywordPageData,
MainInfo,
    Segmentation,
    Notification
} from "../Types/keyword"
import {KeywordPageDataInitial} from "../Reducers/keywordReducer";


export const fetchKeywords = () => {
    return async (dispatch: Dispatch<KeywordAction>) => {
        try {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})
            const response = await API.getDataTes()

            setTimeout(() => {
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: response.data})
            }, 1500)
        } catch (e) {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on keywords loading'})
        }
    }
}
export const getKeywordType = () => {
   const mainInfo = KeywordPageDataInitial.main_info
   const segmentation = KeywordPageDataInitial.segmentation
   const notification = KeywordPageDataInitial.notification
    return async (dispatch: Dispatch<KeywordAction>) => {
        try {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})

            const keywordType = await API.getKeywordType()
                .then((res) => {
                    mainInfo.keyword_type = res.data
                    segmentation.keyword_type = res.data
                    notification.keyword_type = res.data
                })
            const programType = await API.getProgramType()
                .then((res) => {
                    mainInfo.program_type = res.data
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

export const getProgramType = () => {
    return async (dispatch: Dispatch<KeywordAction>) => {
        try {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})
            const response = await API.getKeywordType()

            setTimeout(() => {
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: response.data})
            }, 1500)
        } catch (e) {
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on keywords loading'})
        }
    }
}