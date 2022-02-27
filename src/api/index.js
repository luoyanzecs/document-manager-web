import {post} from './http'

export const LOGIN = (params) => post('login', params)