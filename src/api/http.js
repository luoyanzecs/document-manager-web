import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.timeout = 10 * 1000

// get请求
export function get (url, data) {
    return axios.get(url, data)
}
// post请求
export function post (url, data) {
    return axios.post(url, data)
}
// upload 请求
export function uploader (url, data) {
    let params = new FormData()
    for (let key in data) {
        params.append(key,
          key === 'file'
            ? data[key]
            : new Blob([JSON.stringify(data[key])], { type: 'application/json' })
        )
    }
    return axios.post(url, params, {responseType: 'blob'})
}