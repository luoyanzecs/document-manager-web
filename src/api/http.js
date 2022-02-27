import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

// get请求
export function get (url, data) {
    return axios.get(url, data)
}
// post请求
export function post (url, data) {
    return axios.post(url, data)
}
// upload 请求
export function uploader (url, file) {
    let params = new FormData()
    params.append('file', file)
    return axios.post(url, params)
}