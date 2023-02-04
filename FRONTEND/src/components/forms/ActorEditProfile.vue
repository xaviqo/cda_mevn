<template>
  <v-row>
    <v-col>
      <v-list
          subheader
      >
        <v-subheader class="mt-4">
          <v-icon class="mr-4">mdi-notebook-outline</v-icon>
          INFORMACIÓN PRINCIPAL <span class="caption ml-4">(Los campos que no se rellenen, no saldrán en la ficha)</span>
        </v-subheader>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
            v-for="input in profile"
            :key=input.text
        >
            <v-text-field
                v-if="input.type === 'text'"
                :prepend-icon=input.icon
                :label=input.label
                v-model=input.value
            ></v-text-field>
          <v-combobox
              v-if="input.type === 'combobox'"
              :prepend-icon=input.icon
              :label=input.label
              v-model=input.value
              multiple
              chips
          ></v-combobox>
            <v-select
                v-if="input.type === 'select'"
                :prepend-icon=input.icon
                :label=input.label
                v-model=input.value
                :items=input.items
                :chips=input.chips
                :multiple=input.multiple
            ></v-select>

        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import {EventBus} from "@/main";

export default {
  name: "ActorEditProfile",
  props: {
    actorId: {
      type: String,
      required: true
    },
  },
  watch: {
    actorId: {
      handler: function () {
        this.retrieveProfileInfo();
      }
    }
  },
  created() {
    this.retrieveProfileInfo();
    EventBus.$on('actorEditionForm_actorEditProfile_save',
        this.save
    );
  },
  methods: {
    save(){
      const actor = {};

      for (let profileKey in this.profile) {
        if (this.profile[profileKey].value != null){
          actor[profileKey] = this.profile[profileKey].value;
        }
      }

      if (actor.name.length < 1 && Object.keys(actor).length < 1){
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'El perfil no puede estar vacío'
        });
        return;
      }

      EventBus.$emit('toActorEditionForm_save',actor);
    },
    retrieveProfileInfo(){
      this.axios
          .get(`/profile/retrieve/${this.actorId}`)
          .then( res => {
            for (let key in this.profile) {
              this.profile[key].value = res.data[key];
            }
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    }
  },
  data: () => ({
    profile: {
      name: {
        label: "Nombre",
        icon: "mdi-form-textbox",
        type: "text",
        value: null
      },
      age: {
        label: "Edad",
        icon: "mdi-cake-variant-outline",
        type: "text",
        value: null
      },
      hair: {
        label: "Cabello",
        icon: "mdi-hair-dryer-outline",
        type: "text",
        value: null
      },
      eyes: {
        label: "Ojos",
        icon: "mdi-eye-outline",
        type: "text",
        value: null
      },
      height: {
        label: "Altura",
        icon: "mdi-human-male-height",
        type: "text",
        value: null
      },
      languages: {
        label: "Idiomas",
        icon: "mdi-account-voice",
        type: "combobox",
        value: null
      },
      skills: {
        label: "Habilidades",
        icon: "mdi-drama-masks",
        type: "combobox",
        value: null
      },
      sex: {
        label: "Sexo (Se utilizará para filtrar en página principal)",
        icon: "mdi-human",
        type: "select",
        chips: false,
        multiple: false,
        items: ['Hombre','Mujer','Otros','Sin indicar'],
        value: null
      }
    }
  })
}
</script>

<style scoped>

</style>