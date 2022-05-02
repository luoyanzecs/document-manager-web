import {post, uploader} from './http'
import {store} from "@/store";
import {emitNotice, loadUserStore} from "@/tool/utils";
import router from "@/router";

const generateHead = () => {
  return {
    timestamp: Date.now() + "",
    ...loadUserStore()
  }
}

const validateResponseHead = res => {
  if (process.env.VUE_APP_MODE === 'mock') {
    return res.data
  }
  return res.data
}

const errorHandler = (error) => {
  // 错误处理
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    if (error.response.status === 403) {
      router.push("/")
        .then(() => store.commit('unshiftNotice', { message: '身份过期， 请重新登录', type: 0 }))
    }
    if (error.response.status === 500) {
      let head = error.response.data.head;
      store.commit(
        'unshiftNotice',
        { message: (head && head.message) || error.response.data.error, type: 2 }
      )
      throw new Error((head && head.statusCode) || error.response.status)
    }
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    emitNotice({message: '请求超时', type: 2})
  } else {
    // 发送请求时出了点问题
    emitNotice({message: "客户端异常", type: 2})
  }
  throw new Error()
}

const sendHttp = (url, params, callback) => {
  params["head"] = generateHead()
  return callback(url, params)
    .then(validateResponseHead)
    .catch(errorHandler)
}

export const ADD_NEW_USER = params => sendHttp('admin/add/user', params, post)
export const ADD_NEW_NOTICE = params => sendHttp('admin/add/notice', params, post)
export const ADMIN_SEARCH_ALL_IN_ONE = params => sendHttp('admin/search', params, post)
export const DELETE_TABLE_ITEMS = params => sendHttp('admin/delete', params, post)

export const GET_BU = params => sendHttp('getbu', params, post)
export const SEARCH = params => sendHttp('search', params, post)
export const LOGIN = params => sendHttp('login', params, post)
export const NOTICE_GLOBAL = params => sendHttp('notice', params, post)

export const CREATE_FILE = params => sendHttp('user/createFile', params, post)
export const UPDATE_FILE = params => sendHttp('user/updateFile', params, post)
export const FILE_MENU = params => sendHttp('user/menu', params, post)
export const GET_COMMENT = params => sendHttp('user/comment', params, post)
export const GET_FILE = params => sendHttp('user/file', params, post)
export const LEAVE_COMMENT = params => sendHttp('user/leaveMessage', params, post)
export const UPLOAD_ATTACH = params => sendHttp('user/uploadAttach', params, uploader) //上传附件
export const DOWNLOAD_ATTACH = params => sendHttp('user/downloadAttach', params, post) // 下载附件
export const DELETE_ATTACH = params => sendHttp('user/deleteAttach', params, post) // 删除附件