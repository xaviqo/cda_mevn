<template>
  <v-row justify="center">
      <v-dialog
          transition="fade-transition"
          v-model="showDialog"
          persistent
          max-width="420px"
      >
        <v-card tile>
          <v-card-title>
            <span class="text-h5">Editar {{ actorName }}</span>
          </v-card-title>
          <v-card-text>
            <v-col
                v-for="(btn, btn_i) in options"
                :key=btn_i
            >
              <v-tooltip
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    block
                    tile
                    outlined
                    elevation="0"
                    x-large
                    v-bind="attrs"
                    v-on="on"
                    @click="showEditForm(btn.button)"
                  >
                    <v-icon class="mr-2">{{ btn.icon }}</v-icon>
                    {{ btn.button }}
                  </v-btn>
                </template>
                <span>{{ btn.tip }}</span>
              </v-tooltip>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                tile
                text
                @click="closeDialog"
                class="mt-n6"
            >
              Cerrar
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
import {EventBus} from "@/main";
import {mixins} from "../mixins/mixins";
import EditOptions from "@/constants/EditOptions";

export default {
  name: "ActorEditDialog",
  mixins: [mixins],
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
    }
  },
  data: () => ({
    options: {
      profile: {
        button: EditOptions.profile,
        icon: 'mdi-notebook-outline',
        tip: 'Perfil - Idiomas - Habilidades'
      },
      experiences: {
        button: EditOptions.experiences,
        icon: 'mdi-license',
        tip: 'Exp. Profesional - Formación - Premios'
      },
      multimedia: {
        button: EditOptions.multimedia,
        icon: 'mdi-camera-outline',
        tip: 'Imágenes - Videos'
      },
      social: {
        button: EditOptions.social,
        icon: 'mdi-earth',
        tip: 'Redes Sociales - Página web'
      }
    }
  }),
  methods: {
    showEditForm(opt){
      EventBus.$emit('actorEditionForm_adminPanel_showEditForm',opt);
    },
    closeDialog(){
      EventBus.$emit('adminActions_adminPanel_editActor');
    }
  }
}
</script>

<style scoped>

</style>