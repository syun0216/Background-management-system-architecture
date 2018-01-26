import fetch from '@/utils/new_fetch'
import axios from 'axios'

export function fetchRole(params) {
    return fetch({
        url: '/api/role_management/fetch_role',
        method: 'get',
        params
    })
}

export function editRole(params) {
    return fetch({
        url: '/api/role_management/edit_role',
        method: 'post',
        data: params
    })
}

export function addRole(params){
    return fetch({
        url: '/api/role_management/add_role',
        method: 'post',
        data: params
    })
}

