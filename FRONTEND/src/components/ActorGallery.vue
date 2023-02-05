<template>
  <v-row class="pa-8">
    <template
        v-if="actors.length > 0"
        v-for="a in actors"
    >
      <v-col
          v-if="showCard(a)"
          :key="a._id"
          class="d-flex justify-center child-flex"
      >
        <v-card
            outlined
            class="pa-1"
            max-width="315px"
            @click=profileIfNotAdmin(a.name)
        >
            <v-img
                :key=a.photo.publicId
                :src=a.photo.secureUrl
                aspect-ratio="1"
                class="grey lighten-2 actorImg align-end"
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
              <div class="showName text-center">
                {{ a.name }}
              </div>
              <div v-if="admin">
                <ActorAdminActions :actor-id=a._id :actor-name=a.name :actor-active=a.active>
                </ActorAdminActions>
              </div>
            </v-img>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import ActorAdminActions from "@/components/ActorAdminActions.vue";
import {EventBus} from "@/main";
import {mixins} from "../../mixins";

export default {
  name: "ActorGallery",
  mixins: [mixins],
  components: {ActorAdminActions},
  props: {
    admin: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    actors: []
  }),
  created() {
    this.getGallery();
    EventBus.$on('toActorGallery_reloadGallery', this.getGallery);
  },
  methods: {
    getGallery(){
      this.axios
          .get(`/gallery`)
          .then( res => {
            this.actors = res.data;
            this.actors.forEach( a => {
              a.photo.url = this.addFaceDetection(a.photo.url);
              a.photo.secureUrl = this.addFaceDetection(a.photo.secureUrl);
            });
          })
          .catch( e => console.log(e) );
    },
    showCard(actor){
      if (!this.admin){
        return actor.active;
      }
      return true;
    },
    profileIfNotAdmin(actorName){
      if (!this.admin) this.$router.push(`/portfolio/${actorName.replace(/\s/g, '-').toLowerCase()}`);
    }
  }
}
</script>

<style scoped>
.actorImg {
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
}

.actorImg:hover {
  opacity: 0.95;
}
.showName{
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  height: 42px;
  transition: opacity 0.4s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}
.actorImg:hover .showName {
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0.8;
}
</style>