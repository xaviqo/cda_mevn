<template>
  <v-card elevation="0">
    <v-container>
      <v-row>
        <v-col
            v-for="category in formation.categories"
            align="center"
            class="my-2"
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
                v-for="category in formation.categories"
                v-if="(picked === category)"
            >
              <v-subheader class="text-h6">
                {{ category.toUpperCase() }}
              </v-subheader>
              <template
                  v-for="fmt in formation.values"
              >
                <v-list-item
                    v-if="fmt.category === category"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ fmt.exp }}</v-list-item-title>
                    <v-list-item-subtitle>{{ fmt.date }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
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
  name: 'PortfolioFormation',
  data: () => ({
    picked: ''
  }),
  props: {
    formation: {
      required: true
    }
  },
  created() {
    if (this.formation.categories.length > 0) {
      this.pick(this.formation.categories[0]);
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