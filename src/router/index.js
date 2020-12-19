import Vue from "vue"
import VueRouter from "vue-router"
import Socket from "../plugins/socket";
import store from "../store";

import Layout from "../layout/Layout.vue";
import Sidebar from "../layout/Sidebar.vue";
import Login from "../views/Login.vue";
import Home from "../views/Dashboard.vue";
import MyFeed from "../views/MyFeed.vue";
import GameCard from "../views/GameCard.vue";


Vue.use(VueRouter)

const routes = [
    {
        path:       "/",
        component:  Layout,
        meta: {
            authentication: true,
        },
        redirect:   "/dashboard",
        children: [{
            name:     "dashboard",
            path:     "/dashboard",
            components: {
                main:     Home,
                sidebar:  Sidebar
            },
        },{
            name:       "myFeed",
            path:       "/my-feed",
            components: {
                main:     MyFeed,
                sidebar:  Sidebar
            },
        },{
            name:       "gameCard",
            path:       "/my-feed/:status/game/:gameID",
            components: {
                main:     GameCard,
                sidebar:  Sidebar
            }
        },{
            name:       "controlPanel",
            path:       "/control-panel"
        }]
    },{
        name: "login",
        path: "/login",
        component: Login
    }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {  
  if (to.matched.some(record => record.meta.authentication)) {   
    if (store.getters["auth/isLoggedIn"]) {      
      next()
      return
    }
    next("/login") 
  } else {
    next() 
  }     
});

export default router
