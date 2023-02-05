<template>
  <div>
    <PortfolioButtonsBar
        :background=actor.background
        :actor-name=actor.name
        :photos=actor.photos
        :videos=actor.videos
    />
  </div>
</template>

<script>
import {EventBus} from "@/main";
import BackgroundTabs from "@/constants/BackgroundTabs";
import PortfolioButtonsBar from "@/components/portfolio/PortfolioButtonsBar.vue";
export default {
  name: "ActorProfile",
  components: {PortfolioButtonsBar},
  data: () => ({
    urlProfile: '',
    tabsArray: [],
    actor: {
      actorName: '',
      background: {}
    },
    tab: null
  }),
  created() {
    this.urlProfile = this.$route.params.name;
    this.retrieveFullProfile();
  },
  methods: {
    retrieveFullProfile(){
      this.axios
          .get(`/full-profile/retrieve/${this.urlProfile}`)
          .then( res => {
            this.actor = res.data;
            for (const bg of Object.keys(this.actor.background)) {
              this.actor.background[bg]['bgName'] = BackgroundTabs[bg];
              this.actor.background[bg]['bgUrl'] = BackgroundTabs[bg].replace(/\s/g, '-').toLowerCase();
            }
            this.currentTab(this.$route.params.section);
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
            this.$router.push(`/`);
          });
    },
    currentTab(urlSection){
      console.log("url section "+urlSection)
      for (const [key, bg] of Object.entries(this.actor.background)) {
        if (bg.active) this.tabsArray.push(bg.bgUrl);
      }
      if (this.actor.photos.length > 0) this.tabsArray.push('fotografias');
      if (this.actor.videos.length > 0) this.tabsArray.push('videos');
      if (urlSection !== undefined){
        const tabIndex = this.tabsArray.indexOf(urlSection.toLowerCase());
        EventBus.$emit('toButtonsBar_actorProfile',parseInt(tabIndex+1));
      }
    }
  }
}
</script>

<style scoped>

</style>