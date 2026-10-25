import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/PhoneNumber' },
  { path: '/PhoneNumber', name: 'PhoneNumber', component: () => import('../components/PhoneNumber.vue') },
  { path: '/IDNumber', name: 'IDNumber', component: () => import('../components/IDNumber.vue') },
  { path: '/MingGua', name: 'MingGua', component: () => import('../components/MingGua.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
