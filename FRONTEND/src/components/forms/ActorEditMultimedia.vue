<template>
  <v-row>
    <v-col>
      <v-list>
        <v-tabs
            grow
            hide-slider
            class="mt-1"
        >
          <v-tab
              v-for="(md, i) in multimedia"
              :key=i
              class="mb-2"
              @click=changeActiveTab(i)
          >
            <v-subheader
                class="mt-2"
            >
              <v-icon
                  class="mr-4"
              >
                {{ md.icon }}
              </v-icon>
              {{ md.name }}
            </v-subheader>
          </v-tab>
        </v-tabs>
      </v-list>
      <v-list>
        <PhotoUploadEdition
            v-if="activeTab === 'photos'"
            :actor-id="actorId"
        />
        <VideoUploadEdition
            v-if="activeTab === 'videos'"
            :actor-id="actorId"
        />
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import PhotoUploadEdition from "@/components/forms/PhotoUploadEdition.vue";
import VideoUploadEdition from "@/components/forms/VideoUploadEdition.vue";
import {EventBus} from "@/main";
export default {
  name: "ActorEditMultimedia",
  components: {VideoUploadEdition, PhotoUploadEdition},
  data: () => ({
    activeTab: null,
    multimedia: {
      photos: {
        name: 'Imágenes',
        icon: 'mdi-camera',
      },
      videos: {
        name: 'Videos',
        icon: 'mdi-filmstrip',
      }
    },
    sources: [
      {
        name: 'Youtube',
        icon: 'mdi-youtube'
      },
      {
        name: 'CDA',
        icon: 'mdi-filmstrip'
      }
    ]
  }),
  created() {
    this.activeTab = 'photos';
  },
  methods: {
    changeActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  props: {
    actorId: {
      type: String,
      required: true
    },
  },
  watch: {
    actorId: {
      handler: function () {
        this.retrieveImages();
      }
    }
  },
}
</script>

<style scoped>
.v-tab {
  border-left: 1px solid rgba(0, 0, 0, .1);
  border-right: 1px solid rgba(0, 0, 0, .1);
}
.v-tab--active {
  text-shadow: 0 0 1px rgba(0, 0, 0, .4);
}
</style>