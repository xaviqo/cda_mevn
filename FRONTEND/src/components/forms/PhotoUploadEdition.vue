<template>
  <div>
    <v-row class="px-6">
      <v-col cols="5">
        <v-text-field
            prepend-icon="mdi-format-text"
            label="Título de archivo"
            :rules=titleRule
            v-model=newMultimedia.name
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-file-input
            label="Archivo"
            :loading="uploading"
            accept="image/png, image/jpeg, image/bmp"
            v-model=newMultimedia.file
        ></v-file-input>
      </v-col>
      <v-col
          class="d-flex justify-center align-center"
      >
        <v-btn
            icon
            outlined
            @click=addFile(newMultimedia.file)
        >
          <v-icon>
            mdi-upload
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="px-6">
      <v-col
          v-for="img in photos"
          class="d-flex justify-center"
          :key=img.publicId
      >
        <v-card
            outlined
            class="pa-1"
            width="200px"
        >
          <v-img
              :src=img.secureUrl
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
            <v-card-actions
                class="d-flex justify-center align-center"
            >
              <v-btn
                  x-small
                  tile
                  color="teal lighten-3"
                  :disabled=img.main
                  @click=changeMainImage(img.publicId)
              >
                <v-icon>
                  mdi-check
                </v-icon>
              </v-btn>
              <v-btn
                  x-small
                  tile
                  color="deep-orange lighten-3"
                  :disabled=img.main
                  @click=deleteImage(img.publicId)
              >
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-img>
          <v-card-subtitle>
              <span
                  class="d-inline-block text-truncate"
                  style="max-width: 150px;"
              >
                {{ img.title }}
              </span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {EventBus} from "@/main";
import {mixins} from "../../../mixins";
export default {
  name: "PhotoUploadEdition",
  mixins: [mixins],
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
  data: () => ({
    titleRule: [
      (v) => new RegExp(/^[a-zA-Z0-9\s]*$/).test(v) || 'El título solo puede contener: Letras, números y espacios'
    ],
    photos: [],
    newMultimedia: null,
    uploading: false,
  }),
  created() {
    this.initMultimedia();
    this.retrieveImages();
  },
  methods: {
    addFile(file){

      if (file == null ||this.newMultimedia.name.length < 1){
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'Debes especificar un archivo y un título'
        });
        return;
      }

      if (!new RegExp(/^[a-zA-Z0-9\s]*$/).test(this.newMultimedia.name)){
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'El título del archivo solo puede contener: Letras, números y espacios'
        });
        return;
      }

      this.uploading = true;
      const fileToUpload = new FormData();
      fileToUpload.append('cda_file',file);
      this.newMultimedia.file = fileToUpload;
      this.axios
          .post(`/upload/photos/${this.actorId}/${this.newMultimedia.name}`,
              this.newMultimedia.file
          )
          .then( res => {
            EventBus.$emit('alert',{
              color: 'green',
              type: 'success',
              msg: res.data.message
            });
            if (res.data.firstImage) EventBus.$emit('toActorGallery_reloadGallery');
          })
          .catch( e => {
            if (e.response.status === 500){
              EventBus.$emit('alert',{
                color: 'red',
                type: 'error',
                msg: e.response.data.message
              });
            } else {
              console.log(e);
              EventBus.$emit('alert',{
                color: 'red',
                type: 'error',
                msg: 'Ha ocurrido un error al subir el archivo'
              });
            }
          })
          .finally( () => {
            this.uploading = false;
            this.initMultimedia();
            this.retrieveImages();
          });
    },
    retrieveImages(){
      this.axios
          .get(`/images/retrieve/${this.actorId}`)
          .then( res => {
            this.photos = res.data.photos;
            console.log(this.photos)
            this.photos.forEach( p => {
              console.log("hey")
              p.url = this.addFaceDetection(p.url);
              p.secureUrl = this.addFaceDetection(p.secureUrl);
            })
          })
          .catch( e => {
            console.log(e)
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    },
    changeMainImage(publicId){
      this.axios
          .post(`/images/main/${this.actorId}/${publicId}`)
          .then( res => {
            if (res.status === 200){
              EventBus.$emit('alert',{
                color: 'green',
                type: 'success',
                msg: res.data.message
              });
            }
            this.retrieveImages();
            EventBus.$emit('toActorGallery_reloadGallery');
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    },
    deleteImage(publicId){
      this.axios
          .delete(`/images/delete/${this.actorId}/${publicId}`)
          .then( res => {
            if (res.status === 200){
              EventBus.$emit('alert',{
                color: 'green',
                type: 'success',
                msg: res.data.message
              });
            }
            this.retrieveImages();
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    },
    initMultimedia(){
      this.newMultimedia = {
        source: '',
        name: '',
        file: null
      };
    }
  }
}
</script>

<style scoped>

</style>