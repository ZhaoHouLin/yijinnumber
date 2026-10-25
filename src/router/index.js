import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/PhoneNumber' },
  { path: '/PhoneNumber', name: 'PhoneNumber', component: () => import('../components/PhoneNumber.vue') },
  { path: '/IDNumber', name: 'IDNumber', component: () => import('../components/IDNumber.vue') },
  { path: '/MingGua', name: 'MingGua', component: () => import('../components/MingGua.vue') },
  // 不存在的網址（例如已移除的 /HeLuo）回首頁
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
