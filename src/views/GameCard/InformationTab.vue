<template>
    <v-row>
        <v-col cols="12" md="4">
                <div class="card__box">
                    <h3 class="card__box-title">
                        {{ $t( `Games.suggestions.title` ) }}
                    </h3>

                    <game-suggestions
                        :suggestions="game.bm_static.suggestion"
                        v-if="game.bm_static != null"
                    ></game-suggestions>
                    <no-data v-else 
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
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
                    <h3 class="card__box-title">
                        {{ $t( `Games.textbot.title` ) }}
                    </h3>

                    <game-textbot
                        :textbotValues="game.textbot"
                        v-if="game.textbot != null"
                    ></game-textbot>

                    <no-data v-else 
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
                </div>
            
            </v-col>

            <v-col cols="12" md="6">
                <div class="card__box">
                    <h3 class="card__box-title">
                        {{ $t( `Games.attacks` ) }}
                    </h3>
                    <attacks-graph
                        class="mt-2"
                        :attacks_home="attacks_home"
                        :attacks_away="attacks_away"
                        v-if="attacks_home.length > 0 && attacks_away.length > 0"
                        :key="game.lineup.minute"
                    ></attacks-graph>
                </div>
            </v-col>

            <v-col cols="12" md="6">
                <div class="card__box">
                    <h3 class="card__box-title">
                        {{ $t( `Games.dangerousAttacks` ) }}
                    </h3>
                    <attacks-graph
                        class="mt-2"
                        :attacks_home="attacks_dangerous_home"
                        :attacks_away="attacks_dangerous_away"
                        v-if="attacks_dangerous_home.length > 0 && attacks_dangerous_away.length > 0"
                        :key="game.lineup.minute"
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
</template>

<script>
import ApiService from "../../commons/api.service";
import { mapGetters } from "vuex";

export default {
    name:   "Information__tab",

    props: {
        homeTeam: {
            required:   true,
            type:       Object
        },

        awayTeam: {
            required:   true,
            type:       Object
        }
    },

    data() {
        return {
            game_id:                    this.$route.params.gameID,
            attacks_home:               [],
            attacks_away:               [],
            attacks_dangerous_home:     [],
            attacks_dangerous_away:     []
        }
    },

    computed: {
        ...mapGetters({
            game: "game/fetchgame"
        }),
    },

    methods: {
        fetchAttacksData() {
            ApiService.bet_minute().post(`FetchBetMinNode.php?stats_match_id=${ this.game_id }`)
                .then( res => {
                    
                    this.attacks_home = res.data.home.stats.map(elem => {
                        return {
                            x: elem.min,
                            y: elem.data["attacks"]
                        }
                    });

                    this.attacks_dangerous_home = res.data.home.stats.map(elem => {
                        return {
                            x: elem.min,
                            y: elem.data["dangerousattacks"]
                        }
                    });
           
                    this.attacks_away = res.data.away.stats.map(elem => {
                        return {
                            x: elem.min,
                            y: elem.data["attacks"]
                        }
                    });

                    this.attacks_dangerous_away = res.data.away.stats.map(elem => {
                        return {
                            x: elem.min,
                            y: elem.data["dangerousattacks"]
                        }
                    });
                }).catch( e => {
                    console.log(e.response);
                })
        },
    },

    components: {
        gameLiveStats:      () => import("../../components/Game/LiveGameStatsBelowHeader"),
        gameSuggestions:    () => import("../../components/Game/PreGameSuggestions"),
        gameTextbot:        () => import("../../components/Game/GameTextbot"),
        gameOdds:           () => import("../../components/Game/GameOdds"),
        attacksGraph:       () => import("../../components/Game/GameAttacksGraph"),
        noData:             () => import("../../components/General/NoData/GenericNoData")
    },

    mounted() {
        this.fetchAttacksData();
    }
}
</script>

<style lang="scss" scoped>

</style>