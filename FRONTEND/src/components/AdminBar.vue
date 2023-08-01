<template>
  <v-app-bar
      elevation="0"
  >
    <v-spacer></v-spacer>
      <v-col
          cols=4
          class="d-flex justify-center align-center"
      >
        <v-btn
            tile
            outlined
            v-if=!newActorInput
            @click="newActorInput = true"
        >
          Añadir Actor
        </v-btn>
        <div
            v-if=newActorInput
            class="d-flex justify-center align-center"
        >
          <v-btn
              icon
              small
              tile
              outlined
              class="mr-2"
              @click="newActorInput = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-text-field
              label="Nombre"
              hide-details="auto"
              v-model=actorName
          ></v-text-field>
          <v-btn
              icon
              small
              tile
              outlined
              class="ml-2"
              @click=createNewActor
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import {EventBus} from "@/main";

export default {
  name: "AdminBar",
  data: () => ({
    newActorInput: false,
    actorName: ''
  }),
  methods: {
    createNewActor(){
      this.axios
          .post(`/new`,{name:this.actorName})
          .then( res => {
            if (res.status === 200){
              EventBus.$emit('alert',{
                color: 'green',
                type: 'success',
                msg: res.data.message
              });
              EventBus.$emit('toActorGallery_reloadGallery');
            }
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            })
          });
      this.actorName = '';
      this.newActorInput = false;
    }
  }
}
</script>

<style scoped>

</style>