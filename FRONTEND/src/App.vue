<template>
  <v-app>
    <LogoBar></LogoBar>
    <v-alert width="20%" dismissible elevation="2" :type="alert.type" :color="alert.color"
             transition="slide-y-transition" style="position: absolute; right: 5%; top: 10%; z-index:20001;"
             v-model="alert.show">
      {{ alert.msg }}
    </v-alert>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<style>
::-webkit-scrollbar{
  width: 12px;
  background-color: #F5F5F5;
}
::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.9);
  background-color: rgba(75, 74, 74, .65);
}
::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: rgba(19, 7, 7, .5);
  background-image: -webkit-linear-gradient(90deg,transparent,rgba(0, 0, 0, .4) 50%,transparent,transparent)
}
</style>
<script>
import './variables.scss';
import { EventBus } from '@/main';
import LogoBar from "@/components/LogoBar.vue";
import ActorEditDialog from "@/components/ActorEditDialog.vue";
export default {
  name: 'App',
  components: {LogoBar},
  data: () => ({
    alert: {
      show: false,
      color: '',
      type: null,
      msg: ''
    }
  }),
  created() {
    EventBus.$on('alert', model => {
      this.showAlert(model);
    });
  },
  methods: {
    showAlert(model) {
      this.alert = {
        color: model.color,
        type: model.type,
        msg: model.msg,
        show: true
      }
      setTimeout(() => this.alert.show = false, 2200);
    }
  }
};
</script>
