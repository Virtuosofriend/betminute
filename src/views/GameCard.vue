<template>
    <v-container 
      fluid
    >
        <v-row
            no-gutters
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

            <v-col
                cols="12"
            >

                <v-tabs
                    fixed-tabs
                    background-color="background"
                    dark
                    v-model="gameCardTab"
                    slider-color="transparent"
                    slider-size="1"
                >
                    <v-tab 
                        class="tab--title"
                        active-class="tab--title_active"
                        href="#gameInfo"
                    >
                        {{ $t( `Games.gameInformation` ) }}
                    </v-tab>

                    <v-tab 
                        class="tab--title"
                        active-class="tab--title_active"
                        href="#gameH2H"
                    >
                        {{ $t( `Games.h2h` ) }}
                    </v-tab>

                    <v-tab 
                        class="tab--title"
                        active-class="tab--title_active"
                        href="#gameTeamStats"
                    >
                        {{ $t( `Games.teamStats` ) }}
                    </v-tab>

                    <v-tab 
                        class="tab--title"
                        active-class="tab--title_active"
                        href="#gamePastMeetings"
                    >
                        {{ $t( `Games.pastMeetings` ) }}
                    </v-tab>

                    <v-tab 
                        class="tab--title"
                        active-class="tab--title_active"
                        href="#gameStandings"
                    >
                        {{ $t( `Games.standings` ) }}
                    </v-tab>

                </v-tabs>

                <v-tabs-items
                    v-model="gameCardTab"
                    dark
                    class="tabs--wrapper"
                >
                    <v-tab-item
                        style="background-color: transparent"
                        value="gameInfo"
                    >
                        <information-tab
                            :homeTeam="homeTeam"
                            :awayTeam="awayTeam"
                        ></information-tab>    
                    </v-tab-item>

                    <v-tab-item
                        style="background-color: transparent"
                        value="gameH2H"
                    >
                        <headtohead-tab
                            :homeTeam="homeTeam"
                            :awayTeam="awayTeam"
                        ></headtohead-tab>    
                    </v-tab-item>

                    <v-tab-item
                        style="background-color: transparent"
                        value="gameTeamStats"
                    >
                         <teamstats-tab></teamstats-tab> 
                    </v-tab-item>

                    <v-tab-item
                        style="background-color: transparent"
                        value="gamePastMeetings"
                    >
                        <pastmeetings-tab></pastmeetings-tab>   
                    </v-tab-item>
                    
                    <v-tab-item
                        style="background-color: transparent"
                        value="gameStandings"
                    >
                        <standings-tab
                            :homeTeam="homeTeam"
                            :awayTeam="awayTeam"
                        ></standings-tab>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col cols="12">
                <loading-state></loading-state>
            </v-col>
        </v-row>

        <tipping-notification></tipping-notification>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import GameHeader from "../components/Game/Header";

export default {
    name: "GameCard",

    data() {
        return {
            game_id:                    this.$route.params.gameID,
            gameCardTab:                "",
            loading:                    true,
        }
    },

    computed: {
        ...mapGetters({
            game: "game/fetchgame"
        }),

        homeTeam() {
            return {
                id:             this.game.lineup.home.id,
                name:           this.game.lineup.home.name,
                logo:           this.game.lineup.home.logo,
                goals:          this.game.lineup.home.goals,
                recent_form:    this.game.lineup.home.recent_form,
            }
        },

        awayTeam() {
            return {
                id:             this.game.lineup.away.id,
                name:           this.game.lineup.away.name,
                logo:           this.game.lineup.away.logo,
                goals:          this.game.lineup.away.goals,
                recent_form:    this.game.lineup.away.recent_form,
            }
        }
    },

    methods: {
        fetchAllGameData() {
            const payload = this.$route.params;
            this.$store.dispatch("game/gameInfo", payload);
            this.$store.dispatch("game/fetch_h2h", this.game_id);
        },

        ...mapMutations({
            resetGameCard: "game/resetGame"
        })
    },

    components: {
        GameHeader,
        informationTab:     () => import("./GameCard/InformationTab"),
        headtoheadTab:      () => import("./GameCard/HeadToHeadTab"),
        teamstatsTab:       () => import("./GameCard/TeamStatsTab"),
        pastmeetingsTab:    () => import("./GameCard/PastMeetingsTab"),
        standingsTab:       () => import("./GameCard/StandingsTab"),
        LoadingState:       () => import("../components/General/Notifications/LoadingState.vue"),
        TippingNotification:() => import("../components/General/Notifications/TippingNotification.vue")
    },

    created() {
        this.fetchAllGameData();
    },

    beforeDestroy() {
        this.resetGameCard();
        this.$off("resetDialog");
    }
}
</script>

<style lang="scss" scoped>

</style>