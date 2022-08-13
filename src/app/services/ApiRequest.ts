import axios, {AxiosRequestHeaders} from "axios";

interface PropsConstruct {
    BaseURL?: string,
    Headers?: AxiosRequestHeaders
}


const useApiRequest = ({BaseURL, Headers}: PropsConstruct) => {
    let _BaseURL: string = BaseURL ?? process.env.REACT_APP_BASE_URL!
    let _Headers: AxiosRequestHeaders = Headers ?? {
        'Content-Type': 'application/x-www-form-urlencoded'

    }

    const fetch = axios.create({
        baseURL: _BaseURL,
        headers: _Headers
    });

    return {fetch}
}

export default useApiRequest

// How to use this
// initiate the hook call :  const { fetch } = useApiRequest({})
// fetch.get('https://example').then()

// if you want to change base url, do it at useApiRequest({BaseURL: "https://changeurl", Headers: {content-type: ""}})
