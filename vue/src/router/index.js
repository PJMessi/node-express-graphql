import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresLogout: true },
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { requiresLogout: true },
  },

  {
    path: '/bookings',
    name: 'Booking',
    component: () => import('../views/Booking.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/events',
    name: 'Event',
    component: () => import('../views/Event.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else if (to.meta.requiresLogout && store.getters.isLoggedIn) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
