import { SetStateAction } from 'react'
import API from '../config/methods'

const GetDisplayMM = (setDisplayMMHeader: {
  (value: SetStateAction<Record<string, unknown>>): void
  (arg0: any): any
}) => {
  API.GET('/displaymm-active')
    .then(function ({ data }) {
      return setDisplayMMHeader(data.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default GetDisplayMM
