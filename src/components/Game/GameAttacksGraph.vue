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
        gameid: {
            required:   true,
            type:       String
        }
    },

    data() {
        return {
            homeData:   [],
            awayData:   [],
            selection:  "attacks"
        }
    },

    computed: {
        chartOptions() {
            return {
                chart: {
                    backgroundColor: "transparent",
                    height:          260,
                },
                title: {
                    text:       `<h4>${ this.selection.toUpperCase() }</h4>`,
                    useHTML:    true,
                    style: {
                        color:      "#fff",
                        fontSize:   "14px",

                    }
                },
                colors: ["#3ab795", "#b04d5d", "#3ab795", "#b04d5d"],
                xAxis: {
                    title: {
                        text:           "Minute"
                    },
                    type:               "linear",
                    lineColor:          "#2c343a",
                    tickColor:          "#2c343a",
                    tickPixelInterval:  100,
                    allowDecimals:      false
                },
                yAxis: {
                    title: {
                        text: `${ this.selection.toUpperCase() }`
                    },
                    labels: {
                        format: "{value}",
                        style: {
                            fontSize: "8px",
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
                    formatter: function() {
                        return '<b>' + this.series.name + '</b><br/>' +
                        '#' + this.y + '<br/>' +
                        this.x + "'";
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
                        name: "Home",
                        type: "areaspline",
                        turboThreshold: 0,
                        data: this.homeData
                    }, {
                        name: "Away",
                        type: "areaspline",
                        turboThreshold: 0,
                        data: this.awayData
                    }]
            }
        }
    },

    methods: {
        fetchData() {
            axios.post(`FetchBetMinNode.php?stats_match_id=${ this.gameid }`)
                .then( res => {
                    console.log(res.data);
                    this.homeData = res.data.home.stats.map(elem => {
                        return {
                            x: elem.min,
                            y: elem.data[this.selection]
                        }
                    });
  
                    this.awayData = res.data.away.stats.map(elem => {
                        return {
                            x: elem.min,
                            y: elem.data[this.selection]
                        }
                    });
                }).catch( e => {
                    console.log(e.response);
                })
        },

        init() {

        }
    },

    mounted() {
        this.fetchData();
    }
}
</script>

<style lang="scss" scoped>

</style>