<template>
    <v-container 
      fluid
    >
      <v-row>
        <v-col md="8">
          <div class="main--wrapper">
            <div class="daily--tip">
              
              <div class="daily--tip-wrapper">
                <div>
                  <h2>My Feed</h2>
                </div>
              </div>
            </div>
            <v-tabs
                fixed-tabs
                background-color="background"
                dark
                v-model="tabs"
                slider-color="#2c343a"
                slider-size="1"
              >
                <v-tab 
                  class="tab--title"
                  
                >
                  Live feed ({{ feedCalculated.length }})
                    
                </v-tab>
                <v-tab 
                  class="tab--title"
                >
                  Timeline
                </v-tab>
                <v-tab 
                  class="tab--title"
                >
                  Favorites
                </v-tab>
              </v-tabs>
              <v-tabs-items
                v-model="tabs"
                dark
                class="tabs--wrapper"
              >
                <v-tab-item
                  style="background-color: transparent"
                  class="scrollable"
                >
                <!-- <code>{{ feed }}</code> -->
                  <!-- Card component -->
                <div 
                    class="feed--box"
                    v-for="(country,index) in feedCalculated"
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
                            <singleCard v-bind:games="match"></singleCard>
                        </div>
                    </div>
                </div>
                <!-- ./Card Componenet -->
                </v-tab-item>

                
              </v-tabs-items>
          </div>
        </v-col>

        <v-col md="4">
          <topTipsters></topTipsters>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import topTipsters from '../views/Dashboard/PanelTopTipsters.vue';
import singleCard from '../components/SingleCard';

export default {
  name: 'myfeed',
  components: {
      topTipsters,
      singleCard
  },
  computed: {
    ...mapGetters({
        feed: "myFeed/livescore",
        tobestarted: "myFeed/notStarted"
    }),

    feedCalculated() {      
      return this.feed.concat(this.tobestarted);
    }
  },
  data() {
        return {
            tabs: null,
        }
    },

  
  mounted() {    
      this.$store.dispatch("myFeed/fetchLivescore");
  }
}
</script>

<style scoped>
.daily--tip {
  background: url("../assets/dashboard/dailytip.jpg") no-repeat 50% 30%;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 350px;
  border-radius: 15px;
}

.daily--tip .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 0;
}

.daily--tip-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em;
  position: relative;
}

.daily--tip-wrapper h2 {
  font-weight: 400;
}

.scrollable {
  max-height: 960px;
  overflow-y: scroll;
  scrollbar-color: var(--theme-dark-border) var(--theme-dark-60);
  scrollbar-width: none;
}

.feed--box {
    margin: 2em auto;
}

.feed--box-league {
    padding: 1em auto;
}

.feed--box-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
}

.feed--box-header div {
    width: 100%;
}

.country {
    margin-left: 2em;
}
.feed--box-header p {
    margin-bottom: 0;
    display: inline-flex;
    font-size: 13px;
}

p.country-name {
    color: var(--theme-dark-subtitle);
    margin-left: 1em;
}

p.league-name {
    color: var(--theme-dark-30);
}
</style>