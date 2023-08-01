<template>
  <v-carousel
      :continuous=true
      :show-arrows=false
      hide-delimiter-background
      cycle
      interval="2500"
  >
    <v-carousel-item
        v-for="(sk, i) in skills"
        :key="i"
    >
      <v-sheet
          tile
          max-height="240"
          max-width="600"
      >
        <div class="d-flex fill-height justify-center align-center">
            <span
                class="text-h4"
                style="max-width: 550px;"
            >{{sk}}</span>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import {mixins} from "@/mixins/mixins";

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

</style>