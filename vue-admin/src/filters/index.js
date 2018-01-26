// current_choose filter
import store from '../store'
import { fetch_user_name } from '@/api/user'

// user name filter
export function user_name_filter(ids, callback) {
  const _condition = [{ 'type': 'in', 'key': 'id', 'value': ids }]
  if (store.getters.username != null) {
    const target = {}
    let isUndefined = false
    ids.forEach((val, idx) => {
      if (typeof store.getters.username[val] === 'undefined') {
        isUndefined = true
      }
      target[val] = store.getters.username[val]
    })
    if (isUndefined) {
      fetch_user_name(JSON.stringify(_condition)).then(data => {
        const user_name = {}
        data.data.forEach((val, idx) => {
          user_name[val.id] = val
        })
        store.dispatch('StoreUserName', user_name)
        callback(user_name)
      })
    } else {
      callback(target)
    }
  } else {
    fetch_user_name(JSON.stringify(_condition)).then(data => {
      const user_name = {}
      data.data.forEach((val, idx) => {
        user_name[val.id] = val
      })
      store.dispatch('StoreUserName', user_name)
      callback(user_name)
    })
  }
}
