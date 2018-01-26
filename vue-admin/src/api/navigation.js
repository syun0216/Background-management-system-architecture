import fetch from '@/utils/new_fetch'

export function fetch_menu() {
  return fetch({
    url: '/api/navigation/fetch_menu',
    method: 'get',
    params: {
      page: 1,
      limit: 999,
      condition: JSON.stringify([{ 'type': '=', 'key': 'type', 'value': 'default' }])
    }
  })
}

export function fetchNetMenu(condition = JSON.stringify([{ 'type': '=', 'key': 'type', 'value': 'default' }])) {
  return fetch({
    url: '/api/navigation/fetch_net_menu',
    method: 'get',
    params: {
      page: 1,
      limit: 999,
      condition: condition
    }
  })
}

export function add_menu(form) {
  const params = new URLSearchParams()
  params.append('name', form.name)
  params.append('path_temp', form.path_temp)
  params.append('parent_id', form.parent_id[form.parent_id.length - 1])
  params.append('img', form.img)
  params.append('sort', form.sort)
  params.append('level', form.parent_id.length + 1)
  params.append('shape', form.shape)
  return fetch({
    url: '/api/navigation/add_menu',
    method: 'post',
    data: params
  })
}

export function edit_menu(menu_id, form) {
  const params = new URLSearchParams()
  params.append('name', form.name)
  params.append('path_temp', form.path_temp)
  params.append('parent_id', form.parent_id[form.parent_id.length - 1])
  params.append('img', form.img)
  params.append('sort', form.sort)
  params.append('level', form.parent_id.length + 1)
  params.append('shape', form.shape)
  params.append('menu_id', menu_id)
  return fetch({
    url: '/api/navigation/edit_menu',
    method: 'post',
    data: params
  })
}

export function delete_menu(menu_id) {
  return fetch({
    url: '/api/navigation/del_menu',
    method: 'delete',
    params: {
      menu_id: menu_id
    }
  })
}
