<template>
    <div>
        <highcharts 
			:options="chartOptions"
		></highcharts>
    </div>
</template>

<script>
import axios from "axios";
import { Chart } from "highcharts-vue"
import Highcharts from "highcharts"

export default {
    name: "Game__attacksGraph",

    props: {
        attacks_home: {
            required:   true,
            type:       Array
        },

        attacks_away: {
            required:   true,
            type:       Array
        },  
    },

    computed: {
        chartOptions() {
            return {
                chart: {
                    backgroundColor: "transparent",
                    height:          190,
                },
                title: {
                    text:       ``,
                    enabled:    false,
                    useHTML:    true,
                    style: {
                        color:      "#fff",
                        fontSize:   "14px",

                    }
                },
                colors: ["#3ab795", "#b04d5d", "#3ab795", "#b04d5d"],
                xAxis: {
                    title: {
                        text:           "",
                        enabled:        false
                    },
                    labels: {
                        format: "{value}'",
                        style: {
                            fontSize: "9px",
                        }
                    },
                    type:               "linear",
                    lineColor:          "#2c343a",
                    tickColor:          "#2c343a",
                    tickPixelInterval:  100,
                    allowDecimals:      false
                },
                yAxis: {
                    title: {
                        text:       ``,
                        enabled:    false
                    },
                    labels: {
                        format: "{value}",
                        style: {
                            fontSize: "9px",
                        }
                    },
                    allowDecimals:  false,
                    gridLineWidth:  0,
                    lineWidth:      0,
                    tickPixelInterval:  30,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#eaf6f6"
                    }]
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity:    0.1,
                        turboThreshold: 0,
                        lineWidth:      3,
                        marker: {
                            radius: 0
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor:    "#727c86",
                    borderColor:        "#727c86",
                    useHTML:            true,
                    formatter: function() {
                        return `<div style="height: 36px">
                                    <p style="font-size: 12px";> 
                                        <strong>${ this.series.name }</strong>
                                        <span style="display:block; font-size: 12px; margin-top: 6px; margin-bottom: 6px;">
                                            #${ this.y }: ${ this.x }'
                                        </span>
                                    </p>
                                </div>`

                    }
                },
                legend: {
                    enabled:        true,
                    align:          "left",
                    verticalAlign:  "top",
                    x:              50,
                    y:              10,
                    floating:       true,
                    itemStyle: {
                        color:      "#eaf6f6",
                        fontSize:   "10px",
                        fontWeight: "normal"
                    }
                },
                exporting: {
                    enabled: false
                },
                series: [{
                        name: this.$i18n.t( `General.home` ),
                        type: "areaspline",
                        turboThreshold: 0,
                        data: this.attacks_home
                    }, {
                        name: this.$i18n.t( `General.away` ),
                        type: "areaspline",
                        turboThreshold: 0,
                        data: this.attacks_away
                    }]
            }
        }
    }
}
</script>
