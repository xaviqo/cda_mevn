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
          background-color="transparent"
          color="basil"
          fixed-tabs
      >
        <v-tab
            @click=goTo(actorName)
        >
          Datos Personales
        </v-tab>
        <v-tab
            v-model="selectedTab"
            v-for="item in background"
            :key="item.bgUrl"
            v-if="item.active"
            @click=goTo(item.bgUrl)
        >
          {{ item.bgName }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
</template>

<script>
export default {
  name: "PortfolioButtonsBar",
  data: () => ({
    tab: ''
  }),
  created() {
    //this.tab = this.selectedTab;
  },
  props: {
    actorName: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    selectedTab: {
      type: String
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