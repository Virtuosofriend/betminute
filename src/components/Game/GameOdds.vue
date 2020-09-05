<template>
    <v-responsive
        class="overflow-y-auto"
        max-height="460"
    >
        <v-row>
            <v-col 
                cols="12"
                v-for="(odd,index) in odds"
                :key="index"
            >
                <h4 class="odds__title">
                    {{ odd.data[0].group }}
                </h4>
                
                <div 
                    class="odds"
                    v-for="(odds_results, index) in odd.data"
                    :key="index"
                >
                    <h5 class="odds__subgroup-title">
                        {{ odds_results.subgroups[0].subgroup }}
                    </h5>
                    
                    <div 
                        class="odds__subgroup"
                    >
                        
                        <div 
                            class="odds__subgroup-data"
                            v-for="(values, index) in odds_results.subgroups"
                            :key="index"
                        >
                            <odds-button
                                :oddsValue="values.data.odds[0].iw"
                                :oddsText="values.data.name"
                                :oddsId="values.data.id"
                                :oddsState="values.data.odds[0].state"
                                :oddsGroup="odd.data[0].group"
                                :oddsSubGroup="odds_results.subgroups[0].subgroup"
                            ></odds-button>
                        </div>
                    </div>
                    
                </div>

            </v-col>
        </v-row>
    </v-responsive>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name:   "Game__odds",

    computed: {
        ...mapGetters({
            odds: "game/fetchOdds"
        })
    },
    components: {
        oddsButton: () => import ("./GameOddsButton"),
    }
}
</script>

<style lang="scss" scoped>
.odds__title {
    font-weight: 600;
    text-transform: initial;
    padding: .2rem 1rem;
    margin: .2rem 0;
}

.odds {
    display: flex;
    flex-direction: column;
    padding: .6rem 1rem;
}

.odds__subgroup {
    display: flex;
    flex-direction: row;
}

.odds__subgroup-title {
    font-weight: 400;
    text-transform: initial;
    margin-bottom: .6rem;
}

.odds__subgroup-data {
    width: 100%;
    margin: auto .2rem;
}
</style>