import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import vueYoutubeEmbed from "vue-youtube-embed";
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
Vue.use(vueYoutubeEmbed);

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/api';
const CDA_SESSION = 'cda_session';
axios.interceptors.request.use(
    async config => {
      const ls = JSON.parse(localStorage.getItem(CDA_SESSION));
      if (ls){
        config.headers = {
          'x-access-token': ls['token'],
          'cda-id': ls['id'],
          'Accept': 'application/json',
        }
      } else {
        config.headers = {
          'Accept': 'application/json',
        }
      }

      return config;
    },
    error => {
      Promise.reject(error)
    });
export const EventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
