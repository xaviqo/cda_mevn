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
            v-if="input.type"
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
      <template v-if="languagesSkill.length > 0">
        <v-list>
          <v-subheader>
            <v-icon class="mr-4">mdi-translate-variant</v-icon>
            Configurar Idiomas
          </v-subheader>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
              v-for="lang in languagesSkill"
          >
            <v-progress-linear
                rounded
                v-model="lang.percent"
                color="blue-grey"
                height="25"
            >
              <strong>{{ lang.lang }}: {{ Math.ceil(lang.percent).toFixed(0) }}%</strong>
            </v-progress-linear>
          </v-list-item>
        </v-list>
      </template>
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
    },
    'profile.languages.value': {
      handler: function (langs){
        this.checkLangSkills(langs);
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
    checkLangSkills(langs){
      this.languagesSkill = this.languagesSkill.filter( lang => {
        langs.includes(lang.lang)
      });
      langs.forEach( lang => {
        const index = this.languagesSkill.findIndex( ls => {
          ls.lang == lang
        });
        if (index === -1){
          this.languagesSkill.push({
            lang: lang,
            percent: 0
          });
        }
      });
    },
    save(){
      const actor = {};

      this.languagesSkill.forEach( ln => {
          ln.percent = Math.ceil(ln.percent).toFixed(0);
      });

      for (let profileKey in this.profile) {
        if (this.profile[profileKey].value != null){
          if (profileKey !== 'languages'){
            actor[profileKey] = this.profile[profileKey].value;
          } else {
            actor[profileKey] = this.languagesSkill;
          }
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
            for (let profileKey in this.profile) {
              if (profileKey != 'languages'){
                this.profile[profileKey].value = res.data[profileKey];
              } else {
                res.data.languages.forEach( lang => {
                  this.profile.languages.value.push(lang.lang);
                });
                this.languagesSkill = res.data.languages;
                console.log(this.languagesSkill)
              }
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
        value: []
      },
      skills: {
        label: "Habilidades",
        icon: "mdi-drama-masks",
        type: "combobox",
        value: null
      },
      sex: {
        label: "Sexo",
        icon: "mdi-human",
        type: "select",
        chips: false,
        multiple: false,
        items: ['Hombre','Mujer','Otros','Sin indicar'],
        value: null
      },
    },
    languagesSkill: []
  })
}
</script>

<style scoped>

</style>