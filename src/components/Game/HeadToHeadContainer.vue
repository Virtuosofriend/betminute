<template>
    <v-container>
        <v-row>
            <v-col 
                cols="12"
                md="4"
            >
                <div class="card__box">
                    <number-of-games
                        :games="game_data[team][team_field].number_of_matches"
                    ></number-of-games>
                </div>
            </v-col>

            <v-col 
                cols="12" 
                md="8"
            >
                <div class="card__box">
                    <h3 class="card__box-title text-center">
                        {{ $t( `Games.H2HTab.goals` ) }}
                    </h3>
                    <goals-on-against
                        :gameData="game_data[team][team_field].for_against"
                    ></goals-on-against>
                </div>
                
            </v-col>

            <v-col 
                cols="12" 
            >
                <div class="card__box">
                    <h3 class="card__box-title text-center">
                        {{ $t( `Games.H2HTab.matches` ) }}
                    </h3>
                    <matches-pie
                        :gameData="game_data[team][team_field].goals_pie"
                    ></matches-pie>
                </div>
                
            </v-col>

            <v-col
                cols="12"
            >
                <div class="card__box">
                    <h3 class="card__box-title text-center">
                        {{ $t( `Games.H2HTab.specificBettingMarkets` ) }}
                    </h3>

                    <betting-specific
                        :gameData="game_data[team][team_field].bet_specific"
                    ></betting-specific>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import BettingSpecific from "./H2H/bettingSpecific.vue";
import GoalsOnAgainst from "./H2H/goalsOnAgainst.vue";
import MatchesPie from "./H2H/matchesPie.vue";
import NumberOfGames from "./H2H/numberOfGames.vue";
 
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
        BettingSpecific,
        GoalsOnAgainst,
        MatchesPie,
        NumberOfGames
    }
}
</script>

<style lang="scss" scoped>

</style>