<template>
  <div>
    <v-card
    >
      <v-card class="d-flex justify-lg-space-around pa-2 actionBgColor" color="white">
        <v-btn
            tile
            out
            icon
            width="33%"
            class="mx-1"
            @click=editActor(selectedActor)
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn
            tile
            icon
            width="33%"
            class="mx-1"
            @click=changeActorStatus(selectedActor)
        >
          <v-icon>{{selectedActor.active?'mdi-window-close':'mdi-check'}}</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn
            tile
            icon
            width="33%"
            class="mx-1"
            @click="deleteDialog = true"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card>
    </v-card>
    <template>
      <div class="text-center">
        <v-dialog
            v-model="deleteDialog"
            width="500"
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Eliminar el perfil de {{ actorName }}?
            </v-card-title>

            <v-card-text class="mt-3">
              Esta acción <b>no puede ser revertida</b>. Si no quieres que se muestre en la página principal, siempre puedes desactivar el perfil.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                  color="black"
                  text
                  @click="deleteDialog = false"
              >
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="error"
                  text
                  @click=deleteActor(selectedActor)
              >
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import ActorEditDialog from "@/components/ActorEditDialog.vue";
import {EventBus} from "@/main";

export default {
  name: "ActorAdminActions",
  components: {ActorEditDialog},
  props: {
    actorActive: {
      type: Boolean,
      required: true
    },
    actorName: {
      type: String,
      required: true
    },
    actorId: {
      type: String,
      required: true
    },
  },
  data: () => ({
    deleteDialog: false,
    actions: {
      enable: {},
      edit: {},
      delete: {},
    },
    selectedActor: {
      id: '',
      name: '',
      active: false
    }
  }),
  created() {
    this.selectedActor.id = this.actorId;
    this.selectedActor.name = this.actorName;
    this.selectedActor.active = this.actorActive;
  },
  methods: {
    editActor(actor){
      EventBus.$emit('adminActions_adminPanel_editActor',actor);
    },
    changeActorStatus(actor){
      this.axios
          .post(`/change-status/${actor.id}`)
          .then( res => {
            if (res.status === 200){
              EventBus.$emit('alert',{
                color: 'green',
                type: 'success',
                msg: res.data.message
              });
            }
            this.selectedActor.active = !this.selectedActor.active;
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            })
          });
    },
    deleteActor(actor){
      this.axios
          .delete(`/delete/${actor.id}`)
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
    }
  }
}
</script>

<style scoped>
.actionBgColor {
  background-color: rgba(224, 224, 224, .3) !important;
}
</style>