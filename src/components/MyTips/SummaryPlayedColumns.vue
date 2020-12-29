<template>
    <div class="played">
        <div class="played__title">
            <h4>
                <slot name="title"></slot>
            </h4>
            <p class="mb-0">
                {{ playedData }} <span>{{ $t( `Banka.${typeOfData}` ) }}</span>
            </p>
        </div>
        <div class="mx-auto">
            <highcharts 
                :options="chartOptions"
            ></highcharts>
        </div>
    </div>
</template>

<script>
import { Chart } from "highcharts-vue"
import Highcharts from "highcharts"

export default {
    name:   "Summary__played",

    props: {
        lostData: {
            required:   true,
            type:       Number
        },
        playedData: {
            required:   true,
            type:       Number
        },
        typeOfData: {
            required:   true,
            type:       String
        },
        wonData: {
            required:   true,
            type:       Number
        }
    },

    data() {
        return {
            colors: ["#72d6c9", "#d23a87"]
        }
    },

    computed: {
        chartOptions() {
            const label = this.typeOfData;

            return {
                chart: {
                    type:               "pie",
                    backgroundColor:    "transparent",
                    plotBackgroundColor: null,
                    plotBorderWidth:     null,
                    borderRadius:		"15px",
                    BorderWidth:        null,
                    plotShadow:         false,
                    height:             140,
                    width:              140,
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
                            inside:             true,
                            color:              "rgba(255,255,255,.7)",
                            style: {
                                fontWeight:     "bold",
                                textOutline:    "none",
                                fontSize:       "10px"
                            },
                            formatter: function() {
                                return this.y > 0 ? `${this.key}<br>${Math.floor(this.y)}` : ""

                            },
                            distance:           -30
                        },
                        
                    },
                },

                tooltip: {
                    enabled:            false,
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
                    innerSize:      "80%",
                    data: [{
                        name:       this.$i18n.t(`Mytips.tips_table.win`),
                        y:          this.wonData,
                        color:      this.colors[0]
                    }, {
                        name:       this.$i18n.t(`Mytips.tips_table.lost`),
                        y:          this.lostData,
                        color:      this.colors[1]
                    }]
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
.played {
    display: flex;
    flex-direction: column;
    align-items: center;
}

p {
    color: var(--v-primary-base);
    font-size: 14px;
}

span {
    color: var(--v-secondary-lighten4);
    font-size: 12px;
}
</style>