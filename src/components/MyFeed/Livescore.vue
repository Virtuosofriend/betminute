<template>
    <!-- Card component -->
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
                        <span
                            :class="`flag flag-fifa-${ country.code.toLowerCase().slice(0,3) }`"
                        ></span>
                        <p class="country-name">
                            {{ country.country }}
                        </p> 
                    </div>

                    <div class="league">
                        <p
                            class="league-name"
                        >
                            {{ league.league_name }}
                        </p>
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
    <!-- ./Card Componenet -->
    </div>
                
</template>

<script>
import singleCard from '../SingleCard';

export default {
    name: "Livescore",

    components: {
        singleCard
    },

    props: {
        data: {
            type: Array
        }
    }
}
</script>

<style scoped>

</style>