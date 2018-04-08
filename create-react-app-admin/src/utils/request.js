import axios from 'axios'
import qs from 'qs'
import lodash from 'lodash'
import { message } from 'antd'

const current_url = process.env.NODE_ENV === 'production' ?
'http://localhost:3000' : 'http://'+window.location.host

const request = (options) => {
  let {
    method = 'get',
    data,
    url
  } = options
  const cloneData = lodash.cloneDeep(data)

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(current_url+url,{
        params:cloneData
      })
      break;
    case 'post':
        return axios.post(current_url+url,qs.stringify(cloneData))
      break;
    case 'delete':
        return axios.delete(current_url+url, {
          data:cloneData
      })
      break;
    default:
      return axios(options)
  }
}
export default request
