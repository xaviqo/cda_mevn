<template>
  <v-app-bar
      elevation="0"
      dense
  >
    <v-col
        cols="3"
        v-if="this.windowWith > 700"
    >
      <v-icon class="mr-2 mb-2">
        mdi-movie-open
      </v-icon>
      <span
          class="text-h1"
          style="font-size: x-large !important;"
      >
        {{ actorName }}
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
          @click="() => goTo(item.bgUrl)"
          fixed-tabs
      >
        {{ item.bgName }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
import {EventBus} from "@/main";
import {mixins} from "@/mixins/mixins";

export default {
  name: "PortfolioButtonsBar",
  mixins: [mixins],
  data: () => ({
    tab: null,
    windowWith: 0
  }),
  mounted() {
    EventBus.$on('toButtonsBar_actorProfile', tabIndex => {
      this.tab = (tabIndex)
    });
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  props: {
    actorName: {
      required: true
    },
    tabsArray: {
      required: true
    },
    hasVideos: {
      required: true
    }
  },
  methods:{
    onResize () {
      this.windowWith = this.getWindowWidth();
      this.isMobile = this.windowWith < 600;
    },
    goTo(section){
      let newPath = '';
      // if (section === null) {
      //   section = 'videos';
      //   newPath = `/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}/videos`;
      // } else
      if (section === this.actorName) {
        newPath = `/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}`;
      } else {
        newPath = `/portfolio/${this.actorName.replace(/\s/g, '-').toLowerCase()}/${section}`;
      }

      if (this.$route.path !== newPath) this.$router.push(newPath);

      EventBus.$emit('changeSection_actorProfile', section);
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true });
  }
}
</script>

<style scoped>

</style>