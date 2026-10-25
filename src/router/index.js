import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/PhoneNumber' },
  { path: '/PhoneNumber', name: 'PhoneNumber', component: () => import('../components/PhoneNumber.vue') },
  { path: '/IDNumber', name: 'IDNumber', component: () => import('../components/IDNumber.vue') },
  { path: '/Direction', name: 'Direction', component: () => import('../components/FengShuiDirection.vue') },
  // 舊網址（改名前叫算命卦）
  { path: '/MingGua', redirect: '/Direction' },
  // 不存在的網址（例如已移除的 /HeLuo）回首頁
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
