<template>
  <v-row>
    <v-dialog
        v-model="showDialog"
        persistent
        transition="dialog-bottom-transition"
        :max-width=dialogWidthVW
    >
      <v-card
          style="overflow: hidden !important;"
      >
        <v-toolbar
            dark
            color="dark"
        >
          <v-btn
              icon
              dark
              @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Editar {{ editionType.toLowerCase() }} de {{ actorName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                dark
                text
                @click=save
                tile
            >
              <v-icon class="mr-2" dense>mdi-content-save-outline</v-icon>
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <ActorEditProfile v-if="editionType === EditOptions.profile" :actor-id=actorId />
        <ActorEditSocial v-if="editionType === EditOptions.social" :actor-id=actorId />
        <ActorEditBackground v-if="editionType === EditOptions.experiences" :actor-id=actorId />
        <ActorEditMultimedia v-if="editionType === EditOptions.multimedia" :actor-id=actorId />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EditOptions from "@/constants/EditOptions";
import {EventBus} from "@/main";
import ActorEditProfile from "@/components/forms/ActorEditProfile.vue";
import ActorEditBackground from "@/components/forms/ActorEditBackground.vue";
import ActorEditSocial from "@/components/forms/ActorEditSocial.vue";
import ActorEditMultimedia from "@/components/forms/ActorEditMultimedia.vue";

export default {
  name: "ActorEditionForm",
  computed: {
    EditOptions() {
      return EditOptions
    }
  },
  components: {ActorEditMultimedia, ActorEditSocial, ActorEditBackground, ActorEditProfile},
  props: {
    actorName: {
      type: String,
      required: true
    },
    actorId: {
      type: String,
      required: true
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    editionType: {
      type: String,
      required: true
    }
  },
  created() {
    this.resizeDialog(window.innerWidth);
    window.addEventListener('resize', () => {
      this.resizeDialog(window.innerWidth);
    });
    EventBus.$on('toActorEditionForm_save', (payload) => {
      this.axios
          .post(`/update/${this.actorId}`, payload)
          .then( res => {
            if (res.status === 200){
              EventBus.$emit('alert',{
                color: 'green',
                type: 'success',
                msg: res.data.message
              });

              if (payload.hasOwnProperty('name'))
                EventBus.$emit('toAdminPanel_updateActorCloseDialogs',payload.name);
              else if (payload.hasOwnProperty('videos'))
                EventBus.$emit('toAdminPanel_updateActorCloseDialogs','noClose');
              else
                EventBus.$emit('toAdminPanel_updateActorCloseDialogs');
            }
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    })
  },
  data: () => ({
    dialogWidthVW: "55vw"
  }),
  methods: {
    save(){
      switch (this.editionType) {
        case EditOptions.profile:
          EventBus.$emit('actorEditionForm_actorEditProfile_save');
          break;
        case EditOptions.experiences:
          EventBus.$emit('actorEditionForm_actorEditBackground_save');
          break;
        case EditOptions.social:
          EventBus.$emit('actorEditionForm_actorEditSocial_save');
          break;
      }
    },
    resizeDialog(iw){
      if (iw<1250) {
        this.dialogWidthVW = 95+'vw';
      } else {
        this.dialogWidthVW = 55+'vw';
      }
    },
    closeDialog(){
      EventBus.$emit('actorEditionForm_adminPanel_showEditForm');
    }
  }
}
</script>

<style scoped>

</style>