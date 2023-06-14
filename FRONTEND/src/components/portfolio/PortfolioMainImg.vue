<template>
  <v-card
      class="pa-5"
      elevation="0"
  >
    <v-img
        :key=mainImg.publicId
        :src=mainImg.secureUrl
        aspect-ratio="1"
        class="grey lighten-2 align-end"
        width="350px"
        height="350px"
        style="border: 1px red solid !important;"
    >
      <template v-slot:placeholder>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
          <v-progress-circular
              indeterminate
              color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "PortfolioMainImg",
  props: {
    mainImg: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>