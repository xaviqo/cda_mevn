<template>
  <v-container fluid class="pa-0">
    <PortfolioButtonsBar
        :actor-name=actor.name
        :tabs-array=tabsArray
    />
    <v-row>
      <v-col
          sm="12"
          md="12"
          lg="4"
          class="d-flex justify-center"
      >
        <PortfolioMainImg
            :main-img=mainImg
        />
      </v-col>
      <v-col>
        asdsd
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {defineComponent} from "vue";
import PortfolioButtonsBar from "@/components/portfolio/PortfolioButtonsBar.vue";
import {mixins} from "../../mixins";
import {EventBus} from "@/main";
import PortfolioMainImg from "@/components/portfolio/PortfolioMainImg.vue";

export default defineComponent({
  name: "ActorProfile",
  mixins: [mixins],
  components: {PortfolioMainImg, PortfolioButtonsBar},
  data: () => ({
    urlProfile: '',
    tabsArray: [],
    actor: {
      actorName: '',
      languages: [],
      background: {}
    },
    personalData: {},
    mainImg: {
      publicId: '',
      secureUrl: '',
      url: ''
    }
  }),
  methods: {
    retrieveFullProfile() {
      this.axios
          .get(`/full-profile/retrieve/${this.urlProfile}`)
          .then(res => {
            console.log(res)
            this.actor = res.data;
            this.prepareMainImg(this.actor);
            /*
            this.currentTab(this.$route.params.section);
            this.preparePersonalData(this.actor);
            */
          })
          .catch(e => {
            console.log(e)
            EventBus.$emit('alert', {
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
            this.$router.push(`/`);
          });
    },
    prepareMainImg(actor) {
      actor.photos.forEach(ph => {
        if (ph.main) {
          this.mainImg.publicId = ph.publicId;
          this.mainImg.secureUrl = this.addFaceDetection(ph.secureUrl);
          this.mainImg.url = this.addFaceDetection(ph.url);
        }
      });
    }
  },
  created() {
    this.urlProfile = this.$route.params.name;
    this.retrieveFullProfile();
  }
})
</script>
<style scoped>

</style>