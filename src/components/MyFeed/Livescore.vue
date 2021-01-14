<template>
    <v-data-iterator
        :items="feed"
        :search="search"
        hide-default-footer
    >
        <template v-slot:header>
            <search-livescore
                @searchResult="search = $event"
            ></search-livescore>
        </template>
        <template v-slot:default="{ items }">
            <div 
                class="feed--box"
                v-for="(feed,index) in items"
                :key="index"
            >
                <div 
                    class="feed--box-league"
                >   
                    <div
                        class="feed--box-header"
                    >
                        <div class="country">
                            <div>
                                <span
                                    :class="`flag flag-fifa-${ feed.code.toLowerCase().slice(0,3) }`"
                                ></span>
                                <p class="country-name">
                                    {{ feed.country }}
                                </p> 
                            </div>
                            <div>

                                <p class="league-name">
                                    {{ feed.league_name }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div 
                        class="card--box cursor"
                        @click="goToGame(feed.id, feed.status)"
                    >
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
                        ></singleCard>
                    </div>
                </div>
            </div>
        </template>
    </v-data-iterator>             
</template>

<script>
import { mapGetters } from "vuex";
import SearchLivescore from "../../components/MyFeed/SearchLivescore.vue";

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
            search: "",
            feed:   []
        }
    },

    computed: {
        ...mapGetters({
            filteredItems:  "feed/filteredFeed"
        })
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
        }
    },

    mounted() {
        this.feed = this.gamesFeed;
    },

    components: {
        singleCard: () => import("../SingleCard"),
        SearchLivescore
    }
}
</script>

<style lang="scss" scoped>
.cursor {
    cursor: pointer;
}
</style>