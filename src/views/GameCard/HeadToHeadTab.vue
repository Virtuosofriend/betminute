<template>
    <v-row>
        <v-col
            cols="12"
            md="12"
        >
            <div class="card__box no__background">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.H2HTab.title` ) }}
                </h3>

                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.home.logo" class="team__logo">
                                <dropdown-home-away
                                    :defaultValue="defaultValue_home"
                                    @changeDefaultValue="defaultValue_home = $event"
                                ></dropdown-home-away>
                            </div>
                            <page-container
                                team="home"
                                :team_field="defaultValue_home"
                                v-if="game_h2h != null"
                            ></page-container>
                            <no-data
                                v-else
                                class="pa-2 text-center"
                                :data-text="`${ $t('General.noContent')}`"
                            ></no-data>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <div class="team">
                                <img :src="gameData.lineup.away.logo" class="team__logo">
                                <dropdown-home-away
                                    :defaultValue="defaultValue_away"
                                    @changeDefaultValue="defaultValue_away = $event"
                                ></dropdown-home-away>
                            </div>

                            <page-container
                                team="away"
                                :team_field="defaultValue_away"
                                v-if="game_h2h != null"
                            ></page-container>
                            <no-data
                                v-else
                                class="pa-2 text-center"
                                :data-text="`${ $t('General.noContent')}`"
                            ></no-data>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import dropdownHomeAway from "../../components/General/HomeAwayOverallDropdown";
import pageContainer from "../../components/Game/HeadToHeadContainer";

export default {
    name:   "H2H__tab",

    data() {
        return {
            game_id:                this.$route.params.gameID,
            defaultValue_home:      "home",
            defaultValue_away:      "away"
        }
    },

    computed: {
        ...mapGetters({
            game_h2h:       "game/getH2H",
            gameData:       "game/fetchgame"
        })
    },

    components: {
        noData:         () => import("../../components/General/NoData/GenericNoData"),
        overGoalsGraph: () => import("../../components/Game/TeamStats/OverGoalsMatches"),
        timeIntervals:  () => import("../../components/Game/TeamStats/TimeIntervals"),
        dropdownHomeAway,
        pageContainer
    }
}
</script>

<style lang="scss" scoped>
.no__background {
    background: transparent;
}
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