import request from '../utils/request'

export function get_net_menu(){
  return request({
    url:'/navigation/fetch_menu',
    method:'get',
    data:JSON.stringify([{'type':'=','key':'type','value':'default'}])
  })
}
