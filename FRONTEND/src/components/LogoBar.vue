<template>
    <v-app-bar
        app
        elevation="0"
        dark
        prominent
    >
      <v-col cols="4"></v-col>
      <v-col cols="4" class="d-flex align-center justify-center">
        <v-app-bar-title>
          <div class="text-capitalize font-weight-light logoCda mt-2">
            CARRUSEL DE ACTORES
          </div>
        </v-app-bar-title>
      </v-col>
      <v-col cols="4" class="d-flex justify-end mt-4">
        <v-btn icon v-for="s in social" :key="s.logo" elevation="0" color="white">
          <v-icon>{{s.logo}}</v-icon>
        </v-btn>
      </v-col>
    </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
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
  font-size: 2em;
  letter-spacing: 2px;
}
</style>