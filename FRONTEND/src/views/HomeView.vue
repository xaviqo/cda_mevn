<template>
  <v-row class="d-flex justify-center">
    <ActorGallery></ActorGallery>
  </v-row>
</template>

<script>
  import ActorGallery from "@/components/ActorGallery.vue";

  export default {
    name: 'Home',

    components: {
      ActorGallery,
    },
  }
</script>
