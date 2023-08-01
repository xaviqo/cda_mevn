<template>
  <div>
      <v-row class="flexized">
        <v-card max-width="60vw" class="pa-8" elevation="0" outlined>
          <template>
            <v-form
                ref="adminForm"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="admin.user"
                  append-icon="mdi-account"
                  :rules="[v => !!v || 'Es necesario indicar un usuario']"
                  label="Usuario"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="admin.password"
                  :type="showPwd ? 'text' : 'password'"
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[v => !!v || 'Es necesario indicar una contraseña']"
                  label="Contraseña"
                  @click:append="showPwd = !showPwd"
                  required
              ></v-text-field>
              <div class="mt-2">
                <v-btn
                    tile
                    outlined
                    color="error"
                    class="mr-4"
                    @click="reset"
                >
                  Reiniciar
                </v-btn>
                <v-btn
                    tile
                    outlined
                    color="success"
                    @click="connect"
                >
                  Conectar
                </v-btn>
              </div>
            </v-form>
          </template>
        </v-card>
      </v-row>
  </div>
</template>
<style>
.flexized {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
}
</style>
<script>
import {EventBus} from "@/main";
import {mixins} from "../mixins/mixins";
import AdminBar from "@/components/AdminBar.vue";

export default {
  name: "AdminPanel",
  components: {AdminBar},
  mixins: [mixins],
  data: () => ({
    showPwd: false,
    valid: true,
    admin: {
      user: '',
      password: ''
    }
  }),
  created() {
    if (this.isSessionSetted()) this.$router.push(`/cda-admin`);
  },
  methods: {
    reset() {
      this.$refs.adminForm.reset();
    },
    connect() {
      if (!this.$refs.adminForm.validate()) return;
      this.axios
          .post(`/admin/login`,this.admin)
          .then( res => {
            if (res.status === 200){
              EventBus.$emit('alert',{
                color: 'green',
                type: 'success',
                msg: 'Credenciales correctas'
              });
              if (this.isSessionSetted()) this.removeSession();

              this.saveSession(res.data);
              setTimeout(
                  this.$router.push(`/cda-admin`)
                  ,1000);
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

</style>