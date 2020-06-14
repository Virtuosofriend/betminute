<template>
    <v-container 
      fluid
    >
        <v-row
            v-if="game.lineup"
        >
            <v-col 
                md="12"
            >
                <Game-header
                    :dataLineup="game.lineup"
                    :dataHome="homeTeam"
                    :dataAway="awayTeam"
                ></Game-header>
            </v-col>

            <v-col cols="12" md="4">
                <div class="card--box">
                    <h3 class="card--box__title">
                        Suggestions
                    </h3>
                    <game-suggestions
                        :suggestions="game.bm_static.suggestion"
                    ></game-suggestions>
                </div>
                
            </v-col>

            <v-col cols="12" md="8">
                <div class="card--box">
                    <game-live-stats
                        :gameData="game.bm_live_data"
                        :homeTeam="homeTeam.logo"
                        :awayTeam="awayTeam.logo"
                        v-if="game.bm_live_data"
                    >
                    </game-live-stats>

                    <no-data v-else 
                        class="pa-2 text-center"
                        data-text="No live data available"
                    >
                    </no-data>
                </div>
                
            </v-col>
                
                <!-- <code>
                    {{ game }}
                </code> -->
            
        </v-row>

        <v-row v-else>
            <v-col cols="12">
                <h2>No data available</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import GameHeader from '../components/Game/Header';

export default {
    name: "GameCard",

    computed: {
        ...mapGetters({
            game: "game/fetchgame"
        }),

        homeTeam() {            
            return {
                name:           this.game.lineup.home.name,
                logo:           this.game.lineup.home.logo,
                goals:          this.game.lineup.home.goals,
                recent_form:    this.game.lineup.home.recent_form,
            }
        },

        awayTeam() {
            return {
                name:           this.game.lineup.away.name,
                logo:           this.game.lineup.away.logo,
                goals:          this.game.lineup.away.goals,
                recent_form:    this.game.lineup.away.recent_form,
            }
        }
    },

    components: {
        GameHeader,
        gameLiveStats: () => import("../components/Game/LiveGameStatsBelowHeader"),
        gameSuggestions: () => import("../components/Game/PreGameSuggestions"),
        noData: () => import("../components/General/NoData/GenericNoData")
    },

    mounted() {
        let payload = this.$route.params;
        this.$store.dispatch("game/gameInfo", payload);
    }
}
</script>

<style scoped>

</style>