<template>
  <v-app-bar
      app
      elevation="0"
      dark
      :prominent="!isMobile"
  >
    <v-col cols="4">
      <div
          id="cda-title"
          class="text-capitalize font-weight-light text-no-wrap"
          style="width: 100%"
          :style="{ 'margin-top': titleMarginTop + 'px', 'cursor':'pointer' }"
          @click="goMain()"
      >
        <span v-if="getWindowWidth() > 400">
        CARRUSEL DE ACTORES
        </span>
        <span v-else class="text-body-2">
        CARRUSEL DE ACTORES
        </span>
      </div>
    </v-col>
    <v-col cols="8" class="d-flex justify-end">
      <v-btn @click="openURLInNewTab(s.value)" icon v-for="s in rrss" :key="s.name" elevation="0" color="white" :class="isMobile ? 'mt-0' : 'mt-5' ">
        <v-icon >{{s.icon}}</v-icon>
      </v-btn>
    </v-col>
  </v-app-bar>
</template>

<script>
import {mixins} from "@/mixins/mixins";
import {EventBus} from "@/main";

export default {
  name: "NavBar",
  mixins: [mixins],
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted () {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  created() {
    this.getRRSS();
  },
  methods: {
    goMain() {
      this.$router.push({ name: 'home' });
    },
    onResize () {
      const windowWidth = this.getWindowWidth();

      this.isMobile = windowWidth < 600;

      this.titleMarginTop = windowWidth < 600 ? '1' : windowWidth < 1000 ? '25' : '15';

    },
    openURLInNewTab(url){
      window.open(url, '_blank');
    },
    getRRSS(){
      this.axios
          .get(`/cda/rrss`)
          .then(res => {
            this.rrss.twitter.value = res.data.twitter;
            this.rrss.youtube.value = res.data.youtube;
            this.rrss.facebook.value = res.data.facebook;
          })
          .catch(e => {
            console.log(e)
            EventBus.$emit('alert', {
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    }
  },
  data: () => ({
    isMobile: false,
    titleMarginTop: 0,
    rrss: {
      twitter: { name: 'Twitter', icon: 'mdi-twitter', value: '' },
      facebook: { name: 'Facebook', icon: 'mdi-facebook', value: '' },
      youtube: { name: 'Youtube', icon: 'mdi-youtube', value: '' }
    }
  })
}
</script>

<style scoped>
.logoCda{
  font-size: xx-large;
  letter-spacing: 2px;
}
</style>