<template>
  <v-img
      :src=mainImg
      aspect-ratio="1"
      class="grey lighten-2 align-end ma-4"
      width="450px"
      height="450px"
      style="border-radius: 5px"
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
    <PortfolioSkills
        :skills="skills"
    />
  </v-img>
</template>

<script>
import {EventBus} from "@/main";
import {mixins} from "@/mixins/mixins";
import PortfolioSkills from "@/components/portfolio/PortfolioSkills.vue";

export default {
  name: "PortfolioMainImg",
  components: {PortfolioSkills},
  mixins: [mixins],
  data: () => ({
    mainImg: null
  }),
  props: {
    skills: {
      required: true
    }
  },
  created() {
    EventBus.$on(
        'photosMobile_actorProfile_changeMainImg',
        (secureUrl) => {
          this.mainImg = this.addFaceDetection(secureUrl);
        }
    );
  }
}
</script>

<style scoped>

</style>