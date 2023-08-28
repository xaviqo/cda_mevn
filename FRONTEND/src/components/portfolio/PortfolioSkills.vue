<template>
  <v-carousel
      :continuous=true
      :show-arrows=false
      hide-delimiter-background
      cycle
      interval="2500"
      height="auto"
  >
    <v-carousel-item
        v-for="(sk, i) in skills"
        :key="i"
    >
      <v-col class="d-flex align-center justify-center">
        <v-sheet
            tile
            height="25%"
            width="50%"
            class="transparent-sheet mb-10"
        >
          <div class="d-flex fill-height justify-center align-center">
            <span
                class="text-h4"
                style="max-width: 550px;"
            >{{sk}}</span>
          </div>
        </v-sheet>
      </v-col>
    </v-carousel-item>
  </v-carousel>
</template>
<script>

export default {
  name: "PortfolioSkills",
  props: {
    skills: {
      required: true
    },
  },
}
</script>

<style scoped>
.transparent-sheet {
  background-color: rgba(255, 255, 255, .35); /* Color de fondo semitransparente */
  border-radius: 15px !important; /* Bordes redondeados */
}
</style>