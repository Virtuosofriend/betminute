<template>
     <v-lazy
        v-model="isActive"
        :options="{
            threshold: .5
        }"
        transition="fade-transition"
        class="card--content"
    >
        <div 
            class="card--content cursor"
        >
            <div 
                class="game--starts"
            >
                <p 
                    class="game--starts-date"
                >
                    {{ startingAt | properStartingTime }}
                </p>
                <p 
                    class="game--starts-status"
                >
                    <span 
                        v-if="gameStatus == 'FT'"
                    > 
                        {{ $t( `Games.finished` ) }}
                    </span>
                    <span 
                        v-if="gameStatus == 'LIVE' || gameStatus == 'HT'"
                    >
                        {{ $t( `Games.live` ) }}
                    </span>
                    <span 
                        v-if="gameStatus == 'NS'"
                    >
                        {{ $t( `Games.starts` ) }} {{ displaytime(startingAt) }}
                    </span>
                </p>
            </div>
            <div 
                class="w-100"
            >
                <h5 
                    class="team-names"
                >
                    {{ homeTeam }}
                        <span> {{ homePos }} </span>
                </h5>
            </div>
            <div 
                class="game--score w-100"
            >
                <v-tooltip 
                    bottom
                    color="sidebar"
                >
                    <template v-slot:activator="{ on }">
                        <v-progress-circular
                            :rotate="minuteBar.rotate"
                            :size="minuteBar.size"
                            :width="minuteBar.width"
                            :value="minute || 0"
                            color="#a72693"
                            v-on="on"
                        >
                            <p>
                                {{ homeScore }}
                                :
                                {{ awayScore }}

                                <small 
                                    class="extra-time"
                                    v-if="addedTime > 0 && addedTime <= 10"
                                >
                                    {{ `+${ addedTime }'` }}
                                </small>
                            </p>
                        </v-progress-circular>
                    </template>

                    <span
                        class="tooltip--message"
                    >
                        {{ $t( `Games.minute` ) }}: {{ minute }}'
                    </span>
                </v-tooltip>
                
            </div>
            <div 
                class="w-100"
            >
                <h5 class="team-names">
                    {{ awayTeam }}
                        <span> {{ awayPos }} </span>
                </h5>
            </div>
            <div 
                class="events-box"
            >
                <v-chip 
                    label
                    small
                    color="warning"
                    v-if="matchTips"
                >
                    <v-icon
                        color="secondary"
                        x-small
                        class="mr-2"
                    >
                        far fa-lightbulb
                    </v-icon>
                    <span class="secondary--text">Tips</span>
                </v-chip>
                
            </div>
        </div>
     </v-lazy>
</template>

<script>
import moment from 'moment';

export default {
    name: "singleCard",

    props: {
        addedTime: {
            required:   true
        },
        awayScore: {
            required:   true,
            type:       Number
        },
        awayPos: {
            required:   true,
        },
        awayTeam: {
            required:   true,
            type:       String
        },
        gameStatus: {
            required:   true,
            type:       String
        },
        homeScore: {
            required:   true,
            type:       Number
        },
        homeTeam: {
            required:   true,
            type:       String
        },
        homePos: {
            required:   true,
        },
        matchTips: {
            required:   false,
            type:       Boolean
        },
        startingAt: {
            required:   true,
            type:       String
        },

        minute: {
            required:   true,
            type:       Number
        }
    },

    data() {
        return {
            isActive:   false,
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

    components: {
        tooltip: () => import("./General/Tooltip")
    },

    filters: {
        properStartingTime(value) {
            let offset =  moment().utcOffset();
            let date = moment(value).add(offset, "minutes");
            return date.format("HH:mm");
        }
    }
}
</script>

<style scoped>
.game--starts {
    font-size: 12px;
    width: 25em;
}

.game--starts .game--starts-date {
    color: var(--v-primary-base);
    margin-bottom: 0;
}
.game--starts .game--starts-status {
    color: var(--v-dark_subtitle-base);
    margin-bottom: 0;
}

.team-names {
    font-weight: 600;
    display: flex;
    justify-content: center;
}

.team-names span {
    color: var(--v-dark_subtitle-base);
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
    color: var(--v-primary-base);
    font-size: 12px;
    margin-bottom: 0;
    line-height: 1;
}

.extra-time {
    color: var(--v-primary-base);
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
    padding: .2em;
    display: flex;
    justify-content: center;
    margin: auto .5em;
    border: 1px solid #394047;
}

.tooltip--message {
    font-size: 12px;
}
</style>