export const CHANGE_SIDEBAR_STATUS = 'CHANGE_SIDEBAR_STATUS'
export const SET_MENU_DATA = 'SET_MENU_DATA'

export const sidebarStatus = (status) => {
  return {
    type:'CHANGE_SIDEBAR_STATUS',
    status: status
  }
}

export const setMenuData = (data) => {
  return {
    type:'SET_MENU_DATA',
    data: data
  }
}
