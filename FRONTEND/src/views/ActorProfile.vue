<template>
  <v-container fluid class="pa-0">
    <PortfolioButtonsBar
        :actor-name="personalData.name"
        :tabs-array="tabsArray"
        :has-videos="actor.videos?.length > 0"
    />
    <v-row fill-height>
      <v-col
          v-if="(windowWith >= 960 || (urlSection === null || urlSection === actor.name))"
          sm="12"
          md="4"
          lg="3"
      >
        <v-row>
          <v-col
              cols="12"
              class="d-flex justify-center"
          >
            <PortfolioMainImg
                :skills="actor.skills"
                :main-img-prop="mainImg"
            />
          </v-col>
          <v-col v-if="windowWith < 960 && (urlSection === actor.name || !urlSection)" class="mt-n10">
            <PortfolioPhotosMobile
                class="pa-4"
                :photos=photos
            />
          </v-col>
          <v-col
              cols="12"
              align="center"
          >
            <v-btn
                v-
                v-for="sm in actor.media"
                :key="sm.icon"
                class="mx-6 mt-n9 mb-3 pa-1"
                icon
                small
                elevation="1"
                color="black"
                @click="openURLInNewTab(sm.url)"
            >
                <v-icon dark>
                  {{ sm.icon }}
                </v-icon>
            </v-btn>
          </v-col>
          <v-col
              cols="12"
          >
            <PortfolioLanguages
                class="mt-n10"
                :langs=actor.languages
            />
          </v-col>
         <v-col
              cols="12"
          >
            <PortfolioTabsAllActors
                :actor-name="actor.name"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="windowWith > 960 && (urlSection === actor.name || !urlSection)">
        <PortfolioPersonalData
            :personal-data="personalData"
        />
        <PortfolioPhotosPC
            class="px-4"
            :photos=photos
        />
      </v-col>
      <v-col v-if="urlSection === BackgroundTabs['formation'].replace(/\s/g, '-').toLowerCase()">
        <PortfolioFormation :formation="actor.background.formation"/>
      </v-col>
      <v-col v-if="urlSection === BackgroundTabs['awards'].replace(/\s/g, '-').toLowerCase()">
        <PortfolioAwards :awards="actor.background.awards"></PortfolioAwards>
      </v-col>
      <v-col v-if="urlSection === BackgroundTabs['experience'].replace(/\s/g, '-').toLowerCase()">
        <PortfolioXp :experience="actor.background.experience"></PortfolioXp>
      </v-col>
      <v-col v-if="urlSection === 'videos'">
        <PortfolioVideos :videos="actor.videos" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {defineComponent} from "vue";
import PortfolioButtonsBar from "@/components/portfolio/PortfolioButtonsBar.vue";
import {mixins} from "@/mixins/mixins";
import {EventBus} from "@/main";
import PortfolioMainImg from "@/components/portfolio/PortfolioMainImg.vue";
import PortfolioLanguages from "@/components/portfolio/PortfolioLanguages.vue";
import PortfolioPhotosPC from "@/components/portfolio/PortfolioPhotosPC.vue";
import PortfolioPhotosMobile from "@/components/portfolio/PortfolioPhotosMobile.vue";
import PortfolioSkills from "@/components/portfolio/PortfolioSkills.vue";
import BackgroundTabs from "@/constants/BackgroundTabs";
import PortfolioFormation from "@/components/portfolio/PortfolioFormation.vue";
import PortfolioXp from "@/components/portfolio/PortfolioXp.vue";
import PortfolioAwards from "@/components/portfolio/PortfolioAwards.vue";
import PortfolioPersonalData from "@/components/portfolio/PortfolioPersonalData.vue";
import PortfolioTabsAllActors from "@/components/portfolio/PortfolioTabsAllActors.vue";
import PortfolioVideos from "@/components/portfolio/PortfolioVideos.vue";

export default defineComponent({
  name: "ActorProfile",
  computed: {
    BackgroundTabs() {
      return BackgroundTabs
    }
  },
  mixins: [mixins],
  components: {
    PortfolioVideos,
    PortfolioTabsAllActors,
    PortfolioPersonalData,
    PortfolioAwards,
    PortfolioXp,
    PortfolioFormation,
    PortfolioSkills,
    PortfolioPhotosMobile,
    PortfolioPhotosPC,
    PortfolioLanguages,
    PortfolioMainImg,
    PortfolioButtonsBar
  },
  data: () => ({
    urlProfile: '',
    urlSection: null,
    tabsArray: [],
    actor: {
      name: '',
      languages: [],
      background: {}
    },
    personalData: {},
    mainImg: {
      publicId: '',
      secureUrl: '',
      url: ''
    },
    photos: [],
    windowWith: 0
  }),
  methods: {
    retrieveFullProfile() {
      this.axios
          .get(`/full-profile/retrieve/${this.urlProfile}`)
          .then(res => {
            this.actor = res.data;
            this.preparePersonalData(this.actor);
            this.prepareMainImg(this.actor);
            this.setCurrentTab(this.$route.params.section)
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
    preparePersonalData(actor) {
      this.personalData = {
        name: actor.name,
        age: actor.age,
        eyes: actor.eyes,
        hair: actor.hair,
        height: actor.height,
        languages: actor.languages
      }
    },
    setCurrentTab(urlSection) {
      if (this.actor.videos.length > 0) {
        this.tabsArray.push({
          bgName: 'Videos',
          bgUrl: 'videos'
        });
      }
      for (const bg of Object.keys(this.actor.background)) {
        if (this.actor.background[bg].active) {
          this.tabsArray.push({
            bgName: BackgroundTabs[bg],
            bgUrl: BackgroundTabs[bg].replace(/\s/g, '-').toLowerCase()
          });
        }
      }
      if (urlSection !== undefined) {
        this.urlSection = urlSection;
        const tabIndex = this.tabsArray.findIndex(tab => tab.bgUrl == urlSection);
        EventBus.$emit('toButtonsBar_actorProfile', parseInt(tabIndex + 1));
      }
    },
    prepareMainImg(actor) {
      actor.photos.forEach(ph => {
        if (!ph.main) {
          this.photos.push(ph);
        } else {
          EventBus.$emit(
              'photosMobile_actorProfile_changeMainImg'
              ,ph.secureUrl
          );
        }
      });
    },
    onResize() {
      this.windowWith = this.getWindowWidth();
      this.isMobile = this.windowWith < 600;
    },
    openURLInNewTab(url){
      window.open(url, '_blank');
    }
  },
  created() {
    this.urlProfile = this.$route.params.name;
    EventBus.$on(
        'photosMobile_actorProfile_changeMainImg',
        (secureUrl) => {
          this.mainImg = this.addFaceDetection(secureUrl);
        }
    );
    EventBus.$on('changeSection_actorProfile', section => {
      this.urlSection = section;
    });
  },
  mounted() {
    this.retrieveFullProfile();
    EventBus.$on('toButtonsBar_actorProfile', tabIndex => {
      this.tab = (tabIndex)
    });
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  watch: {
    mainImg: function (newImg) {
      this.mainImg = newImg
    }
  }
})
</script>
<style scoped>

</style>