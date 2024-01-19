<template>
  <v-row>
    <div>
    </div>
    <v-col
        v-for="(p,i) in photos"
        :key="p.publicId"
        class="d-flex child-flex"
        md="3"
        lg="2"
    >
      <v-img
          style="cursor: pointer"
          :src="addFaceDetection(p.secureUrl)"
          aspect-ratio="1"
          class="grey lighten-2"
          @click="index = i"
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
    <vue-gallery-slideshow
        :images="photos"
        :index="index"
        @close="index = null"
    />
  </v-row>
</template>
<script>
import VueGallerySlideshow from 'vue-gallery-slideshow';
import {mixins} from "@/mixins/mixins";
export default {
  name: "PortfolioPhotosPC",
  components: { VueGallerySlideshow },
  mixins: [mixins],
  data: () => ({
    index: null
  }),
  props: {
    photos: {
      required: true
    },
  },
}
</script>
<style>
.vgs__container{
  margin-top: 150px !important;
}
</style>