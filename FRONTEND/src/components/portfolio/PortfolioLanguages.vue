<template>
  <v-list>
      <v-list-item
              v-for="ln in langs"
      >
          <v-list-item-title>
              <strong>{{ ln.lang }}:</strong> {{ ln.percent }}%
          </v-list-item-title>
          <v-list-item-subtitle>
              <v-progress-linear
                      :value=ln.percent
                      height="25"
                      active=false
                      color="#424242"
              >
              </v-progress-linear>
          </v-list-item-subtitle>
      </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "PortfolioLanguages",
    props: {
        langs: {
            required: true
        },
    },
}
</script>

<style scoped>

</style>