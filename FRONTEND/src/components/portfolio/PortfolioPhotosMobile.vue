<template>
  <v-row>
    <v-tabs
        center-active
        show-arrows
        color="black"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
    >

      <template
          v-for="p in photos"
      >
        <v-tab
            :key="p.publicId"
            @click="selectedImage(p.secureUrl)"
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
        </v-tab>
      </template>
    </v-tabs>
  </v-row>
</template>
<script>
import {mixins} from "@/mixins/mixins";
import {EventBus} from "@/main";
export default {
  name: "PortfolioPhotosMobile",
  mixins: [mixins],
  data: () => ({
  }),
  methods: {
    selectedImage(secureUrl){
      EventBus.$emit(
          'photosMobile_actorProfile_changeMainImg'
          ,secureUrl
      );
    }
  },
  props: {
    photos: {
      required: true
    },
  },
}
</script>