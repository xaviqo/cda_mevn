<template>
    <v-list
            disabled
    >
        <v-list-item-group
                color="primary"
        >
            <v-list-item
                    v-for="(item, i) in personalData"
                    :key="i"
                    v-if="item !== undefined"
            >
                <v-list-item-icon>
                    <v-icon>{{ PersonalData[i].icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
              <span class="font-weight-medium">
              {{ PersonalData[i].text }}
              </span>
                        <div class="mb-3">
                            <template v-if="PersonalData[i].text !== PersonalData.languages.text">
                                {{ item }}
                            </template>
                            <template v-else>
                                {{ formatLangString(item) }}
                            </template>
                        </div>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
import PersonalData from "../../constants/PersonalData";

export default {
    name: "PortfolioPersonalData",
    computed: {
        PersonalData() {
            return PersonalData
        }
    },
    data: () => ({}),
    methods: {
        formatLangString(arr) {
            const languages = [];
            arr.forEach(ln => {
                languages.push(ln.lang);
            });
            return languages.join(" / ");
        }
    },
    props: {
        personalData: {
            required: true
        },
    },
}
</script>

<style scoped>

</style>