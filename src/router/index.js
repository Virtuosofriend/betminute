import Vue from "vue"
import VueRouter from "vue-router"
import Socket from "../plugins/socket"; // do not delete
import store from "../store";
import { CONFIG } from "../commons/config";

import Layout from "../layout/Layout.vue";
import Sidebar from "../layout/Sidebar.vue";
import Login from "../views/Login.vue";
import Home from "../views/Dashboard.vue";
import Feed from "../views/Feed.vue";
import GameCard from "../views/GameCard.vue";
import Settings from "../views/Settings.vue";
import MyTips from "../views/MyTips.vue";

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
            name:       "feed",
            path:       "/feed",
            components: {
                main:     Feed,
                sidebar:  Sidebar
            },
        },{
            name:       "gameCard",
            path:       "/feed/:status/game/:gameID",
            components: {
                main:     GameCard,
                sidebar:  Sidebar
            }
        },{
            name:       "settings",
            path:       "/settings",
            components: {
                main:     Settings,
                sidebar:  Sidebar
            }
        },{
            name:       "myTips",
            path:       "/my-tips",
            components: {
                main:     MyTips,
                sidebar:  Sidebar
            }
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
        store.commit("socket/changeSocketTimer", CONFIG.default_socket_timer); 
        return next();
    }
    next("/login");
  } else {
    next();
  }     
});

export default router
