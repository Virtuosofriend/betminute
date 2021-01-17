<template>
    <v-data-iterator
        :items="gamesFeed"
        :search="search"
        :items-per-page="default_items"
        :hide-default-footer="gamesFeed.length == 0 || gamesFeed.length < default_items"
        class="custom__iterator"
        :footer-props="footer"
    >
        <template #header>
            <div class="d-flex">
                <search-livescore
                    @searchResult="search = $event"
                    class="w-100 mr-2"
                ></search-livescore>
                <filters-livescore></filters-livescore>
            </div>
        </template>

        <template #no-results>
            <table-no-data-search></table-no-data-search>
        </template>

        <template #no-data>
            <table-no-data></table-no-data>
        </template>

        <template #default="{ items }">
            <div 
                class="feed--box"
                v-for="(feed,index) in items"
                :key="index"
            >
                <div 
                    class="card--box cursor"
                    @click="goToGame(feed.id, feed.status)"
                >
                    <div class="country">
                        <div>
                            <p class="country-name">
                                <span
                                    :class="`flag flag-fifa-${ feed.code.toLowerCase().slice(0,3) }`"
                                ></span>
                                {{ feed.country }}
                            </p> 
                        </div>
                        <div>
                            <p class="league-name">
                                {{ feed.league_name }}
                            </p>
                        </div>
                    </div>

                    <singleCard
                        :addedTime="feed.added_time"
                        :gameStatus="feed.status"
                        :homeTeam="feed.home_team"
                        :awayTeam="feed.away_team"
                        :homePos="feed.local_pos"
                        :awayPos="feed.visitor_pos"
                        :homeScore="feed.local_scr"
                        :awayScore="feed.visit_scr"
                        :startingAt="feed.starting_at"
                        :minute="feed.minute"
                        :matchTips="feed.match_has_tips"
                    ></singleCard>

                    <div class="ml-auto card--box_favorite">
                        <add-to-favorites-btn
                            :gameID="feed.id"
                        >
                            <template #icon>
                                <v-icon
                                    x-small
                                    color="warning darken-2"
                                    v-if="!feed.favorite"
                                >
                                    far fa-heart
                                </v-icon>
                                <v-icon
                                    x-small
                                    color="error lighten-2"
                                    v-else
                                >
                                    fas fa-minus-circle
                                </v-icon>
                            </template>
                        </add-to-favorites-btn>
                    </div>
                </div>
            </div>
        </template>
    </v-data-iterator>             
</template>

<script>
import { mapGetters } from "vuex";
import { CONFIG } from "../../commons/config";

import SearchLivescore from "./SearchLivescore.vue";
import TableNoDataSearch from "../General/NoData/TableNoDataSearch.vue";
import FiltersLivescore from "./FiltersLivescore.vue";
import TableNoData from "../General/NoData/TableNoData.vue";
import AddToFavoritesBtn from "./AddToFavoritesBtn.vue";

export default {
    name: "Livescore",

    props: {
        gamesFeed: {
            type:       Array,
            required:   true
        }
    },

    data() {
        return {
            search:         "",
            default_items: CONFIG.default_items_in_feed,
            footer: {
                "disable-items-per-page":   true,
                "items-per-page-options":   [this.default_items]
            }
        }
    },

    methods: {
        goToGame(id, status) {
            this.$router.push({ 
                name: "gameCard",
                params: {
                    status: status,
                    gameID: id
                }
            });
        },
    },

    beforeDestroy() {
        this.$off("searchResult")
    },

    components: {
        AddToFavoritesBtn,
        FiltersLivescore,
        singleCard: () => import("../SingleCard"),
        SearchLivescore,
        TableNoDataSearch,
        TableNoData,
    }
}
</script>

<style lang="scss" scoped>
.card--box_favorite {
    align-self: flex-end;
}
.cursor {
    cursor: pointer;
}

.country {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 16px;
    width: 200px;
}
p.country-name {
    color: var(--v-accent-lighten3);
    margin-bottom: 0;
    font-size: 12px;
}

.country-name span {
    display: inline-block;
    margin-right: 3px;
}
p.league-name {
    color: var(--v-primary-base);
    font-weight: 600;
    font-size: 12px;
    margin-bottom: auto;
}
</style>