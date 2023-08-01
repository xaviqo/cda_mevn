<template>
  <div>
    <v-row class="px-6">
      <v-col cols="10">
        <v-text-field
            v-if=upYoutube
            prepend-icon="mdi-youtube"
            label="Enlace de YouTube"
            v-model="ytUrl"
        ></v-text-field>
        <v-file-input
            v-else
            prepend-icon="mdi-file-video-outline"
            :loading="uploading"
            label="Subir a Carrusel de Actores"
            v-model="cdaFile"
        ></v-file-input>
      </v-col>
      <v-col>
        <v-tooltip
            bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <div
                v-bind="attrs"
                v-on="on"
            >
              <v-switch
                  class="ml-4"
                  color="grey darken-3"
                  v-model="upYoutube"
              ></v-switch>
            </div>
          </template>
          <span>{{ upYoutube?'Usar Youtube':'Subir a CDA' }}</span>
        </v-tooltip>
      </v-col>
      <v-col
          class="d-flex justify-center align-center"
      >
        <v-btn
            icon
            outlined
            @click=newVideo()
        >
          <v-icon>
            {{ upYoutube?'mdi-content-save':'mdi-upload'}}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="pa-2">
      <v-col
          v-for="(vid, i) in vids"
          class="d-flex justify-center"
          :key="i"
      >
          <div>
            <youtube
                v-if=isYt(vid)
                :video-id=vid
                player-width="320"
                player-height="180"
            />
              <v-btn
                  block
                  elevation="0"
                  small
                  color="deep-orange lighten-1"
                  class="mt-n1"
                  @click=deleteVideo(vid)
              >
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
                Eliminar
              </v-btn>
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {getIdFromURL} from "vue-youtube-embed";
import {EventBus} from "@/main";

export default {
  name: "VideoUploadEdition",
  data: () => ({
    ytUrl: '',
    cdaFile: null,
    uploading: false,
    upYoutube: true,
    vids: [],
  }),
  created() {
    this.retrieveVideos();
  },
  methods: {
    newVideo(){
      if (this.upYoutube) this.addYoutubeVideo(this.ytUrl);
      else this.addCdaVideo();
    },
    addYoutubeVideo(ytUrl){
      this.ytUrl = "";
      const ytId = getIdFromURL(ytUrl);
      if (!ytId || !ytUrl.toLowerCase().includes('youtube')){
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'Video de YouTube no válido'
        });
        return;
      }

      if (this.vids.includes(ytId)){
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'El video ya ha sido añadido anteriormente'
        });
        return;
      }

      this.vids.push(ytId);

      EventBus.$emit('toActorEditionForm_save',{
          videos: this.vids
      });
    },
    deleteVideo(id){
      const index = this.vids.indexOf(id);
      if (this.isYt(id) && index > -1){
        this.vids.splice(index,1);
        EventBus.$emit('toActorEditionForm_save',{
          videos: this.vids
        });
      }
    },
    addCdaVideo(){

    },
    retrieveVideos(){
      this.axios
          .get(`/videos/retrieve/${this.actorId}`)
          .then( res => {
            this.vids = res.data.videos;
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    },
    isYt(obj){
      return (typeof obj === 'string');
    }
  },
  props: {
    actorId: {
      type: String,
      required: true
    }
  },
  watch: {
    actorId: {
      handler: function () {
        this.retrieveVideos();
      }
    }
  },
}
</script>

<style scoped>

</style>