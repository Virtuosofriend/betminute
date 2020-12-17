<template>
    <v-container>
        <v-row>
            <v-col 
                cols="12"
                md="2"
            >
                <number-of-games
                    :games="game_data[team][team_field].number_of_matches"
                ></number-of-games>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import NumberOfGames from './H2H/numberOfGames.vue';

export default {
    name: "HeadToHead__container",

    props: {
        team: {
            required:   true,
            type:       String
        },

        team_field: {
            required:   true,
            type:       String
        }
    },

    computed: {
        ...mapGetters({
            game_data: "game/getH2H"
        })
    },

    components: {
        NumberOfGames
    }
}
</script>

<style lang="scss" scoped>

</style>