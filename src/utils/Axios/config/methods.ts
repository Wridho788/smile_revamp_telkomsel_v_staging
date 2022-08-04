import GlobalAPI from '..'

const API = {
  GET: (url: string, params?: any) => GlobalAPI.get(url, params),
  POST: (url: string, params?: any) => GlobalAPI.post(url, params),
}

export default API
