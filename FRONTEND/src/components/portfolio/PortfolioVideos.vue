<template>
  <v-row class="pa-5">
    <template
        v-if="videos"
        v-for="(vid, i) in videos"
    >
      <v-col
          sm="12"
          md="4"
          lg="3"
      >
        <div
            v-if="typeof vid === 'string'"
            :key="i+'_cdavid'"
        >
          <youtube
              :video-id=vid
              player-width="320"
              player-height="210"
          />
        </div>
        <div
            v-else
            :key="i+'_cdavid'"
        >
          <video
              width="320"
              height="240"
              controls
              class="mt-n8"
          >
            <source :src="getCdaVideo(vid.file)" type="video/mp4">
            Tu navegador no soporta este video
          </video>
        </div>
      </v-col>
    </template>
  </v-row>
</template>
<script>
export default {
  name: "PortfolioVideos",
  data: () => ({

  }),
  props: {
    videos: {
      required: false
    }
  },
  methods: {
    getCdaVideo(fileName){
      return `${this.axios.defaults.baseURL}/video/retrieve/${fileName}`;
    },
  }
}
</script>
<style scoped>

</style>