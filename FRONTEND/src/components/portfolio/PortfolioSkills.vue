<template>
    <v-carousel
            :continuous="true"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-square"
            cycle
            interval="2500"
    >
        <v-carousel-item
                v-for="(sk, i) in skills"
                :key="i"
        >
            <v-sheet
                    tile
                    color="orange"
                    max-height="140"
                    max-width="300"
            >
                <div class="d-flex fill-height justify-center align-center">
                    <div class="text-h2">
                            <span
                                class="text-h4"
                                style="max-width: 550px;"
                            >{{sk}}</span>
                    </div>
                </div>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    name: "PortfolioSkills",
    props: {
        skills: {
            required: true
        },
    },
}
</script>

<style scoped>

</style>