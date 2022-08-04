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
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on keywords loading'})
        }
    }
}
export const getKeywordType = () => {
    return async (dispatch: Dispatch<KeywordAction>) => {
        try{
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS})
            const response = await API.getKeywordType()
            console.log(response.data)

            setTimeout(()=>{
                dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS, payload: response.data})
            }, 1500)
        }catch(e){
            console.log(e)
            dispatch({type: KeywordActionTypes.FETCH_KEYWORDS_ERROR, payload: 'Error on keywords loading'})
        }
    }
}