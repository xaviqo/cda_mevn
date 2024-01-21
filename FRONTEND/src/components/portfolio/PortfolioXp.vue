<template>
  <v-card elevation="0">
    <v-container>
      <v-row>
        <v-col
            v-for="category in experience.categories"
            align="center"
            class="my-2"
            :key="category"
        >
          <v-btn
              elevation="0"
              block
              large
              :disabled="(picked === category)"
              @click="pick(category)"
              :outlined="(picked === category)"
          >
            {{ category.toUpperCase() }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <div class="list-container">
          <v-list>
            <template
                v-for="category in experience.categories"
                v-if="(picked === category)"
            >
              <v-subheader class="text-h6">
                {{ category.toUpperCase() }}
              </v-subheader>
              <template v-for="xp in experience.values">
                <div v-if="xp.category === category" class="ma-3">
                  <div class="subtitle-1">
                    {{ xp.exp }}
                  </div>
                  <div class="caption font-weight-bold" style="color: gray">
                    {{ xp.date }}
                  </div>
                </div>
              </template>
            </template>
          </v-list>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'PortfolioXp',
  data: () => ({
    picked: ''
  }),
  props: {
    experience: {
      required: true
    }
  },
  created() {
    if (this.experience.categories.length > 0) {
      this.pick(this.experience.categories[0]);
    }
  },
  methods: {
    pick(formation){
      this.picked = formation;
    }
  }
}
</script>
<style>
.list-container {
  max-height: 65vh; /* Cambia esto al valor de altura que desees */
  overflow: auto;
  min-width: 99%;
}
</style>