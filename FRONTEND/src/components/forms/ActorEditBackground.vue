<template>
  <v-row>
    <v-col>
      <v-list
      >
        <v-tabs
            fixed-tabs
            hide-slider
            class="mt-1"
        >
          <v-tab
              v-for="(bg, i) in backgrounds"
              :key=bg.name
              class="mb-2"
              :class="{ active: activeTab === i}"
              @click=changeActiveTab(i)
          >
            <v-subheader
                class="mt-2"
            >
              <v-icon
                  class="mr-4"
                  v-if="activeTab === i"
              >
                {{ bg.icon }}
              </v-icon>
              {{ bg.name }}
              <v-tooltip
                  bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <div
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-switch
                        v-if="activeTab === i"
                        class="ml-4"
                        color="grey darken-3"
                        v-model="bg.active"
                    ></v-switch>
                  </div>
                </template>
                <span>{{ bg.active?'Desactivar':'Activar' }}</span>
              </v-tooltip>
            </v-subheader>
          </v-tab>
        </v-tabs>
      </v-list>
      <v-divider></v-divider>
      <v-list
          subheader
      >
        <v-row class="px-6">
          <v-col cols="5">
            <v-text-field
                prepend-icon="mdi-calendar-range"
                :label=labels.date
                v-model=newBg.date
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
                prepend-icon="mdi-information-outline"
                :label=labels.exp
                v-model=newBg.exp
            ></v-text-field>
          </v-col>
          <v-col
            class="d-flex justify-center align-center"
          >
            <v-btn
                small
                icon
                outlined
                @click=addNewData(activeTab)
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list>
      <v-list v-if="backgrounds[activeTab].values.length > 0">
        <v-divider></v-divider>
          <v-list-item
          v-for="(val,i) in backgrounds[activeTab].values"
          :key="val.exp"
          >
            <v-list-item-icon>
              <v-icon class="ml-4 mt-1">{{ backgrounds[activeTab].icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ val.exp }}</v-list-item-title>
              <v-list-item-subtitle>{{ val.date }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                  small
                  icon
                  outlined
                  class="mt-2"
                  @click=removeExperience(activeTab,i)
              >
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import {EventBus} from "@/main";

export default {
  name: "ActorEditBackground",
  data: () => ({
    activeTab: 0,
    newBg: {
      date: '',
      exp: ''
    },
    labels:{
      date: '',
      exp: '',
    },
    backgrounds: [
      {
        schemaName: 'formation',
        name: 'Formación',
        icon: 'mdi-school',
        active: false,
        values: []
      },
      {
        schemaName: 'experience',
        name: 'Experiencia Profesional',
        icon: 'mdi-movie-open',
        active: false,
        values: []
      },
      {
        schemaName: 'awards',
        name: 'Premios',
        icon: 'mdi-trophy-award',
        active: false,
        values: []
      },
    ]
  }),
  props: {
    actorId: {
      type: String,
      required: true
    },
  },
  watch: {
    actorId: {
      handler: function () {
        this.retrieveBackgroundInfo();
      }
    }
  },
  methods:{
    save(){
      const actor = { background: {} };

      this.backgrounds.forEach( bg => {
        if (bg.values.length > 0){
          actor.background[bg.schemaName] = {
            values: bg.values,
            active: bg.active
          };
        }
      })

      if (Object.keys(actor).length < 1) {
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'No se ha añadido ninguna experiencia'
        });
        return;
      }

      EventBus.$emit('toActorEditionForm_save',actor);
    },
    addNewData(tab){
      this.backgrounds[tab].values.push(this.newBg);
      this.changeActiveTab(tab);
    },
    removeExperience(tab,index){
      this.backgrounds[tab].values.splice(index,1);
    },
    changeActiveTab(i){
      this.labels = {
        date: `Fecha de `+this.backgrounds[i].name.toLowerCase(),
        exp: this.backgrounds[i].name
      }
      this.newBg = {
        date: '',
        exp: ''
      };
      this.activeTab = i;
    },
    retrieveBackgroundInfo(){
      this.axios
          .get(`/experience/retrieve/${this.actorId}`)
          .then( res => {
            this.backgrounds.forEach( bg => {
              bg.active = res.data.background[bg.schemaName].active;
              bg.values = res.data.background[bg.schemaName].values;
            });
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
  created() {
    this.changeActiveTab(0);
    this.retrieveBackgroundInfo();
    EventBus.$on('actorEditionForm_actorEditBackground_save',
        this.save
    );
  }
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