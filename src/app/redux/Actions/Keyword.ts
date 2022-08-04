import { Dispatch } from "redux"
import API from "../../services/API/Keyword"
import { KeywordAction, KeywordActionTypes } from "../Types/keyword"

export const fetchKeywords = () => {
    return async (dispatch: Dispatch<KeywordAction>) => {
        try{
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})
            const response = await API.getDataTes()

            setTimeout(()=>{
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: response.data})
            }, 1500)
        }catch(e){
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on KEYWORDS loading'})
        }
    }
}
export const getKeywordType = () => {
    return async (dispatch: Dispatch<KeywordAction>) => {
        try{
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})
            const response = await API.getKeywordType()

            setTimeout(()=>{
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: response.data})
            }, 1500)
        }catch(e){
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on KEYWORDS loading'})
        }
    }
}