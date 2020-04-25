<template>
    <div class="card--content">
        <div class="game--starts">
            <p class="game--starts-date">
                {{ games.starting_at | properStartingTime }}
             </p>
            <p class="game--starts-status">
                <span 
                    v-if="games.status == 'FT'"
                > 
                    Finished
                </span>
                <span 
                    v-if="games.status == 'LIVE' || games.status == 'HT'"
                >
                    Live now
                </span>
                <span 
                    v-if="games.status == 'NS'"
                >
                    Starts {{ displaytime(games.starting_at) }}
                </span>
            </p>
        </div>
        <div class="w-100">
            <h5 class="team-names">
                {{ games.home_team }}
                    <span> {{ games.local_pos }} </span>
            </h5>
        </div>
        <div class="game--score w-100">
            <v-progress-circular
                :rotate="minuteBar.rotate"
                :size="minuteBar.size"
                :width="minuteBar.width"
                :value="games.minute || 0"
                color="#a72693"
            >
                <p>
                    {{ games.local_scr }}
                    :
                    {{ games.visit_scr }}

                    <small 
                        class="extra-time"
                        v-if="games.added_time > 0 && games.added_time <= 10"
                    >
                        {{ `+${games.added_time}'` }}
                    </small>
                </p>
            </v-progress-circular>
        </div>
        <div class="w-100">
            <h5 class="team-names">
                {{ games.away_team }}
                    <span> {{ games.visitor_pos }} </span>
            </h5>
        </div>
        <div class="events-box">
            <div 
                class="events-wrapper"
                v-for="(value, key , index) in events"
                :key="index"
                v-show="value.status"
            >        
                <tooltip
                    :image="events[key].image"
                    :tooltip="events[key].tooltip"
                >
                </tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import image1 from '../assets/livescore/number_1.png';
import image2 from '../assets/livescore/number_2.png';
import image3 from '../assets/livescore/number_3.png';
import hot70 from '../assets/livescore/hot70.png';
import hot30 from '../assets/livescore/hot30.png';
import wait_goal from '../assets/livescore/wait_goal.png';
import event_missed_penalty from '../assets/livescore/event_missed_penalty.png';
import redcard from '../assets/livescore/redcard.png';
import yellowcard from '../assets/livescore/yellowcard.png';
import event_corner from '../assets/livescore/event_corner.png';
import event_goal from '../assets/livescore/event_goal.png';

import tooltip from './General/Tooltip';

export default {
    name: "singleCard",

    components: {
        tooltip
    },

    props: {
        games: {
            type: Object
        }
    },

    data() {
        return {
            minuteBar: {
              rotate: -90,
              size: 50,
              width: 4
            },
            events: {
                image1: {
                    image:      image1,
                    tooltip:    "Testing tooltip",
                    status:     (this.games.match_mobility != null && this.games.match_mobility != 0) ? this.games.match_mobility : false
                },
                image2: {
                    image:      image2,
                    tooltip:    "Testing tooltip",
                    status:     (this.games.match_mobility != null && this.games.match_mobility != 0) ? this.games.match_mobility : false
                },
                image3: {
                    image:      image3,
                    tooltip:    "Testing tooltip",
                    status:     (this.games.match_mobility != null && this.games.match_mobility != 0) ? this.games.match_mobility : false
                },
                hot70: {
                    image:      hot70,
                    tooltip:    "Testing tooltip",
                    status:     (this.games.hot70 != null && this.games.hot70) ? true : false
                },
                hot30: {
                    image:      hot30,
                    tooltip:    "Testing tooltip",
                    status:     (this.games.hot30 != null && this.games.hot30) ? true : false
                },
                wait_goal: {
                    image:      wait_goal,
                    tooltip:    "Testing tooltip",
                    status:     this.games.wait_goal
                },
                event_missed_penalty: {
                    image:      event_missed_penalty,
                    tooltip:    "Testing tooltip",
                    status:     this.games.event_missed_penalty
                },
                redcard: {
                    image:      redcard,
                    tooltip:    "Testing tooltip",
                    status:     this.games.redcard
                },
                yellowcard: {
                    image:      yellowcard,
                    tooltip:    "Testing tooltip",
                    status:     this.games.yellowcard
                },
                event_corner: {
                    image:      event_corner,
                    tooltip:    "Testing tooltip",
                    status:     this.games.event_corner
                },
                event_goal: {
                    image:      event_goal,
                    tooltip:    "Testing tooltip",
                    status:     this.games.event_goal
                }
            },

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
        console.log(this.games);
        
    }
}
</script>

<style scoped>
.w-100 {
    width: 100%;
}
.game--starts {
  font-size: 12px;
  width: 25em;
}

.game--starts .game--starts-date {
  color: var(--theme-dark-30);
  margin-bottom: 0;
}
.game--starts .game--starts-status {
  color: var(--theme-dark-subtitle);
  margin-bottom: 0;
}

.team-names {
    font-weight: 600;
    display: flex;
    justify-content: center;
}

.team-names span {
    color: var(--theme-dark-subtitle);
    font-weight: 400;
    font-size: 10px;
    margin-left: .3em;
}
.game--score {
  width: 50px;
  margin: 0 auto;
  background-color:#38424b;
  border-radius: 50%;
}
.game--score p {
  color: var(--theme-dark-30);
  font-size: 12px;
  margin-bottom: 0;
  line-height: 1;
}

.extra-time {
    color: var(--theme-dark-30);
    display: block;
    text-align: center;
    padding-top: .2em;
}
.events-box {
   width: 25em;
   display: flex;
}

.events-wrapper {
    border-radius: 10px;
    background-color: #38424b;
    padding: .5em;
    display: flex;
    justify-content: center;
    margin: auto .5em;
    border: 1px solid #394047;
}
</style>