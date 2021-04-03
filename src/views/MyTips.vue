<template>
    <v-container fluid>
        <v-row>
            <v-col md="12">
                <div class="main--wrapper">
                    <div class="daily--tip">
                        <div class="overlay__dark"></div>
                        <v-row 
                            no-gutters
                            align="center"
                            style="height: 350px; position:relative"
                        >
                            <v-col 
                                cols="12"
                                md="4"
                            >
                                <div class="box">
                                    <total-banka
                                        :units="tips.banka_info.balance"
                                    >
                                        <template v-slot:icon>
                                            <v-icon>
                                                fas fa-piggy-bank
                                            </v-icon>
                                        </template>
                                        
                                        <template v-slot:title>
                                            {{ $t( `Banka.total` ) }}
                                        </template>
                                    </total-banka>

                                    <total-banka
                                        :units="tips.banka_info.balance_daily"
                                    >
                                        <template v-slot:icon>
                                            <v-icon>
                                                fas fa-balance-scale
                                            </v-icon>
                                        </template>
                                        <template v-slot:title>
                                            {{ $t( `Banka.daily` ) }}
                                        </template>
                                    </total-banka>
                                </div>
                            </v-col>

                            <v-col
                                cols="12"
                                md="8"
                            >
                                <div class="box_horizontal">
                                    <summary-played-columns
                                        :lostData="tips.banka_info.sum_lost_units"
                                        :playedData="tips.banka_info.sum_played_units"
                                        :wonData="tips.banka_info.sum_won_units"
                                        typeOfData="units"
                                    >
                                        <template v-slot:title>
                                            {{ $t( `Banka.played_units` ) }}
                                        </template>
                                    </summary-played-columns>

                                    <summary-played-columns
                                        :lostData="tips.banka_info.sum_lost_tips"
                                        :playedData="tips.banka_info.sum_played_tips"
                                        :wonData="tips.banka_info.sum_won_tips"
                                        typeOfData="tips"
                                        class="ml-10"
                                    >
                                        <template v-slot:title>
                                            {{ $t( `Banka.played_tips` ) }}
                                        </template>
                                    </summary-played-columns>
                                </div>

                                <div class="mt-auto">
                                    <extra-tipster-info-bar
                                        :roi="tips.banka_info.roi"
                                        :data_yield="tips.banka_info.yield"
                                        :avgOdd="tips.banka_info.avg_odd"
                                    ></extra-tipster-info-bar>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <h2 class="main--title">
                        {{ $t( `Mytips.title` ) }}
                    </h2>

                    <div class="card__box">
                        <v-container>
                            <v-row>
                                <v-col v-if="tips.tips_info">
                                    <tipping-table
                                        :tableData="tips.tips_info"
                                    ></tipping-table>
                                </v-col>
                                <v-col v-else>
                                    <no-data
                                        class="pa-2 text-center"
                                        :data-text="`${ $t('General.noContent')}`"
                                    ></no-data>
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ExtraTipsterInfoBar from '../components/MyTips/ExtraTipsterInfoBar.vue';
import SummaryPlayedColumns from "../components/MyTips/SummaryPlayedColumns.vue";
import TippingTable from "../components/MyTips/TippingTable.vue";
import TotalBanka from "../components/MyTips/TotalBanka.vue";

export default {
    name:   "My__tips",

    computed: {
        ...mapGetters({
            tips:   "user/banka"
        })
    },
    
    components: { 
        TippingTable,
        TotalBanka,
        SummaryPlayedColumns,
        ExtraTipsterInfoBar,
        noData:         () => import("../components/General/NoData/GenericNoData"),
    },

   
    mounted() {
        this.$store.dispatch("user/fetchUserBank");
    }
}
</script>

<style lang="scss" scoped>
.overlay__dark {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,.5);
}
.daily--tip {
    background: url("../assets/dashboard/mytips.jpg") no-repeat 50% 30%;
    position: relative;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.box_horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>