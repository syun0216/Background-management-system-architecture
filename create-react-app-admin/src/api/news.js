import request from '../utils/request'

export function get_news() {
  return request({
    url: '/company_news/get_company_news',
    method:'get',
    data:{
      page: 1,
      limit: 999
    }
  })
}

export function dispatch_news(title,content,time) {
  return request({
    url: '/company_news/dispatch_company_news',
    method: 'post',
    data: {
      title,
      content,
      time
    }
  })
}

export function edit_news(id,title,content,time) {
  return request({
    url: '/company_news/edit_company_news',
    method: 'post',
    data: {
      id,
      title,
      content,
      time
    }
  })
}

export function delete_news(id) {
  return request({
    url: '/company_news/delete_company_news',
    method: 'post',
    data: {
      id
    }
  })
}