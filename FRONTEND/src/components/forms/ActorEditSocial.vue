<template>
  <v-row>
    <v-col>
      <v-list
          subheader
      >
        <v-subheader class="mt-4">
          <v-icon class="mr-4">mdi-earth</v-icon>
          REDES SOCIALES
        </v-subheader>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-combobox
              label="Redes disponibles"
              :items=allNetworksForCombo
              multiple
              chips
              hide-selected
              v-model=selectedNetworkNames
              @change=addNetwork
          ></v-combobox>
        </v-list-item>
        <v-list-item v-for="net in actorNetworks" :key=net.name>
          <v-text-field
              :prepend-icon=net.icon
              v-model=net.url
              :label="'Direccion de '+net.name"
              append-outer-icon="mdi-close-circle"
              @click:append-outer=clearNetwork(net.name)
          ></v-text-field>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import {EventBus} from "@/main";

export default {
  name: "ActorEditSocial",
  props: {
    actorId: {
      type: String,
      required: true
    },
  },
  watch: {
    actorId:{
      handler: function () {
        this.retrieveSocialInfo();
      }
    }
  },
  data: () => ({
    theActorId: '',
    allNetworksForCombo: ['Twitter','Youtube','Instagram','Facebook','Web'],
    selectedNetworkNames: [],
    allNetworks: [
      {
        name: 'Twitter',
        icon: 'mdi-twitter',
        url: ''
      },
      {
        name: 'Youtube',
        icon: 'mdi-youtube',
        url: ''
      },
      {
        name: 'Instagram',
        icon: 'mdi-instagram',
        url: ''
      },
      {
        name: 'Facebook',
        icon: 'mdi-facebook',
        url: ''
      },
      {
        name: 'Web',
        icon: 'mdi-earth',
        url: ''
      }
    ],
    actorNetworks: [],
  }),
  created() {
    this.retrieveSocialInfo();
    EventBus.$on('actorEditionForm_actorEditSocial_save',
      this.save
    );
  },
  methods: {
    save(){
      if (this.actorNetworks.length < 1){
        EventBus.$emit('alert',{
          color: 'red',
          type: 'error',
          msg: 'Debes indicar al menos una red'
        });
        return;
      }
      EventBus.$emit('toActorEditionForm_save',
          { media: this.actorNetworks }
      );
    },
    clearNetwork(network){
      this.actorNetworks = this.actorNetworks.filter( net => (net.name !== network));
      this.selectedNetworkNames = this.selectedNetworkNames.filter( net => (net !== network));
    },
    retrieveSocialInfo(){
      this.actorNetworks = [];
      this.selectedNetworkNames = [];
      this.axios
          .get(`/social/retrieve/${this.actorId}`)
          .then( res => {
            res.data.media.forEach( m => {
              this.selectedNetworkNames.push(m.name);
              this.actorNetworks.push(m);
            });
          })
          .catch( e => {
            EventBus.$emit('alert',{
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    },
    addNetwork(networksToAdd){
      // enter the new ones from the 'networksToAdd' array
      networksToAdd.forEach( checkNetwork => {
        if (!this.actorNetworks.some( actNet => actNet.name === checkNetwork)) {
          this.actorNetworks.push(
              this.allNetworks.find( net => {
                if (net.name === checkNetwork){
                  return net;
                }
              })
          );
        }
      });
      // delete those that are not present
      this.actorNetworks = this.actorNetworks.filter( network => {
        if (networksToAdd.includes(network.name)){
          return network;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>