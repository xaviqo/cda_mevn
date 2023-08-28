<template>
  <v-card elevation="0">
    <v-container>
      <v-row>
        <v-col
            v-for="category in awards.categories"
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
                v-for="category in awards.categories"
                v-if="(picked === category)"
            >
              <v-subheader class="text-h6">
                {{ category.toUpperCase() }}
              </v-subheader>
              <template
                  v-for="awd in awards.values"
              >
                <v-list-item
                    v-if="awd.category === category"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ awd.exp }}</v-list-item-title>
                    <v-list-item-subtitle>{{ awd.date }}</v-list-item-subtitle>
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
  name: 'PortfolioAwards',
  data: () => ({
    picked: ''
  }),
  props: {
    awards: {
      required: true
    }
  },
  created() {
    if (this.awards.categories.length > 0) {
      this.pick(this.awards.categories[0]);
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