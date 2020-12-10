<template>
    <v-row>
        <v-col
            cols="12"
            md="12"
        >
            <div class="card__box">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.teamStatsTab.title1` ) }}
                </h3>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.home.logo" class="team__logo">
                                <dropdown-selection
                                    :defaultValue="defaultValue_home_goal"
                                    @changeTimeInterval="defaultValue_home_goal = $event"
                                ></dropdown-selection>
                            </div>

                            <time-intervals
                                :gameData="gameData.bm_static.home.against_for"
                                :interval="defaultValue_home_goal"
                                title="goals"
                            ></time-intervals>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.away.logo" class="team__logo">
                                <dropdown-selection
                                    :defaultValue="defaultValue_away_goal"
                                    @changeTimeInterval="defaultValue_away_goal = $event"
                                ></dropdown-selection>
                            </div>

                            <time-intervals
                                :gameData="gameData.bm_static.away.against_for"
                                :interval="defaultValue_away_goal"
                                title="goals"
                            ></time-intervals>
                        </v-col>
                    </v-row>
                </v-container>
                

                <!-- <no-data
                    v-else
                    class="pa-2 text-center"
                    :data-text="`${ $t('General.noContent')}`"
                ></no-data> -->
            </div>
        </v-col>

        <v-col
            cols="12"
            md="12"
        >
            <div class="card__box">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.teamStatsTab.title2` ) }}
                </h3>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.home.logo" class="team__logo">
                                <dropdown-selection
                                    :defaultValue="defaultValue_home_corner"
                                    @changeTimeInterval="defaultValue_home_corner = $event"
                                ></dropdown-selection>
                            </div>

                            <time-intervals
                                :gameData="gameData.bm_static.home.against_for_corner"
                                :interval="defaultValue_home_corner"
                                title="corners"
                            ></time-intervals>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.away.logo" class="team__logo">
                                <dropdown-selection
                                    :defaultValue="defaultValue_away_corner"
                                    @changeTimeInterval="defaultValue_away_corner = $event"
                                ></dropdown-selection>
                            </div>

                            <time-intervals
                                :gameData="gameData.bm_static.away.against_for_corner"
                                :interval="defaultValue_away_corner"
                                title="corners"
                            ></time-intervals>
                        </v-col>
                    </v-row>
                </v-container>
                
                <!-- <no-data
                    v-else
                    class="pa-2 text-center"
                    :data-text="`${ $t('General.noContent')}`"
                ></no-data> -->
            </div>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import dropdownSelection from "../../components/Game/TeamStats/DropdownSelection"

export default {
    name:   "Teamstats__tab",

    data() {
        return {
            game_id:                    this.$route.params.gameID,
            defaultValue_home_goal:     10,
            defaultValue_away_goal:     10,
            defaultValue_home_corner:   10,
            defaultValue_away_corner:   10
        }
    },

    computed: {
        ...mapGetters({
            game:       "feed/allGames",
            gameData:   "game/fetchgame"
        })
    },

    components: {
        noData:         () => import("../../components/General/NoData/GenericNoData"),
        timeIntervals:  () => import("../../components/Game/TeamStats/TimeIntervals"),
        dropdownSelection
    }
}
</script>

<style lang="scss" scoped>
.team {
    display: flex;
    align-items: center;
}
.team__logo {
    object-fit: contain;
    width: 64px;
    margin-right: 4px;
}
</style>