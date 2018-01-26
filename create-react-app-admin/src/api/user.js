import request from '../utils/request'

export function user_login(username,password){
  return request({
    url:'/api/user/login_v2',
    method:'post',
    data:{
      username:username,
      password:password
    }
  })
}

export function user_logout() {
  return request({
    url: '/api/user/logout_v2',
    method: 'get'
  })
}
