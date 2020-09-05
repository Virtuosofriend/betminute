<template>
    <v-bottom-sheet 
        v-model="sheet" 
        inset
        color="secondary"
        max-width="600px"
        persistent
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                color="sidebar"
                block
                class="white--text letter-spacing-initial text-transform-initial"
                :disabled="oddsState == 'close' ? true : false"
                v-bind="attrs"
                v-on="on"
            >
                {{ oddsText }}
                <v-icon 
                    v-if="oddsState == 'close'"
                    x-small
                    class="odds_number"
                    color="error"
                >
                    fas fa-lock
                </v-icon>

                <span 
                    class="odds_number"
                    v-if="oddsState == 'open'"
                >
                    {{ oddsValue }}
                </span>
            </v-btn>
        </template>

        <v-sheet
            height="240px"
            color="sidebar"
            class="betslip"
        >
            <div class="betslip__title">
                <h3 class="card__box-title">
                    Bet Slip
                </h3>

                <v-btn
                    text
                    x-small
                    icon
                    color="error"
                    @click="sheet = !sheet"
                    style="margin-left: auto"
                 >
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
            </div>
            
            <div class="card__box">
                
                <div class="card__box-info">
                    <h5 
                        class="betslip__teams"
                    >
                        {{ game.lineup.home.name }} - {{ game.lineup.away.name }}
                        <span class="betslip__market">
                            {{ oddsSubGroup }} / {{ oddsText }}
                        </span>
                    </h5>
                    
                </div>

                <div class="card__box-market">
                    <h3 
                        class="betslip__market"
                    >
                        {{ oddsValue }}
                    </h3>
                </div>

                <div class="card__box-units">
                    <v-text-field
                        label="Units"
                        solo
                        flat
                        dense
                        hide-details
                        color="primary"
                        background-color="info"
                        width="50"
                        v-model.number="slip_units"
                        dark
                    >
                        <template v-slot:label>
                            <small style="opacity: .6">
                                Units
                            </small>
                        </template>
                    </v-text-field>
                </div>
            </div>

            <div class="card__box-submit">
                <v-btn
                    block
                    color="transparent"
                    depressed
                    :disabled="$v.$invalid"
                    @click="sendTip()"
                >
                    Send tip
                </v-btn>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import { required, integer } from 'vuelidate/lib/validators'

export default {
    name:   "Odds__button",

    props: {
        oddsId: {
            required:   true,
            type:       Number
        },
        oddsGroup: {
            required:   true,
            type:       String
        },
        oddsSubGroup: {
            required:   true,
            type:       String
        },
        oddsState: {
            required:   true,
            type:       String,
            default:    "open"
        },
        oddsText: {
            required:   true,
            type:       String
        },
        oddsValue: {
            required:   true,
            type:       Number
        },
    },

    validations: {
        slip_units: {
            required,
            integer
        }
    },

    data() {
        return {
            sheet:      false,
            slip_units: undefined
        }
    },

    computed: {
        ...mapGetters({
            game:   "game/fetchgame"
        })
    },


    methods: {
        sendTip() {
            const fixture_id = +this.$route.params.gameID;
            const tip_body = {
                fixture_id,
                bm_market_id: this.oddsId,
                slip_units: this.slip_units,
                battle_id:  -1
            };

            this.$store.dispatch("game/sendGameTip", tip_body)
                .then( () => {
                    return  setTimeout(() => {
                        this.sheet = !this.sheet;
                    }, 1000);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.odds_number {
    display: inline-block;
    margin-left: auto;
}

.betslip {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.betslip__title {
    display: flex;
    align-self: flex-start;
    justify-content: center;
    width: 100%;
    padding: .6rem 2rem;
    margin: 1rem auto;
}
.card__box {
    width: 90%;
    background-color: var(--theme-dark-10);
    border-radius: 15px;
    margin: 1rem auto 0rem auto;
    padding: .6rem auto;
    min-height: 50px;
    display: flex;
    align-items: center;
}

.card__box-submit {
    width: 90%;
    background-color: var(--v-success-base);
    border-radius: 4px;
    margin: .6rem auto 1rem auto;
    min-height: 20px;
    display: flex;
    align-items: center;
}

.card__box-title {
    font-weight: 600;
    text-transform: initial;
}

.betslip__teams {
    font-weight: 400;
    padding: .6rem 1rem;
    text-transform: initial;
}

.betslip__market {
    text-transform: initial;
    font-weight: 500;
}

.betslip__market {
    display: block;
    opacity: .6;
}

.card__box-info {
    flex: 0 1 40%;
}

.card__box-market {
    flex: 0 1 30%;
    padding-right: 1rem;
    text-align: right;
}

.card__box-units {
    flex: 0 1 30%;
    padding-right: 1rem;
}
</style>