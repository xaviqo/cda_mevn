<template>
  <v-row>
    <v-col
        v-for="p in photos"
        :key="p.publicId"
        class="d-flex child-flex"
        md="3"
        lg="2"
    >
      <v-img
          :src="addFaceDetection(p.secureUrl)"
          aspect-ratio="1"
          class="grey lighten-2"
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
    </v-col>
  </v-row>
</template>
<script>
import {mixins} from "@/mixins/mixins";
export default {
  name: "PortfolioPhotosPC",
  mixins: [mixins],
  data: () => ({

  }),
  props: {
    photos: {
      required: true
    },
  },
}
</script>
<style scoped>

</style>