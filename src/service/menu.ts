import ApiInterface from '../apis/Api'
import request from '../utils/request'
interface Menu {
  parentId: number; // -1 表示没有上级菜单
  name: string;
  href: string;
  icon: string;
  orderNum: number;
  description: string;
  shown: boolean;
}
export const menuSaveOrUpdate = (data: Menu) => {
  return request({
    method: 'POST',
    data: data,
    url: ApiInterface.MENU_SAVE_OR_UPDATE
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    params: {
      id
    },
    url: ApiInterface.GET_EDIT_MENU_INFO
  })
}
export const getAllMenu = () => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_ALL_MENU
  })
}
export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: ApiInterface.DELET_MENU + id
  })
}
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_MENU_NODE_LIST
  })
}
export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: ApiInterface.GET_ROLE_MENUS,
    params: { // axios 会把 params 转换为 key=value&key=value 的数据格式放到 url 后面(以?分割)
      roleId
    }
  })
}

export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: ApiInterface.ALLOCATE_ROLE_MENUS,
    data
  })
}
