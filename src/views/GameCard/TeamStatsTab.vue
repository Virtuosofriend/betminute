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

                <div class="card__box-description">
                    <p>
                        {{ $t( `Games.teamStatsTab.description1` ) }}
                    </p>
                </div>

                <v-container>
                    <v-row v-if="gameData.bm_static != null">
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <team-logo
                                    :logo="gameData.lineup.home.logo"
                                ></team-logo>
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
                    <no-data
                        v-else
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
                </v-container>

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

                <div class="card__box-description">
                    <p>
                        {{ $t( `Games.teamStatsTab.description2` ) }}
                    </p>
                </div>

                <v-container>
                    <v-row v-if="gameData.bm_static != null">
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <team-logo
                                    :logo="gameData.lineup.away.logo"
                                ></team-logo>
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
                    <no-data
                        v-else
                        class="pa-2 text-center"
                        :data-text="`${ $t('General.noContent')}`"
                    ></no-data>
                </v-container>
            </div>
        </v-col>

        <v-col
            cols="12"
            md="12"
        >
            <div class="card__box">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.teamStatsTab.title3` ) }}
                </h3>

                <div class="card__box-description">
                    <p>
                        {{ $t( `Games.teamStatsTab.description3` ) }}
                    </p>
                </div>

                <v-container>
                    <v-row v-if="gameData.bm_static != null">
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.home.logo" class="team__logo">
                                <dropdown-home-away
                                    :defaultValue="defaultValue_home_overunder"
                                    @changeDefaultValue="defaultValue_home_overunder = $event"
                                ></dropdown-home-away>
                            </div>
                            <over-goals-graph
                                :gameData="gameData.bm_static.home.uo"
                                :teamField="defaultValue_home_overunder"
                            ></over-goals-graph>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.away.logo" class="team__logo">
                                <dropdown-home-away
                                    :defaultValue="defaultValue_away_overunder"
                                    @changeDefaultValue="defaultValue_away_overunder = $event"
                                ></dropdown-home-away>
                            </div>

                            <over-goals-graph
                                :gameData="gameData.bm_static.away.uo"
                                :teamField="defaultValue_away_overunder"
                            ></over-goals-graph>
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
import dropdownSelection from "../../components/Game/TeamStats/DropdownSelection"
import dropdownHomeAway from "../../components/General/HomeAwayOverallDropdown"
import TeamLogo from '../../components/General/TeamLogo.vue';

export default {
    name:   "Teamstats__tab",

    data() {
        return {
            game_id:                    this.$route.params.gameID,
            defaultValue_home_goal:     10,
            defaultValue_away_goal:     10,
            defaultValue_home_corner:   10,
            defaultValue_away_corner:   10,
            defaultValue_home_overunder:"home",
            defaultValue_away_overunder:"away"
        }
    },

    computed: {
        ...mapGetters({
            gameData:   "game/fetchgame"
        })
    },

    components: {
        noData:         () => import("../../components/General/NoData/GenericNoData"),
        overGoalsGraph: () => import("../../components/Game/TeamStats/OverGoalsMatches"),
        timeIntervals:  () => import("../../components/Game/TeamStats/TimeIntervals"),
        dropdownSelection,
        dropdownHomeAway,
        TeamLogo
    }
}
</script>

<style lang="scss" scoped>
.card__box-description {
    display: flex;
    justify-content: flex-start;
    color: var(--v-primary-base);
    font-size: 14px;
    width: 50%;
    margin: 24px auto 0px auto;
    opacity: .7;
}
.team {
    display: flex;
    align-items: center;
}
.team__logo {
    object-fit: contain;
    width: 64px;
    height: 64px;
    margin-right: 4px;
}
</style>