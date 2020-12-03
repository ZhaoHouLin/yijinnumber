import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
  },
  {
    path: '/PhoneNumber',
    name: 'PhoneNumber',
    component: () => import('../components/PhoneNumber.vue'),
  },
  {
    path: '/IDNumber',
    name: 'IDNumber',
    component: () => import('../components/IDNumber.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
