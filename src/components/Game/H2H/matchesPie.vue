<template>
    <div class="matches">
        <div class="matches__pie">
            <highcharts 
                :options="chartOptions"
            ></highcharts>
        </div>
        <div class="matches__description">
            <h2 class="matches__description-stats" 
                v-for="(values, keys, index) in gameData" 
                :key="values.percentage"
            >
                <v-icon 
                    x-small
                    :color="colors[index]"
                    class="mr-1"
                >
                    fas fa-square
                </v-icon>
                {{ values.label }} {{ $t( `Games.H2HTab.numberOfGoal` ) }}<span v-if="values.label != '0-1'">s</span> {{ $t( `Games.H2HTab.in` ) }} 
                <span>{{ values.matches }} {{ $t( `Games.H2HTab.numberOfMatch` ) }}<span v-if="values.matches > 1">es</span></span>
            </h2>

        </div>
    </div>
</template>

<script>
import { Chart } from "highcharts-vue"
import Highcharts from "highcharts"

export default {
    name:   "Matches__pie",

    props: {
        gameData: {
            required:   true,
            type:       Object
        }
    },

    data() {
        return {
            colors: ["#7189bf", "#72d6c9", "#ffc785", "#df7599"]
        }
    },

    computed: {
        chartOptions() {
            let data = Object.values(this.gameData).map((elem, index) => {
                return {
                    name:       elem.label,
                    y:          elem.percentage,
                    color:      this.colors[index]
                }
            });

            return {
                chart: {
                    type:               "pie",
                    backgroundColor:    "transparent",
                    borderRadius:		"15px",
                    BorderWidth:        null,
                    plotShadow:         false,
                    height:             200,
                    width:              200,
                    className:          "mx-auto"
                },
                title: {
                    text:                   ""
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
                    pie: {
                        allowPointSelect:       false,
                        cursor:                 "pointer",
                        borderWidth:            0,
                        enableMouseTracking:    false,
                        dataLabels: {
                            enabled:            true,
                            inside:             false,
                            color:              "#fff",
                            style: {
                                fontWeight:     "bold",
                                textOutline:    "none",
                                fontSize:       "10px"
                            },
                            formatter: function() {
                                return this.y > 0 ? `${Math.floor(this.y)}%` : ""

                            },
                            distance:           -20
                        },
                        
                    },
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
                    name:           "Matches",
                    colorByPoint:   true,
                    data:           data
                }]
            }
        }
    },

    components: {
        highcharts: Chart 
    }
}
</script>

<style lang="scss" scoped>
.matches {
    display: flex;
    align-items: center;
}

.matches__pie {
    width: 80%;
}

.matches__description {
    width: 50%;
}

.matches__description-stats {
    font-weight: 400;
    text-transform: initial;
    font-size: 14px;
    margin-bottom: 6px;
}

.matches__description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
}

.title span {
    display: inline-block;
}
</style>