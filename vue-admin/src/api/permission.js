import fetch from '@/utils/new_fetch'

export function fetchPermission(params) {
    return fetch({
        url: '/api/permission_qhdata/fetch_permission',
        method: 'get',
        params: params
    })
}

export function alterPermission(params) {
    return fetch({
        url: '/api/permission_qhdata/alter_permission',
        method: 'post',
        data: params
    })
}

export function fetchColPermissionDetail(params){
    return fetch({
        url: '/api/permission_qhdata/fetch_col_permission_detail',
        method: 'get',
        params: params
    })
}

