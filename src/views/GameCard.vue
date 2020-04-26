<template>
    <v-container 
      fluid
    >
        <v-row>
            <v-col md="12">
                <Game-header
                    :dataLineup="game.lineup"
                    :dataHome="homeTeam"
                    :dataAway="awayTeam"
                ></Game-header>
                <code>
                    {{ game }}
                </code>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import GameHeader from '../components/Game/Header';

export default {
    name: "GameCard",

    components: {
        GameHeader
    },

    computed: {
        ...mapGetters({
            game: "game/fetchgame"
        }),

        homeTeam() {
            console.log(this.game);
            
            return {
                name:           this.game.lineup.home.name,
                logo:           this.game.lineup.home.logo,
                goals:          this.game.lineup.home.goals,
                recent_form:    this.game.lineup.home.recent_form,
            }
        },

        awayTeam() {
            return {
                name:           this.game.lineup.away.name,
                logo:           this.game.lineup.away.logo,
                goals:          this.game.lineup.away.goals,
                recent_form:    this.game.lineup.away.recent_form,
            }
        }
    },

    mounted() {
        let payload = this.$route.params;
        this.$store.dispatch("game/gameInfo", payload);
    }
}
</script>

<style scoped>

</style>