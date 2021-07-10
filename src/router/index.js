import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'home'
  },
  {
    path:"/home",
    name:'Home',
    component:()=>import('../views/home.vue')
  },
  {
    path:"/fullpage",
    name:'FullPage',
    component:()=>import('../views/fullPage.vue')
  }
]

const router = new VueRouter({

  routes
})

export default router
