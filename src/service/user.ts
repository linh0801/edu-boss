import ApiInterface from '../apis/Api'
import request from '../utils/request'
import qs from 'qs'
// import store from '@/store'
interface User {
  phone: string;
  password: string;
}
export const login = (data: User) => {
  return request({
    method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // data,
    data: qs.stringify(data),
    url: ApiInterface.LOGIN
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_USER_INFO
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded',
    //   Authorization: store.state.user.access_token
    // }
  })
}

export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    data,
    url: ApiInterface.GET_USER_PAGES
  })
}

export const getRoleUser = (id: string | number) => {
  return request({
    method: 'GET',
    url: `${ApiInterface.GET_ROLE_USER}${id}`
  })
}

export const forbidUser = (userId: string | number) => {
  return request({
    method: 'POST',
    url: ApiInterface.FORBIT_USER,
    data: {
      userId
    }
  })
}
export const enableUser = (userId: string | number) => {
  return request({
    method: 'GET',
    url: ApiInterface.ENABLE_USER,
    params: {
      userId
    }
  })
}
