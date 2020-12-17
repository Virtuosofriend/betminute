<template>
    <div>
        <highcharts 
			:options="chartOptions"
		></highcharts>
    </div>
</template>

<script>
import { Chart } from "highcharts-vue"
import Highcharts from "highcharts"

export default {
    name: "Goals__againstOnH2H",

    props: {
        gameData: {
            required:   true,
            type:       Object
        }
    },

    computed: {
        chartOptions() {
            const categories = ["1'-45'", "46'-90'", "1'-90'"];
            const for_data = [-this.gameData.first_half_for, -this.gameData.second_half_for, -this.gameData.total_for];
            const against_data = [this.gameData.first_half_against, this.gameData.second_half_against, this.gameData.total_against];
            const max_for = Math.max(...for_data.map(elem => Math.abs(elem)));
            const max_against = Math.max(...against_data.map(elem => Math.abs(elem)));
            let max = ( max_for > max_against ) ? max_for : max_against;

            return {
                chart: {
                    type:               "bar",
                    backgroundColor:    "transparent",
                    borderRadius:		"15px",
                    height:             "120px"
                },
                title: {
                    text:                   ""
                },
                xAxis: {
                    categories:             categories,
                    gridLineWidth:          0,
					lineWidth:              0,
					allowDecimals:          false,
                    reversed:               false,
                    labels: {
                        step:   1,
                        style: {
                            color:            "#727c86",
                            fontSize:         "10px",
                        }
                    },
                },
                yAxis: {
                    title: {
                        text:               this.$i18n.t( `Games.teamStatsTab.goals`),
                        enabled:            false
                    },
                    gridLineWidth:        0,
					lineWidth:            0,
                    max:                  max + 1,
                    allowDecimals:        false,
                    labels: {
                        enabled:    false,
						formatter: function () {
                            return Math.abs(this.value);
                        },
					style: {
							fontSize:         "10px",
							color:            "#727c86"
						}
					}
                },
                legend: {
					enabled:              false
				},
                credits: {
					enabled:              false
				},
				exporting: {
					enabled:              false
				},
                plotOptions: {
                    bar: {
                        stacking:       "normal",
                        borderWidth:    0,
                        pointWidth:     3,
                        minPointLength: 0.5,
                        dataLabels: {
                            enabled:            true,
                            inside:             false,
                            color:              "#c1c1c1",
                            style: {
                                fontWeight:     "bold",
                                textOutline:    "none"
                            },
                            formatter: function() {
                                if ( this.point.y == 0 ) {
                                    return ""
                                }
                                return Math.abs(this.point.y)
                            }
                        }
                    }
                },

                tooltip: {
                    backgroundColor:    "#727c86",
                    borderColor:        "#727c86",
                    useHTML:            true,
                    formatter: function() {
                        return `<div style="height: 36px">
                                    <p style="font-size: 12px";> 
                                        <strong>${ this.series.name }: ${this.point.category}</strong>
                                        <span style="display:block; font-size: 12px; margin-top: 6px; margin-bottom: 6px;">
                                            ${this.series.yAxis.axisTitle.textStr }: ${ Math.floor(Math.abs(this.point.y)) }
                                        </span>
                                    </p>
                                </div>`

                    }
                },

                series: [{
                    name:   this.$i18n.t( `Games.teamStatsTab.forTeam` ),
                    color:  "#5a6fd0",
                    data:   for_data,
                }, {
                    name:   this.$i18n.t( `Games.teamStatsTab.againstTeam` ),
                    color:  "#d23a87",
                    data:   against_data,
                }]
            }
        }
    },

    components: {
        highcharts: Chart 
    },
}
</script>

<style lang="scss">
.highcharts-area.zone-0 {
	fill: #f7a35c;
}
</style>