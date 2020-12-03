import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PhoneNumber from './components/PhoneNumber.vue'
import IDNumber from './components/IDNumber.vue'

Vue.component('PhoneNumber', PhoneNumber)
Vue.component('IDNumber', IDNumber)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
