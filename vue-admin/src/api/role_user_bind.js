import fetch from '@/utils/new_fetch'
import axios from 'axios'

export function fetchUserRoleBind(params){
    return fetch({
        url: '/api/role_user/fetch',
        method: 'get',
        params
    })
}

export function bindUserRole(params){
    return fetch({
        url: '/api/role_user/bind_user_role',
        method: 'post',
        data: params
    })
}