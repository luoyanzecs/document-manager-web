import {post} from './http'
import {store} from "@/store";

const generateHead = () => {
  return {
    timestamp: Date.now() + "",
    username: store.state.userInfo.name || localStorage.getItem('name'),
    token: localStorage.getItem('token'),
    role: store.state.userInfo.role
  }
}

const validateResponseHead = res => {
  console.log(res.data)
  if (process.env.VUE_APP_MODE === 'mock') {
    return res.data
  }
  const head = res.data.head;
  if (head.status === "error") {
    throw new Error(head.message)
  }
  return res.data
}

const sendHttp = (url, params, callback) => {
  params["head"] = generateHead()
  return callback(url, params)
    .then(validateResponseHead)
    .catch(error => {
      console.log(error)
      // 错误处理
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        let head = error.response.data.head;
        store.commit('unshiftNotice', {message: head.message, type: 2, id: Date.now() + ""})
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        store.commit('unshiftNotice', {message: '请求超时', type: 2, id: Date.now() + ""})
      } else {
        // 发送请求时出了点问题
        store.commit('unshiftNotice', {message: "客户端异常", type: 2, id: Date.now() + ""})
      }
    })

}

export const LOGIN = params => sendHttp('login', params, post)
export const FILE_MENU = params => sendHttp('user/menu', params, post)
export const COMMENT = params => sendHttp('user/comment', params, post)
export const GET_FILE = params => sendHttp('user/file', params, post)
export const USER_LIST = params => sendHttp('admin/users', params, post)
export const FILE_LIST = params => sendHttp('admin/files', params, post)
export const RECORD_LIST = params => sendHttp('admin/records', params, post)
export const NOTICE_LIST = params => sendHttp('admin/notices', params, post)
export const NOTICE_GLOBAL = params => sendHttp('notice', params, post)