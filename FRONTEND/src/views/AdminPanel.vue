<template>
  <div>
    <AdminBar></AdminBar>
    <ActorGallery admin></ActorGallery>
    <ActorEditDialog
        :actor-id=selectedActor.id
        :actor-name=selectedActor.name
        :show-dialog=showEditOptionsDialog
    >
    </ActorEditDialog>
    <ActorEditionForm
        :show-dialog=showActorEditionDialog
        :actor-id=selectedActor.id
        :actor-name=selectedActor.name
        :edition-type=editionFormType
    >
    </ActorEditionForm>
  </div>
</template>
<!--
  Perfil - Habilidades - RRSS (Perfil)
  Imagenes - Videos (Multimedia)
  Exp Profesional - Formacion - Premios (Experiencia)
-->
<!--
  EXTRA:
  DESCARGAR TODAS LAS FOTOS
  CAMBIAR RRSS
-->
<script>
import {EventBus} from "@/main";
import {mixins} from "../../mixins";
import ActorGallery from "@/components/ActorGallery.vue";
import AdminBar from "@/components/AdminBar.vue";
import ActorEditDialog from "@/components/ActorEditDialog.vue";
import ActorEditionForm from "@/components/ActorEditionForm.vue";

export default {
  name: "AdminPanel",
  mixins: [mixins],
  components: { ActorEditDialog, AdminBar, ActorGallery, ActorEditionForm },
  data: () => ({
    isAdmin: true,
    showEditOptionsDialog: false,
    showActorEditionDialog: false,
    editionFormType: '',
    selectedActor: {
      id: '',
      name: ''
    }
  }),
  created() {
    this.checkAdmin();

    EventBus.$on('adminActions_adminPanel_editActor',
        (selectedActor) => {
          if (selectedActor){
            this.selectedActor = selectedActor;
            this.showEditOptionsDialog = true;
          } else {
            this.showEditOptionsDialog = false;
          }
        });

    EventBus.$on('actorEditionForm_adminPanel_showEditForm',
        (option) => {
          if (option){
            this.showActorEditionDialog = true;
            this.editionFormType = option;
          } else {
            this.showActorEditionDialog = false;
          }
      });

    EventBus.$on('toAdminPanel_updateActorCloseDialogs',
        (actorName) => {
          if (actorName != null && actorName !== 'noClose') this.selectedActor.name = actorName;
          if (actorName !== 'noClose') this.showActorEditionDialog = false;
          EventBus.$emit('toActorGallery_reloadGallery')
        });

  },
  methods: {
    async checkAdmin(){
      this.axios
          .get(`/admin/check`)
          .then( res => {
            if (!res.data.admin) this.$router.push(`/`)
          })
          .catch( e => {
            this.removeSession();
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