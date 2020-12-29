<template>
    <div>
        <div 
            class="feed--box"
            v-for="(country,index) in data"
            :key="index"
        >
            <div 
                class="feed--box-league"
                v-for="(league, index) in country.league_matches"
                :key="index"
            >   
                <div
                    class="feed--box-header"
                >
                    <div class="country">
                        <div>
                            <span
                                :class="`flag flag-fifa-${ country.code.toLowerCase().slice(0,3) }`"
                            ></span>
                            <p class="country-name">
                                {{ country.country }}
                            </p> 
                        </div>
                        <div>

                            <p class="league-name">
                                {{ league.league_name }}
                            </p>
                        </div>
                    </div>
                </div>

                <div 
                    class="card--box"
                    v-for="(match, index) in league.match_data"
                    :key="index"
                >
                    <singleCard 
                        :games="match">
                    </singleCard>
                </div>
            </div>
        </div>
    </div>
                
</template>

<script>

export default {
    name: "Livescore",

    props: {
        data: {
            type:       Array,
            required:   true
        }
    },

    components: {
        singleCard: () => import("../SingleCard")
    }
}
</script>