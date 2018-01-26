import fetch from '@/utils/new_fetch'
import axios from 'axios'
import qs from 'qs'

export function user_captcha() {
  return fetch({
    url: '/api/user/captcha',
    method: 'get'
  })
}

export function user_login(username, password) {
  return fetch({
    url: '/api/user/login_v2',
    method: 'post',
    data: qs.stringify({
      username: username,
      password: password
    })
  })
}

export function user_logout() {
  return fetch({
    url: '/api/user/logout_v2',
    method: 'get'
  })
}

export function userList(params) {
  return fetch(
    {
      url: '/api/user/user_list',
      method: 'post',
      data: params
    }
  )
}

export function fetchUser(params) {
  return fetch({
    url: '/api/user/fetch',
    method: 'get',
    params
  })
}

export function editUser(params) {
  return fetch({
    url: '/api/user/edit',
    method: 'post',
    data: params
  })
}

export function fetch_user_name(condition) {
  return fetch({
    url: '/api/user/fetch_user_name',
    method: 'get',
    params: {
      condition: condition
    }
  })
}

export function addUser(params) {
  return fetch({
    url: '/api/user/add_user',
    method: 'post',
    data: params
  })
}

export function updatePassword(params) {
  return fetch({
    url: '/api/user/updatePassword',
    method: 'post',
    data: params
  })
}
