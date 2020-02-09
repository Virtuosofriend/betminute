import Vue from 'vue'
import VueRouter from 'vue-router'
import Socket from '../plugins/socket';

import Layout from '../layout/Layout.vue';
import Sidebar from '../layout/Sidebar.vue';
import Login from '../views/Login.vue';
import Home from '../views/Dashboard.vue';

import store from '../store';
import socket from '../plugins/socket';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    meta: {
      authentication: true,
    },
    redirect: "/dashboard",
    children: [{
      name: 'dashboard',
      path: '/dashboard',
      components: {
        main: Home,
        sidebar: Sidebar
      },
    }]
  },
  {
    name: "login",
    path: "/login",
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {  
  if (to.matched.some(record => record.meta.authentication)) {   
    if (store.getters["auth/isLoggedIn"]) {      
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }     
});

export default router
