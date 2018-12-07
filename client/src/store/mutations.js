import { SET_USER } from '@/store/types.js'

export default {
  [SET_USER] (state, data) {
    state.data = data
  }
}
