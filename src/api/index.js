import {post, get} from './http'

export const LOGIN = params => post('login', params)
export const FILE_MENU = params => get('user/menu', params)
export const COMMENT = params => post('user/comment', params)
export const USER_LIST = params => post('admin/users', params)
export const FILE_LIST = params => post('admin/files', params)
export const RECORD_LIST = params => post('admin/records', params)
export const NOTICE_LIST = params => post('admin/notices', params)
export const NOTICE_GLOBAL = params => get('notice', params)
export const GET_FILE = params => get('file', params)