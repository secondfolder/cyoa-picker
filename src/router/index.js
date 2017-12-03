import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Share from '@/components/Share'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/share/:hash?',
      name: 'share',
      component: Share
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
