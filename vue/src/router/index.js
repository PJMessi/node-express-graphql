import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },

  {
    path: '/bookings',
    name: 'Booking',
    component: () => import('../views/Booking.vue')
  },

  {
    path: '/events',
    name: 'Event',
    component: () => import('../views/Event.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
