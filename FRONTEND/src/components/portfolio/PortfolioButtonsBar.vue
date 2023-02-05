<template>
    <v-app-bar
        elevation="0"
        dense
    >
      <v-col
          cols="3"
      >
        <v-icon class="mr-2 mb-2">
          mdi-movie-open
        </v-icon>
        <span
            class="text-h1"
            style="font-size: x-large !important;"
        >
          Portfolio de {{ actorName }}
        </span>
      </v-col>
      <v-tabs
          v-model="tab"
          fixed-tabs
      >
        <v-tab
            @click=goTo(actorName)
        >
          Datos Personales
        </v-tab>
        <v-tab
            v-for="(item,i) in background"
            :key="i"
            v-if="item.active"
            @click=goTo(item.bgUrl)
            fixed-tabs
        >
          {{ item.bgName }}
        </v-tab>
        <v-tab
            v-if="photos.length > 0"
        >
          Fotografías
        </v-tab>
        <v-tab
            v-if="videos.length > 0"
        >
          Videos
        </v-tab>
      </v-tabs>
    </v-app-bar>
</template>

<script>
import {EventBus} from "@/main";

export default {
  name: "PortfolioButtonsBar",
  data: () => ({
    tab: null,
  }),
  mounted() {
    EventBus.$on('toButtonsBar_actorProfile', tabIndex => {
      setTimeout( () => {
        this.tab = (tabIndex)
        console.log(tabIndex);
      },1)
    });
  },
  props: {
    actorName: {
      required: true
    },
    background: {
      required: true
    },
    photos: {
      required: true
    },
    videos: {
      required: true
    }
  },
  methods:{
    goTo(section){
      if (section === this.actorName)
        this.$router.push(`/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}`);
      else
        this.$router.push(`/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}/${section}`);
    }
  }
}
</script>

<style scoped>

</style>