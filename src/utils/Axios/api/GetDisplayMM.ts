import { SetStateAction } from 'react'
import API from '../config/methods'

const GetDisplayMM = (
  batchid: number,
  setDisplayMM: { (value: SetStateAction<Record<string, unknown>>): void; (arg0: any): any }
) => {
  API.POST('/displaymm', { batchid: batchid })
    .then(function ({ data }) {
      return setDisplayMM(data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default GetDisplayMM
