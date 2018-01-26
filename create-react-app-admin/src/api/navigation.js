import request from '../utils/request'

export function get_menu(){
  return request({
    url:'/api/navigation/fetch_menu',
    method:'get',
    data:JSON.stringify([{'type':'=','key':'type','value':'default'}])
  })
}

export function get_net_menu(){
  return request({
    url:'/api/navigation/fetch_net_menu',
    method:'get',
    data:JSON.stringify([{'type':'=','key':'type','value':'default'}])
  })
}
