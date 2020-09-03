import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import firestore from './plugins/firestore'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.prototype.$db = firestore

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
