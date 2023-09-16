<template>
  <v-row class="px-1">
    <v-col
        v-for="a in actors"
        v-if="a.name !== actorName"
        class="d-flex justify-space-between"
        cols="2"
    >
      <v-img
          :key="a.url"
          :src="addFaceDetection(a.secureUrl)"
          aspect-ratio="1"
          class="grey lighten-2"
          height="4vh"
          width="3vw"
          @click="goToActor(a)"
          style="cursor: pointer"
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
  name: "PortfolioTabsAllActors",
  mixins: [mixins],
  data: () => ({
    actors: []
  }),
  created() {
    this.getGallery();
  },
  props: {
    actorName: {
      required: true
    }
  },
  methods: {
    getGallery(){
      this.axios
          .get(`/gallery`)
          .then( res => {
            res.data.forEach( a => {
              if (a.active) {
                this.actors.push({
                  name: a.name,
                  url : this.addFaceDetection(a.photo.url),
                  secureUrl: this.addFaceDetection(a.photo.secureUrl)
                });
              }
            });
          })
          .catch( e => console.log(e) );
    },
    goToActor(actor){
      if (actor) {
        window.location.href = window.location.origin + `/portfolio/${actor.name.replace(/\s/g, '-').toLowerCase()}`
      }
    }
  }
}
</script>
<style scoped>
.all-actors-div{
  display: flex;
  justify-content: center;
}
</style>