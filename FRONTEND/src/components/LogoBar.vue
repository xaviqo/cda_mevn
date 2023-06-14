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
          :style="{ 'margin-top': titleMarginTop + 'px' }"
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
      <v-btn icon v-for="s in social" :key="s.logo" elevation="0" color="white" :class="isMobile ? 'mt-0' : 'mt-5' ">
        <v-icon >{{s.logo}}</v-icon>
      </v-btn>
    </v-col>
  </v-app-bar>
</template>

<script>
import {mixins} from "../../mixins";

export default {
  name: "NavBar",
  mixins: [mixins],
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize () {
      const windowWidth = this.getWindowWidth();

      this.isMobile = windowWidth < 600;

      this.titleMarginTop = windowWidth < 600 ? '1' : windowWidth < 1000 ? '25' : '15';

    }
  },
  data: () => ({
    isMobile: false,
    titleMarginTop: 0,
    social: [
      {
        logo: 'mdi-facebook',
        link: 'https://www.facebook.com/carruseldeactores',
      },
      {
        logo: 'mdi-twitter',
        link: 'https://twitter.com/carruselactores',
      },
      {
        logo: 'mdi-youtube',
        link: 'https://www.youtube.com/user/FiloQu',
      }
    ]
  })
}
</script>

<style scoped>
.logoCda{
  font-size: xx-large;
  letter-spacing: 2px;
}
</style>