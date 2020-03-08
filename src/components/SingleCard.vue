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
                v-if="games.event_goal"
            >
                    <img 
                        src="../assets/livescore/ball.png" 
                        class="event-icon" 
                    >
                </div>

                <div 
                    class="events-wrapper"
                    v-if="games.event_corner"
                >
                    <img 
                        src="../assets/livescore/corner.png" 
                        class="event-icon" 
                    >
                </div>

                <div 
                    class="events-wrapper"
                    v-if="games.yellowcard != null"
                >
                    <img 
                        src="../assets/livescore/yellowcard.png" 
                        class="event-icon"                        
                    >
                </div>
                
                <div 
                    class="events-wrapper"
                    v-if="games.redcard != null"
                >
                    <img 
                        src="../assets/livescore/redcard.png" 
                        class="event-icon" 
                    >
                </div>

                <div 
                    class="events-wrapper"
                    v-if="games.event_missed_penalty"
                >
                    <img 
                        src="../assets/livescore/missed_penalty.png" 
                        class="event-icon"  
                    >
                </div>

                <div
                    class="events-wrapper"
                    v-if="games.wait_goal"
                >
                    <img 
                        src="../assets/livescore/wait_goal.png" 
                        class="event-icon"  
                    >
                </div>
                
                <div 
                    class="events-wrapper"
                    v-if="games.match_mobility != null && games.match_mobility != 0"
                > 
                    <img 
                        :src="images[`image${games.match_mobility}`]" 
                        class="event-icon" 
                    >
                </div>

                <div 
                    class="events-wrapper"
                    v-if="games.hot30 != null && games.hot30"
                >
                    <img 
                        src="../assets/livescore/hot30.png" 
                        class="event-icon" 
                    >
                </div>

                <div 
                    class="events-wrapper"
                    v-if="games.hot70 != null && games.hot70"
                >
                    <img 
                        src="../assets/livescore/hot70.png" 
                        class="event-icon"
                    >
                </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import image1 from '../assets/livescore/number_1.png';
import image2 from '../assets/livescore/number_2.png';
import image3 from '../assets/livescore/number_3.png';

export default {
    name: "singleCard",
    props: {
        games: {
            type: Object
        }
    },

    data() {
        return {
            images: {
                image1,
                image2,
                image3
            },
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
  margin-right: 5em;
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

.event-icon {
    opacity: .5;
    width: 12px;
    object-fit: cover;
    height: 12px;
    margin: .3em;
}
</style>