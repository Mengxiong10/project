import Vue from 'vue'
import App from './app'
import Home from './components/home.vue'
import New from './components/new.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/new': {
    component: New
  },
  '/edit/:id': {
    name: 'edit',
    component: New
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')

