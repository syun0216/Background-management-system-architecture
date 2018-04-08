import request from '../utils/request'

export function user_login(account,password){
  return request({
    url:'/user/login',
    method:'post',
    data:{
      account,
      password
    }
  })
}

export function user_logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
