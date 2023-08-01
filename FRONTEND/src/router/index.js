import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLogin from "@/views/AdminLogin.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import ActorProfile from "@/views/ActorProfile.vue";
import ActorProfileOld from "@/views/ActorProfileOld.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/portfolio/:name/:section?',
    name: 'profile',
    component: ActorProfile
  },
  {
    path: '/portfolio-old/:name/:section?',
    name: 'profile',
    component: ActorProfileOld
  },
  {
    path: '/cda-admin',
    name: 'admin-panel',
    meta: {
      admin: true
    },
    component: AdminPanel
  },
  {
    path: '/cda-admin/login',
    name: 'admin-login',
    component: AdminLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const ls = JSON.parse(localStorage.getItem('cda_session'));
  if (to.meta.admin){
    if (ls != null && ls['token'] && ls['id']) next();
    else next("/");
  }
  next();
});

export default router;
