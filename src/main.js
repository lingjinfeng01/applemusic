import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './assets/reset.css'
import './assets/webfont/webfont.css'
import './assets/fontIcon/css/font-awesome.css'
import './assets/css/animate.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
