import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {$axios, AxiosGet} from "../Axios"

export const KeywordServices = () => {
    const dispatch = useDispatch()

    const [value,setData] = useState([
        {value:0, label:"All Value"}
    ])
    const getData = (params? : string) => {
         AxiosGet('/karir-lokasi', params)
        .then(res => {
            if(res != null)
            {
                setData(res)
            }
        })
    }

    useEffect(() => {
        getData()
    },[])

    return { getData }

}