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
          color="grey darken-2"
      >
        <v-tab
            @click=goTo(actorName)
        >
          Datos Personales
        </v-tab>
        <v-tab
            v-for="(item,i) in tabsArray"
            :key="i"
            @click=goTo(item.bgUrl)
            fixed-tabs
        >
          {{ item.bgName }}
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
        this.tab = (tabIndex)
    });
  },
  props: {
    actorName: {
      required: true
    },
    tabsArray: {
      required: true
    }
  },
  methods:{
    goTo(section){
      let newPath = '';
      if (section === this.actorName)
        newPath = `/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}`;
      else
        newPath = `/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}/${section}`;

      if (this.$route.path !== newPath) this.$router.push(newPath);
    }
  }
}
</script>

<style scoped>

</style>