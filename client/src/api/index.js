import axios from 'axios'
import { API } from '@/config.js'

axios.defaults.baseURL = API

/**
 * @property  {} data.email
 * @property  {} data.password
 * @returns {*} - user and token
 */
function login (data) {
  return axios
    .post('/login', data)
    .then(response => {
      axios.defaults.headers.common['Authorization'] = response.token

      return response.data
    })
}

export default {
  login
}
