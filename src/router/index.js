import Vue from 'vue'
import Router from 'vue-router'
import Club from '@/components/Club'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Club',
      component: Club,
      meta: { requiresAuth: true }
    }
  ]
})
