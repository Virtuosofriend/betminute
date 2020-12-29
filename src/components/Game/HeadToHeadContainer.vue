<template>
    <v-container>
        <v-row>
            <v-col 
                cols="12"
                md="12"
            >
                <div class="card__box">
                    <number-of-games
                        :games="game_data[team][team_field].number_of_matches"
                    ></number-of-games>
                </div>
            </v-col>

            <v-col 
                cols="12" 
                md="12"
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

            <v-col
                cols="12"
            >
                <v-row>
                    <v-col cols="12">
                        <div class="card__box">
                            <h3 class="card__box-title text-center">
                                {{ $t( `Games.H2HTab.scoredFailedscore` ) }}
                                <small class="d-block">{{ $t( `Games.H2HTab.percentageSubTitle` ) }}</small>
                            </h3>
                            <goals-on-against
                                :gameData="game_data[team][team_field].scored_failedtoscore"
                            ></goals-on-against>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="card__box">
                            <h3 class="card__box-title text-center">
                                {{ $t( `Games.H2HTab.cleanSheetTitle` ) }}
                                <small class="d-block">{{ $t( `Games.H2HTab.percentageSubTitle` ) }}</small>
                            </h3>
                            <goals-on-against
                                :gameData="game_data[team][team_field].cleanSheet_condeded"
                            ></goals-on-against>
                        </div>
                    </v-col>
                </v-row>
            </v-col>

            <v-col
                cols="12"
            >
                <div class="card__box">
                    <h3 class="card__box-title text-center">
                        {{ $t( `Games.H2HTab.winLossDraw` ) }}
                            <small class="d-block">{{ $t( `Games.H2HTab.percentageSubTitle` ) }}</small>
                    </h3>
                    <v-row>
                        <v-col 
                            cols="12" 
                            md="6"
                        >
                            <h4 class="text-center">HT</h4>
                            <win-loss-draw-pie
                                :gameData="game_data[team][team_field].winLossDraw.half_time"
                            ></win-loss-draw-pie>
                        </v-col>
                        <v-col 
                            cols="12" 
                            md="6"
                        >
                            <h4 class="text-center">FT</h4>
                            <win-loss-draw-pie
                                :gameData="game_data[team][team_field].winLossDraw.full_time"
                            ></win-loss-draw-pie>
                        </v-col>

                        <v-col cols="12">
                            <win-loss-draw-extras
                                :gameData="game_data[team][team_field].extraWinLossDraw"
                            ></win-loss-draw-extras>
                        </v-col>
                    </v-row>
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
import WinLossDrawExtras from './H2H/winLossDrawExtras.vue';
import WinLossDrawPie from './H2H/winLossDrawPie.vue';
 
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
        NumberOfGames,
        WinLossDrawExtras,
        WinLossDrawPie
    }
}
</script>

<style lang="scss" scoped>
.card__box-title {
    padding-left: 0;
    padding-top: 10px;
}
</style>