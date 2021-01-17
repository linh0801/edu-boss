const ApiInterface = {
  LOGIN: '/front/user/login',
  GET_USER_INFO: '/front/user/getInfo',
  MENU_SAVE_OR_UPDATE: '/boss/menu/saveOrUpdate',
  GET_EDIT_MENU_INFO: '/boss/menu/getEditMenuInfo',
  GET_ALL_MENU: '/boss/menu/getAll',
  DELET_MENU: '/boss/menu/',
  GET_MENU_NODE_LIST: '/boss/menu/getMenuNodeList',
  GET_ROLE_MENUS: '/boss/menu/getRoleMenus',
  ALLOCATE_ROLE_MENUS: '/boss/menu/allocateRoleMenus',
  // 资源管理
  GET_ALL_RESOUCE: '/boss/resource/getAll',
  GET_RESOURCE_CATEGORY: '/boss/resource/category/getAll',
  GET_RESOURCE_PAGES: '/boss/resource/getResourcePages',
  RESOURCE_SAVE_OR_UPDATE: '/boss/resource/saveOrUpdate',
  GET_RESOURCE: '/boss/resource/',
  DELET_RESOURCE: '/boss/resource/',
  GET_ROLE_RESOURCE: '/boss/resource/getRoleResources',
  ALLOCATE_ROLE_RESOURCES: '/boss/resource/allocateRoleResources',
  // 角色管理
  GET_ALL_ROLES: '/boss/role/all',
  GET_ROLE_PAGES: '/boss/role/getRolePages',
  GET_ROLE: '/boss/role/',
  ROLE_SAVE_OR_UPDATE: '/boss/role/saveOrUpdate',
  // 用户管理
  GET_USER_PAGES: '/boss/user/getUserPages',
  ALLOCATE_ROLE_USERS: '/boss/role/allocateUserRoles',
  GET_ROLE_USER: '/boss/role/user/',
  FORBIT_USER: '/boss/user/forbidUser',
  ENABLE_USER: '/boss/user/enableUser'
}
export default ApiInterface
