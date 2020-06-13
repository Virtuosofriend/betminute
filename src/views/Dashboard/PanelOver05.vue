<template>
    <div>
        <h4 class="subtitle">Over 0.5</h4>
        <v-tabs
                fixed-tabs
                background-color="background"
                dark
                v-model="tabOver05"
                slider-color="#2c343a"
                slider-size="1"
              >
                <v-tab 
                  class="tab--title"
                  
                >
                  Over 0.5 HT 
                    <small v-if="listOver05ht.open != null">total: {{ listOver05ht.open.length }}</small>
                    <small v-if="listOver05ht.open == null">0 games</small>
                </v-tab>
                <v-tab 
                  class="tab--title"
                  :disabled="listOver05sec.open == null"
                >
                  Over 0.5 Next Half 
                    <small v-if="listOver05sec.open != null">total: {{ listOver05sec.open.length }}</small>
                    <small v-if="listOver05sec.open == null">0 games</small>
                </v-tab>
              </v-tabs>
              <v-tabs-items
                v-model="tabOver05"
                dark
                class="tabs--wrapper"
              >
                <v-tab-item
                  style="background-color: transparent"
                  v-if="listOver05ht.open != null || listOver05ht.open.length > 0"
                >
                  <!-- Card component -->
                  <div 
                    class="card--box"
                    v-for="(game,index) in listOver05ht.open.slice(0, 5)"
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
                </v-tab-item>

                <!-- No games -->
                <v-tab-item
                  style="background-color: transparent"
                  v-if="listOver05ht.open == null"
                >
                  <div 
                    class=""
                  >
                    <p class="text-center white--text" style="font-size: 12px">No games currently</p>
                  </div>
                </v-tab-item>
                <!-- ./No games -->
                <v-tab-item
                  style="background-color: transparent"
                  v-if="listOver05sec.open != null"
                >
                  
                  <div 
                    class="card--box"
                    v-for="(game,index) in listOver05sec.open.slice(0, 5)"
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
                
                </v-tab-item>
              </v-tabs-items>
    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    name: 'listsOver0.5',
    computed: {
        ...mapGetters({
            user:          'user/information',
            listOver05ht:  'feed/listsOver0_5ht',
            listOver05sec: 'feed/listsOver0_5secondhalf'
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
}
</script>

<style scoped>

.tabs--wrapper {
  margin-top: 2em;
  background-color: var(--theme-dark-60);
}

.tab--title small{
  padding-left: .8em;
  color:#495059;
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