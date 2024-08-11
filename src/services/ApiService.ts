import axios from 'axios'

import { getCookie } from 'cookies-next'

axios.interceptors.request.use(config => {
  const token = getCookie('token')

  config.headers.Authorization = token ? `Bearer ${token}` : ''

  return config
})

export default axios
