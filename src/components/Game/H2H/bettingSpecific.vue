<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" v-for="(values, keys,index ) in gameData" :key="index">
                <generic-card-h-2-h
                    :cardData="values"
                >
                    <template v-slot:title>
                        {{ $t( `Games.H2HTab.specific_markets.${keys}` ) }}
                    </template>
                </generic-card-h-2-h>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import GenericCardH2H from './GenericCardH2H.vue'

export default {
    name:   "Betting__specific",

    props: {
        gameData: {
            type:   Object,
            required:   true
        }
    },

    components: {
        GenericCardH2H
    }
}
</script>

<style lang="scss" scoped>

</style>