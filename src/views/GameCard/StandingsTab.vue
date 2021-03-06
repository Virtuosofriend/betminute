<template>
    <v-row>
        <v-col
            cols="12"
        >
            <div class="card__box">
                <h3 class="card__box-title text-center">
                    {{ $t( `Games.standings` ) }}

                    <dropdown-selection
                        class="mt-2 pr-3"
                        :defaultValue="selection"
                        @changeDefaultValue="selection = $event; changeSelection()"
                    ></dropdown-selection>
                </h3>

                <v-data-table
                    :headers="tableHeaders"
                    :items="active"
                    :items-per-page="50"
                    hide-default-footer
                    class="elevation-0 custom__table ma-3"
                    :item-class="itemRowBackground"
                    :loading="loading"
                >
                    <template
                        v-slot:item.logo="{ item }"
                    >
                        <div class="team"> 
                            <img 
                                :src="item.logo.logo"
                                class="team__logo">
                            <p class="mb-0">{{ item.logo.team }}</p>
                        </div>
                    </template>

                    <template
                        v-slot:item.recent_form="{ item }"
                    >
                        <team-form
							:form="item.recent_form"
                            v-if="item.recent_form"
						></team-form>
                    </template>

                </v-data-table>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import api from "../../commons/api.service";
import { mapGetters } from "vuex";

export default {
    name:   "Standings__tab",

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
            game_id:    this.$route.params.gameID,
            standings:  [],
            active:     [],
            loading:    true,
            selection:  "sum"
        }
    },

    computed: {
        ...mapGetters({
            game: "feed/LiveUpcomingUnfiltered"
        }),

        tableHeaders() {
            if ( this.active.length > 0 ) {

                return Object.keys(this.active[0]).map(elem => {
                    return {
                        text:   this.$i18n.t( `Games.standingsTab.${elem}` ),
                        value:  elem
                    }
                });
            }

            return [];
        }
    },

    methods: {
        retrieveGameInformation() {
            this.game.forEach( elem => {
                if ( elem.id == this.game_id ) {
                    return this.fetchData(elem.league_id, elem.season_id, elem.stage_id, elem.group_id, elem.round_id);
                }
            });
        },


        fetchData(league_id, season_id, stage_id, group_id, round_id) {
            api.bet_minute().get(`FetchBetMinNode.php?league_id=${ league_id }&stage_id=${ stage_id }&season_id=${ season_id }&group_id=${ group_id }&round_id=${ round_id }`)
                .then( res => {
                    this.standings = res.data;
                    this.changeSelection();
                    this.loading = false;
                }).catch( e => {
                    console.log(e.response)
                });
        },

        changeSelection() {
            this.active = this.standings.map( item => {

                let obj = {
                    position:           item.position,
                    logo:               {
                                            logo:       item.logo,
                                            team:       item.name,
                                            team_id:    item.team_id
                                        },
                    result:             item.result
                };

                    
                    if ( this.selection == "sum" ) {
                        return {
                            ...obj,
                            games_played:       item.games_played,
                            won:                item.won,
                            draw:               item.draw,
                            lost:               item.lost,
                            goals_scored:       item.goals_scored,
                            goals_against:      item.goals_against,
                            goal_difference:    item.goal_difference,
                            points:             item.points,
                            recent_form:        item.recent_form
                        }
                    }

                    
                    if ( this.selection == "home" ) {
                        return {
                            ...obj,
                            games_played:       item.games_played_home,
                            won:                item.won_home,
                            draw:               item.draw_home,
                            lost:               item.lost_home,
                            goals_scored:       item.goals_scored_home,
                            goals_against:      item.goals_against_home,
                            goal_difference:    item.goals_scored_home - item.goals_against_home,
                            points:             item.won_home * 3 + item.draw_home * 1
                        }
                    }

                    
                    if ( this.selection == "away" ) {
                        return {
                            ...obj,
                            games_played:       item.games_played_away,
                            won:                item.won_away,
                            draw:               item.draw_away,
                            lost:               item.lost_away,
                            goals_scored:       item.goals_scored_away,
                            goals_against:      item.goals_against_away,
                            goal_difference:    item.goals_scored_away - item.goals_against_away,
                            points:             item.won_away * 3 + item.draw_away * 1
                        }
                    }
                });
        },

        itemRowBackground(item) {
            return ( item.logo.team_id == this.homeTeam.id || item.logo.team_id == this.awayTeam.id ) ? "active" : ""
        }
    },

    components: {
        teamForm:           () => import("../../components/General/TeamFormGraphic"),
        dropdownSelection:  () => import("../../components/General/HomeAwayOverallDropdown"),
    },

    created() {
        this.retrieveGameInformation()
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
    width: 32px;
    margin-right: 4px;
}
</style>