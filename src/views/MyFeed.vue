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

            <!-- Card component -->
                  <div 
                    class="card--box"
                    v-for="(game,index) in feed"
                    :key="index"
                  >
                  <div class="card--content">
                    <div class="game--starts">
                      <p class="game--starts-date">
                        {{ game.starting_at | properStartingTime }}
                      </p>
                      <p class="game--starts-status">
                        <span 
                          v-if="game.status == 'FT'"
                        > Finished</span>
                        <span 
                          v-if="game.status == 'LIVE' || game.status == 'HT'"
                        >
                          Live now
                        </span>
                        <span 
                          v-if="game.status == 'NS'"
                        >
                            Starts {{ displaytime(game.starting_at) }}
                        </span>
                      </p>
                    </div>
                    <div class="game--tipping">
                      <p class="game--tipping-result">
                        {{ game.result }}
                      </p>
                      <p class="game--tipping-status" v-if="game.odd">
                        {{ game.odd }}
                      </p>
                      <p class="game--tipping-status" v-else>
                        Open
                      </p>
                    </div>
                    <div>
                      <h5 class="team-names">{{ game.home }}</h5>
                    </div>
                    <div class="game--score">
                      <v-progress-circular
                        :rotate="minuteBar.rotate"
                        :size="minuteBar.size"
                        :width="minuteBar.width"
                        :value="game.minute"
                        color="#a72693"
                      >
                        <span>{{ game.home_score }}:{{ game.away_score }}</span>
                      </v-progress-circular>
                    </div>
                    <div>
                      <h5 class="team-names">{{ game.away }}</h5>
                    </div>
                    <div class="game--country">
                      <p class="game--country-cntry">
                        {{ game.country }}
                      </p>
                      <p class="game--country-league">
                        {{ game.league }}
                      </p>
                    </div>

                    </div>
                  </div>
                <!-- ./Card Componenet -->
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
import moment from 'moment';
import topTipsters from '../views/Dashboard/PanelTopTipsters.vue';

export default {
  name: 'myfeed',
  components: {
      topTipsters
  },
  computed: {
    ...mapGetters({
        feed: "myFeed/livescore"
    })
  },
  data() {
        return {
          tabOver05: null,
          minuteBar: {
              rotate: -90,
              size: 50,
              width: 4
          }
        }
    },
    methods: {
        displaytime(time) {
        let offset =  moment().utcOffset();
        let gametime = moment(time).add(offset, 'minutes');
        return moment(gametime).fromNow();
        }
    },
    filters: {
        properStartingTime(value) {
        let offset =  moment().utcOffset();
        let date = moment(value).add(offset, 'minutes');
        return date.format("HH:mm")
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

.game--starts,
.game--tipping,
.game--country {
  font-size: 12px;
}

.game--starts .game--starts-date {
  color: var(--theme-dark-30);
  margin-bottom: 0;
}
.game--starts .game--starts-status {
  color: var(--theme-dark-subtitle);
  margin-bottom: 0;
}

.game--tipping .game--tipping-result {
  color: var(--theme-dark-30);
  margin-bottom: 0;
  padding: .2em 0;
}

.game--tipping .game--tipping-status {
  margin-bottom: 0;
  color: var(--theme-dark-subtitle);
}

.game--country-cntry {
  margin-bottom: 0;
  color: var(--theme-dark-30);
}

.game--country-league {
  margin-bottom: 0;
  color: var(--theme-dark-subtitle);
}

.game--score {
  width: 50px;
  margin: 0 auto;
  background-color:#38424b;
  border-radius: 50%;
  margin-right: 5em;
}
.game--score span {
  color: var(--theme-dark-30);
  font-size: 12px;
}
</style>