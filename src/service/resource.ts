import ApiInterface from '../apis/Api'
import request from '../utils/request'
interface FormData {
  name: string;
  url: string;
  categoryId: string;
  // current: number;
  // size: number;
}

export const deleteResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: ApiInterface.DELET_RESOURCE + id
  })
}
export const getAllResource = () => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_ALL_RESOUCE
  })
}
export const getResourcePages = (data: FormData) => {
  return request({
    method: 'POST',
    url: ApiInterface.GET_RESOURCE_PAGES,
    data
  })
}
export const getResourceCategory = () => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_RESOURCE_CATEGORY
  })
}
export const saveOrUpdateResource = (data: FormData) => {
  return request({
    method: 'POST',
    url: ApiInterface.RESOURCE_SAVE_OR_UPDATE,
    data
  })
}
export const getResource = (id: string | number) => {
  return request({
    method: 'GET',
    url: `${ApiInterface.GET_RESOURCE}/${id}`
  })
}
