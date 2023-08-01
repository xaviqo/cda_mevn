<template>
  <v-card class="ma-4" elevation="0">
    <v-list>
      <template
          v-for="category in formation.categories"
      >
        <v-subheader>
          {{ category.toUpperCase() }}
        </v-subheader>
        <template
            v-for="fmt in formation.values"
        >
          <v-list-item>
            <v-list-item-content
                v-if="fmt.category === category"
            >
              <v-list-item-title>{{ fmt.exp }}</v-list-item-title>
              <v-list-item-subtitle>{{ fmt.date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'PortfolioFormation',
  props: {
    formation: {
      required: true
    }
  }
}
</script>