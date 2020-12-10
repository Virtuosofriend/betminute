<template>
    <div>
        <highcharts 
			:options="chartOptions"
            :key="interval"
		></highcharts>
    </div>
</template>

<script>
import { Chart } from "highcharts-vue"
import Highcharts from "highcharts"

export default {
    name: "Time__intervals",

    props: {
        gameData: {
            required:   true,
            type:       Object
        },

        interval: {
            required:   false,
            type:       Number,
            default:    10
        },

        title: {
            required:   true,
            type:       String
        }
    },

    computed: {
        chartOptions() {
            const max_time = 100;
            let categories = {
                data:   [],
                labels: []
            };

            let i = 0;
            for ( i; i < max_time; i += this.interval ) {
                let difference = this.interval;
                let starting = i;

                if ( i == 40 ) {
                    difference = 5;
                }
                if ( i == 50 ) {
                    difference = 5;
                    starting = 45;
                }

                if ( i > 50 && this.interval == 10 ) {
                    difference = 10;
                }

                if ( i == 90 ) {
                    break;
                }
                
                categories.labels.unshift(`${starting}' - ${starting + difference}'`);
                categories.data.push(`i${starting + 1}to${starting + difference}`);
            }

            let for_data = [];
            let against_data = [];
            categories.data.forEach( elem => {
                for_data.unshift(- + +this.gameData.for[elem]);
                against_data.unshift(this.gameData.against[elem]);
            });
            
            return {
                chart: {
                    type:               "bar",
                    backgroundColor:    "transparent",
                    borderRadius:		"15px"
                },
                title: {
                    text:                   ""
                },
                xAxis: [{
                    categories:             categories.labels,
                    gridLineWidth:          0,
					lineWidth:              0,
					allowDecimals:          false,
                    reversed:               false,
                    labels: {
                        step:   1
                    },
                }, {
                    opposite:               true,
                    reversed:               false,
                    gridLineWidth:          0,
					lineWidth:              0,
					allowDecimals:          false,
                    categories:             categories.labels,
                    linkedTo:               0,
                    labels: {
                        step:   1
                    },
                }],
                yAxis: {
                    title: {
                        text:              this.$i18n.t( `Games.teamStatsTab.${this.title}`)
                    },
                    gridLineWidth:        0,
					lineWidth:            0,
                    allowDecimals:        false,
                    labels: {
						formatter: function () {
                            return Math.abs(this.value);
                        },
					style: {
							fontSize:         "10px",
							color:            "#eaf6f6"
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
                            color:              "#727c86",
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