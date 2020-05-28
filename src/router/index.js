import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Modules from '../views/modules'
import Block from '../views/block'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/modules/list',
    name: 'modules-list',
    component: Modules.List
  },
  {
    path: '/block/list/:name',
    name: 'block-list',
    component: Block.List
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
