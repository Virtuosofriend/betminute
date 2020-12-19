<template>
    <div class="matches">
        <div class="matches__pie">
            <highcharts 
                :options="chartOptions"
            ></highcharts>

            <div class="p-1 matches__description">
                <p class="mb-0">{{ gameData.draw_result }}% {{ $t( `Games.H2HTab.drawGamesExplanation` )}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from "highcharts-vue"
import Highcharts from "highcharts"

export default {
    name:   "WinLossDraw__pie",

    props: {
        gameData: {
            required:   true,
            type:       Object
        }
    },

    data() {
        return {
            win:    "#4bb288",
            loss:   "#aa2e38",
            draw:   "#eb9a28"
        }
    },

    computed: {
        filteredData() {
            return Object.keys(this.gameData).map((elem, index) => {
                if ( elem != "draw_result" ) {

                    return {
                        name:       elem,
                        y:          this.gameData[elem],
                        color:      this[elem]
                    }
                }
            });
        },
        chartOptions() {
            const data = this.filteredData;

            return {
                chart: {
                    type:               "pie",
                    backgroundColor:    "transparent",
                    borderRadius:		"15px",
                    BorderWidth:        null,
                    plotShadow:         false,
                    height:             240,
                    width:              220,
                    className:          "mx-auto"
                },
                title: {
                    text:                   ""
                },
                legend: {
                    enabled:              true,
                    padding:               8,
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
                    pie: {
                        allowPointSelect:       false,
                        cursor:                 "pointer",
                        borderWidth:            0,
                        enableMouseTracking:    false,
                        showInLegend:           true,
                        dataLabels: {
                            enabled:            true,
                            inside:             false,
                            color:              "#fff",
                            style: {
                                fontWeight:     "bold",
                                textOutline:    "none",
                                fontSize:       "10px"
                            },
                            format:             "{point.y:.1f} %",
                            distance:           -19,
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
    flex-direction: column;
}

.matches__pie {
    width: 100%;
}

.matches__description {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--v-background-base);
    border-radius: 6px;
    padding: 6px;
}

.matches__description p {
    font-size: 14px;
    color: #fff;
    text-align: center;
}
</style>