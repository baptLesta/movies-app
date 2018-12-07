import api from '../api'
import { LOGIN, SET_USER } from '@/store/types.js'

export default {

  /**
   * @property  {} payload.username
   * @property  {} payload.password
   */
  async [LOGIN] ({ commit }, payload) {
    const userData = await api.login(payload)

    commit(SET_USER, userData)
  }
}
