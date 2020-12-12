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
    name: "OverGoals__graphs",

    props: {
        gameData: {
            required:   true,
            type:       Object
        },

        teamField: {
            required:   true,
            type:       String
        }
    },

    computed: {
        categories() {
            return [
                "1st half",
                "2nd half",
                "Total"
            ]
        },

        chartOptions() {          
            let data = {
                first_half:   [],
                second_half:  [],
                total:        []
            };

            for ( let value in data ) {
                for ( let half in this.gameData[value][this.teamField]) {
                    if ( half.includes("1") ) {
                        data.first_half.push(this.gameData[value][this.teamField][half]);
                    }

                    if ( half.includes("2") ) {
                        data.second_half.push(this.gameData[value][this.teamField][half]);
                    }

                    if ( half.includes("3") ) {
                        data.total.push(this.gameData[value][this.teamField][half]);
                    }
                }
            }
            
            return {
                chart: {
                    type:               "column",
                    backgroundColor:    "transparent",
                    borderRadius:		"15px"
                },
                title: {
                    text:                   ""
                },
                xAxis: {
                    categories:             this.categories,
                    gridLineWidth:          0,
					lineWidth:              0,
                    gridLineColor:          "#000",
                    reversed:               false,
                    labels: {
                        step:   1
                    },
                },
                yAxis: {
                    title: {
                        text:              this.$i18n.t( `Games.teamStatsTab.matches`)
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
					enabled:              true,
                    itemStyle:  {
                        color:      "#fff",
                        fontSize:   "12px",
                        fontWeight: "bold"
                    }
				},
                credits: {
					enabled:              false
				},
				exporting: {
					enabled:              false
				},
                plotOptions: {
                    column: {
                        pointPadding:           0.2,
                        groupPadding:           0.7,
                        borderWidth:            0,
                        minPointLength:         3,
                        pointWidth:             12,
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
                    name:   "Over 0.5",
                    color:  "#69779b",
                    data:   data.first_half,
                }, {
                    name:   "Over 1.5",
                    color:  "#acdbdf",
                    data:   data.second_half,
                }, {
                    name:   "Over 2.5",
                    color:  "#f0ece2",
                    data:   data.total,
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