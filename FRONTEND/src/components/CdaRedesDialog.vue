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
            <span class="text-h5">Editar Redes CDA</span>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="rs in rrss" :key="rs.name">
                <v-text-field
                    :prepend-icon=rs.icon
                    :label=rs.name
                    v-model=rs.value
                ></v-text-field>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-row class="flex justify-center">
              <v-btn
                  tile
                  text
                  @click="closeDialog"
              >
                Cerrar
              </v-btn>
              <v-btn
                  tile
                  text
                  @click="submitChangeRRSS"
              >
                Enviar
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>

import {EventBus} from "@/main";

export default {
  name: "CdaRedesDialog",
  props: {
    showDialog: {
      required: true
    }
  },
  data: () => ({
    rrss: {
      twitter: { name: 'Twitter', icon: 'mdi-twitter', value: '' },
      facebook: { name: 'Facebook', icon: 'mdi-facebook', value: '' },
      youtube: { name: 'Youtube', icon: 'mdi-youtube', value: '' }
    }
  }),
  methods: {
    closeDialog(){
      EventBus.$emit('adminActions_showRedesDialog');
    },
    submitChangeRRSS(){
      this.axios
          .post(`/cda/rrss`, {
            youtube: this.rrss.youtube.value,
            twitter: this.rrss.twitter.value,
            facebook: this.rrss.facebook.value
          })
          .then(() => {
            EventBus.$emit('alert',{
              color: 'green',
              type: 'success',
              msg: 'Redes actualizadas'
            });
            EventBus.$emit('adminActions_showRedesDialog');
          })
          .catch(e => {
            console.log(e)
            EventBus.$emit('alert', {
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    },
    getRRSS(){
      this.axios
          .get(`/cda/rrss`)
          .then(res => {
            this.rrss.twitter.value = res.data.twitter;
            this.rrss.youtube.value = res.data.youtube;
            this.rrss.facebook.value = res.data.facebook;
          })
          .catch(e => {
            console.log(e)
            EventBus.$emit('alert', {
              color: 'red',
              type: 'error',
              msg: e.response.data.message
            });
          });
    }
  },
  created() {
    this.getRRSS();
  }
}
</script>

<style scoped>

</style>