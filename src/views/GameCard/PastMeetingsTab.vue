<template>
    <v-row>
        <v-col
            cols="12"
        >
            <div class="card__box">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.pastMeetingsTab.title1` ) }}
                </h3>

                <generic-table
                    v-if="gameData.bm_static != null"
                    :tableData="gameData.bm_static.past_matches"
                ></generic-table>
                <no-data
                    v-else
                    class="pa-2 text-center"
                    :data-text="`${ $t('General.noContent')}`"
                ></no-data>
            </div>
        </v-col>
        <v-col
            cols="12"
        >
            <div class="card__box">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.pastMeetingsTab.title2` ) }}
                </h3>
                <v-container>

                    <v-row v-if="gameData.bm_static != null">
                        <v-col
                            cols="12"
                            lg="6"
                        >
                            <div class="team">
                                <team-logo
                                    :logo="gameData.lineup.home.logo"
                                ></team-logo>
                                <dropdown-selection
                                    :defaultValue="defaultValue_home"
                                    @changeDefaultValue="defaultValue_home = $event"
                                ></dropdown-selection>
                            </div>
                            <form-table
                                :meetings="gameData.bm_static.home.form"
                                :homeTeam="gameData.lineup.home.name"
                                :dropdownSelection="defaultValue_home"
                            ></form-table>
                        </v-col>

                        <v-col
                            cols="12"
                            lg="6"
                        >   
                            <div class="team">
                                <team-logo
                                    :logo="gameData.lineup.away.logo"
                                ></team-logo>
                                <dropdown-selection
                                    :defaultValue="defaultValue_away"
                                    @changeDefaultValue="defaultValue_away = $event"
                                ></dropdown-selection>
                            </div>
                            <form-table
                                :meetings="gameData.bm_static.away.form"
                                :homeTeam="gameData.lineup.away.name"
                                :dropdownSelection="defaultValue_away"
                            ></form-table>
                        </v-col>
                    </v-row>
                    <no-data
                        v-else
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
                </v-container>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import TeamLogo from '../../components/General/TeamLogo.vue';

export default {
    name:   "Pastmeetings__tab",

    data() {
        return {
            game_id:            this.$route.params.gameID,
            defaultValue_home:  "home",
            defaultValue_away:  "away"
        }
    },

    computed: {
        ...mapGetters({
            game:       "feed/allGames",
            gameData:   "game/fetchgame"
        })
    },

    components: {
        dropdownSelection:  () => import("../../components/General/HomeAwayOverallDropdown"),
        noData:             () => import("../../components/General/NoData/GenericNoData"),
        genericTable:       () => import("../../components/Game/PastMeetingsTable"),
        formTable:          () => import("../../components/Game/PastForm/FormTable"),
        TeamLogo
    }
}
</script>

<style lang="scss" scoped>
.team {
    display: flex;
    align-items: center;
}
</style>