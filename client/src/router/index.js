import Vue from 'vue'
import Router from 'vue-router'
import LayoutConnexion from '@/components/LayoutConnexion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LayoutConnexion
    }
  ]
})
