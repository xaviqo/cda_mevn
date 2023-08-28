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
/* Estilos para la scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

/* Fondo de la scrollbar */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* Barra desplazadora */
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid #f5f5f5;
}

/* Color de la barra desplazadora al pasar el ratón */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* Esquina inferior derecha de la scrollbar */
::-webkit-scrollbar-corner {
  background-color: #f5f5f5;
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
