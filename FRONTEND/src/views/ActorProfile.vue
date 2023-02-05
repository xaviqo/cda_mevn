<template>
  <div>
    <PortfolioButtonsBar
        :background=actor.background
        :actor-name=actor.name
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
    actor: null,
    tab: null
  }),
  created() {
    this.urlProfile = this.$route.params.name;
    //this.$route.params.section;
    console.log(this.$route.params.section);
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
  }
}
</script>

<style scoped>

</style>