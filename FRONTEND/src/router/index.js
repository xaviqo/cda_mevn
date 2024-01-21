import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLogin from "@/views/AdminLogin.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import ActorProfile from "@/views/ActorProfile.vue";

const CDA_TITLE = "Carrusel de Actores"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Representación de actores y actrices " + new Date().getFullYear()
    }
  },
  {
    path: '/portfolio/:name/:section?',
    name: 'profile',
    component: ActorProfile,
    meta: {
      title: "Perfil de "
    }
  },
  {
    path: '/cda-admin',
    name: 'admin-panel',
    meta: {
      admin: true,
      title: "Panel de Admin CDA"
    },
    component: AdminPanel
  },
  {
    path: '/cda-admin/login',
    name: 'admin-login',
    component: AdminLogin,
    meta: {
      title: "Login CDA"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title.toUpperCase().includes("PERFIL")) {
    document.title = CDA_TITLE + " - " + to.meta.title + paramCleaner(to.params.name)
    if (to.params.section) {
          document.title = document.title + " " + paramCleaner(to.params.section)
    }
  } else {
    document.title = CDA_TITLE + " - " + to.meta.title;
  }
  document.title = document.title + " " + new Date().getFullYear();
  const ls = JSON.parse(localStorage.getItem('cda_session'));
  if (to.meta.admin){
    if (ls != null && ls['token'] && ls['id']) next();
    else next("/");
  }
  next();
});

const paramCleaner = (param) => {
  return param.includes("-")
      ? param.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() )
          .join(' ')
      : param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
}

export default router;
