// import api from '../api'
// import {GET_IMAGE, SET_IMAGE, SET_IMAGE_META} from '@/store/types.js'

// export default {
// 	async [GET_IMAGE] ({ commit }, payload) {
// 		const imageData = await api.getImage(payload)
// 		console.log({imageData})
// 		commit(SET_IMAGE, imageData)

// 		const imageMeta = await api.getMetaImage(payload)
// 		commit(SET_IMAGE_META, imageMeta)
// 	},
// 	async [SET_IMAGE] ({ commit }, payload) {
// 		console.log({payload})
// 		api.setImage(payload.hash, payload.property, payload.value)
// 		// commit(SET_IMAGE, imageData)
// 	}
// }
