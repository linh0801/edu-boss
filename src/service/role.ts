import ApiInterface from '../apis/Api'
import request from '../utils/request'

export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `${ApiInterface.GET_ROLE}${id}`
  })
}
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_ALL_ROLES
  })
}
export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: ApiInterface.GET_ROLE_PAGES,
    data
  })
}

export const saveOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: ApiInterface.ROLE_SAVE_OR_UPDATE,
    data
  })
}
export const getRole = (id: string | number) => {
  return request({
    method: 'GET',
    url: `${ApiInterface.GET_ROLE}${id}`
  })
}

export const allocRoleUsers = (data: any) => {
  return request({
    method: 'POST',
    url: ApiInterface.ALLOCATE_ROLE_USERS,
    data
  })
}
