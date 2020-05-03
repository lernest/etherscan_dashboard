import Vue from 'vue'
import VueRouter from 'vue-router'
import Ether from '../views/Ether.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ether',
    component: Ether,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
