<template>
    <div>
        <PortfolioButtonsBar
                :actor-name=actor.name
                :tabs-array=tabsArray
        />
       <v-row>
           <v-col
               class="pa-6"
               cols="3"
           >
               <v-row>
                   <v-col
                   >
                       <PortfolioMainImg
                           :main-img=mainImg
                       />
                   </v-col>
               </v-row>
               <v-row>
                   <v-col>
                       <!--IDIOMAS-->
                       <PortfolioLanguages
                           :langs=actor.languages
                       />
                   </v-col>
               </v-row>
           </v-col>
           <v-col
               class="pa-6"
               cols="6"
           >
               <v-row>
                   <v-col
                       class="d-flex justify-start"
                   >
                       <PortfolioPersonalData
                           :personal-data=personalData
                       />
                   </v-col>
               </v-row>
               <v-row>
                   <v-col>
                       <!--SKILLS-->
                       <PortfolioSkills
                           :skills="actor.skills"
                       />
                   </v-col>
               </v-row>
           </v-col>
       </v-row>
    </div>
</template>

<script>
import {EventBus} from "@/main";
import BackgroundTabs from "@/constants/BackgroundTabs";
import PortfolioButtonsBar from "@/components/portfolio/PortfolioButtonsBar.vue";
import PortfolioPersonalData from "@/components/portfolio/PortfolioPersonalData.vue";
import PortfolioMainImg from "@/components/portfolio/PortfolioMainImg.vue";
import {mixins} from "@/mixins/mixins";
import PortfolioSkills from "@/components/portfolio/PortfolioSkills.vue";
import PortfolioLanguages from "@/components/portfolio/PortfolioLanguages.vue";

export default {
    name: "ActorProfile",
    mixins: [mixins],
    components: {PortfolioLanguages, PortfolioSkills, PortfolioMainImg, PortfolioPersonalData, PortfolioButtonsBar},
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
    created() {
        this.urlProfile = this.$route.params.name;
        this.retrieveFullProfile();
    },
    methods: {
        retrieveFullProfile() {
            this.axios
                .get(`/full-profile/retrieve/${this.urlProfile}`)
                .then(res => {
                    this.actor = res.data;
                    this.currentTab(this.$route.params.section);
                    this.preparePersonalData(this.actor);
                    this.prepareMainImg(this.actor);
                })
                .catch(e => {
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
        prepareMainImg(actor) {
            actor.photos.forEach(ph => {
                if (ph.main) {
                    this.mainImg.publicId = ph.publicId;
                    this.mainImg.secureUrl = this.addFaceDetection(ph.secureUrl);
                    this.mainImg.url = this.addFaceDetection(ph.url);
                }
            });
        },
        currentTab(urlSection) {
            for (const bg of Object.keys(this.actor.background)) {
                if (this.actor.background[bg].active) {
                    this.tabsArray.push({
                        bgName: BackgroundTabs[bg],
                        bgUrl: BackgroundTabs[bg].replace(/\s/g, '-').toLowerCase()
                    })
                }
            }
            if (this.actor.photos.length > 0) {
                this.tabsArray.push({
                    bgName: 'Fotografías',
                    bgUrl: 'fotografias'
                })
            }
            if (this.actor.videos.length > 0) {
                this.tabsArray.push({
                    bgName: 'Videos',
                    bgUrl: 'videos'
                })
            }
            if (urlSection !== undefined) {
                const tabIndex = this.tabsArray.findIndex(tab => tab.bgUrl == urlSection);
                EventBus.$emit('toButtonsBar_actorProfile', parseInt(tabIndex + 1));
            }
        }
    }
}
</script>

<style scoped>

</style>