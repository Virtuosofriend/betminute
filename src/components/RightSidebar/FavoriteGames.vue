<template>
    <div>
        <h4 class="text-transform-initial mb-3">
            {{ $t( `FavoriteGames.title` ) }}
        </h4>
    
        <v-row no-gutters v-if="feed.length > 0">
            <v-col 
                cols="12"
                v-for="(game, index) in feed"
                :key="index"
                @click="goToGame(game.id, game.status)"
            >
                <div class="game">

                    <favorite-game-card
                        :addedTime="game.added_time"
                        :gameStatus="game.status"
                        :homeTeam="game.home_team"
                        :awayTeam="game.away_team"
                        :homePos="game.local_pos"
                        :awayPos="game.visitor_pos"
                        :homeScore="game.local_scr"
                        :awayScore="game.visit_scr"
                        :startingAt="game.starting_at"
                        :minute="game.minute"
                    ></favorite-game-card>

                    <div class="game__unfavorite">
                        <add-to-favorites-btn
                            :gameID="game.id"
                        >
                            <template #icon>
                                <v-icon
                                    x-small
                                    color="error lighten-2"
                                >
                                    fas fa-minus-circle
                                </v-icon>
                            </template>
                        </add-to-favorites-btn>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col>
            	<no-data
			     	class="text-center"
                	:data-text="`${ $t('General.noFavGames')}`"
               	></no-data>

               	<v-btn
			   		color="accent"
					small
					depressed
					class="button__gotofeed box__center"
					@click="goToFeed()"
				>
					{{ $t( `FavoriteGames.addOne` )}}
			   </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddToFavoritesBtn from "../MyFeed/AddToFavoritesBtn.vue";
import FavoriteGameCard from "./FavoriteGameCard.vue";

export default {
    name: "Favorite__games",

    computed: {
        ...mapGetters({
            feed:   "feed/favoriteFeed"
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
		},
		
		goToFeed() {
			this.$router.push({
				name:	"feed"
			});
		}
    },

    components: { 
        AddToFavoritesBtn, 
        FavoriteGameCard,
        noData: () => import("../General/NoData/GenericNoData")
    }
}
</script>

<style lang="scss" scoped>
.game {
    display: flex;
    margin: 4px auto 4px auto;
    background-color: var(--v-accent-base);
    border-radius: 6px;
    cursor: pointer;
}

.game__unfavorite {
    align-self: flex-end;
}

.box__center {
	display: block;
	margin: 12px auto;
}
.button__gotofeed {
	text-transform: initial;
	letter-spacing: 0;
}
</style>