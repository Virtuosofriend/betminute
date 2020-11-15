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
                <div class="card__box">
                    <h3 class="card__box-title">
                        {{ $t( `Games.suggestions.title` ) }}
                    </h3>

                    <game-suggestions
                        :suggestions="game.bm_static.suggestion"
                        v-if="game.bm_static.suggestion"
                    ></game-suggestions>
                    <no-data v-else 
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
                </div>

                <div class="card__box">
                    <h3 class="card__box-title">
                        {{ $t( `Games.textbot.title` ) }}
                    </h3>
                    <game-textbot
                        :textbotValues="game.textbot"
                        v-if="game.textbot != null"
                    ></game-textbot>
                </div>
                
            </v-col>

            <v-col cols="12" md="8">
                <div class="card__box">
                    <game-live-stats
                        :gameData="game.bm_live_data"
                        :homeTeam="homeTeam.logo"
                        :awayTeam="awayTeam.logo"
                        v-if="game.bm_live_data"
                    >
                    </game-live-stats>

                    <no-data v-else 
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
                </div>

                <div class="card__box">
                    <attacks-graph
                        :gameid="game_id"
                    ></attacks-graph>
                </div>
                
            </v-col>

            <v-col
                cols="12"
            >
                <div class="card__box">
                    <h3 class="card__box-title text-center">
                        {{ $t( `Games.tipping.title` ) }}
                    </h3>
                    <game-odds></game-odds>
                </div>
                
            </v-col>            
        </v-row>

        <v-row v-else>
            <v-col cols="12">
                <no-data 
                    class="pa-2 text-center"
                    :data-text="`${ $t('General.noContent')}`"
                ></no-data>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import GameHeader from "../components/Game/Header";

export default {
    name: "GameCard",

    data() {
        return {
            game_id:    this.$route.params.gameID
        }
    },

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
        gameLiveStats:      () => import("../components/Game/LiveGameStatsBelowHeader"),
        gameSuggestions:    () => import("../components/Game/PreGameSuggestions"),
        gameTextbot:        () => import("../components/Game/GameTextbot"),
        gameOdds:           () => import("../components/Game/GameOdds"),
        attacksGraph:       () => import("../components/Game/GameAttacksGraph"),
        noData:             () => import("../components/General/NoData/GenericNoData")
    },

    mounted() {
        const payload = this.$route.params;
        this.$store.dispatch("game/gameInfo", payload);
    }
}
</script>

<style lang="scss" scoped>
.card__box {
    width: 100%;
    background-color: var(--theme-dark-10);
    border-radius: 15px;
    margin: .5em auto;
    min-height: 50px;
}

.card__box-title {
    padding-left: .6em;
    padding-top: .5em;
    font-weight: 600;
    text-transform: initial;
}
</style>