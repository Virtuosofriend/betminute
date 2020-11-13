<template>
	<span>
		<highcharts 
			:options="chartOptions"
		></highcharts>
	</span>
</template>

<script>
import {Chart} from 'highcharts-vue'
import { mapGetters } from "vuex";
import Highcharts from 'highcharts'
import * as AnnotationsModule from "highcharts/modules/annotations"
AnnotationsModule(Highcharts);

import green from "../../assets/timeline/green.png"

export default {
    name: "TimelineGraph",

    components: {
        highcharts: Chart 
    },

    props: {
        homeLogo: {
            type: String
        },
        awayLogo: {
            type: String
        },
        minute: {
			type: 		Number,
			required:	true
        },
        injury: {
			type: 		Number,
			required:	false
        },
        extraTime: {
			type: 		Number,
			required:	false
        }
    },

    data() {
        return {
			chartOptions: 	{},
			publicPath: 	process.env.BASE_URL
        }
	},
	
	computed: {
		...mapGetters({
			stats: "game/fetchgame"
		})
	},

    methods: {
        init() {
			const injury = 0;
			const extraTime = 0;
			const match = this.stats.match_stats;
			const minute = this.minute;
			const publicPath = this.publicPath;
			const HomeLogo = this.stats.lineup.home.logo;
			const AwayLogo = this.stats.lineup.away.logo;

			let { home , away } = match;
			delete home.stats;
			delete away.stats;
	
			let home_data = [];
			let away_data = [];

			for (let home_val in home) {
				if (home[home_val] != null ) {
		
					home[home_val].forEach( elem => {

						let obj = {
							x: elem.min,
							y: 30,
							marker: {
								enabled: true,
								player: home_val != "corner" ? elem.player_name : "",
								width: 10,
								symbol: `url(${ this.publicPath }img/timeline/${home_val}.png)`
							}
						};

						home_data.push(obj);
					});
				}

				home_data.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0)); 
			}


			for (let away_val in away) {
				if (away[away_val] != null ) {

					away[away_val].forEach( elem => {

						let obj = {
							x: elem.min,
							y: -30,
							marker: {
								enabled: true,
								player: away_val != "corner" ? elem.player_name : "",
								width: 10,
								symbol: `url(${ this.publicPath }img/timeline/${away_val}.png)`
							}
						};
						away_data.push(obj);
					});
				}

				away_data.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0)); 
			}

			const data = {
				chart: {
					backgroundColor:      'rgba(38,44,63, 0.5)',
					height:               70,
					animation:            false
				},
				title: {
					enabled:	false,
					text: "",
					style: {
						fontSize:           "13px",
						color:              "#eaf6f6"
					}
				},
				colors:                 ["#227066"],
				xAxis: {
					type:                 'linear',
					tickPixelInterval:    150,
					lineColor:            "#227066",
					gridLineWidth:        0,
					lineWidth:            0,
					allowDecimals:        false,
					visible:              false,
					min:                  -3,
					max:                  90 + injury + extraTime,
					labels: {
						format:             '{value}',
						style: {
							fontSize:         "10px",
							color:            "#eaf6f6"
						}
					}
				},
				yAxis: [{
					title: {
						text:             	""
					},
					id:                   	"homeaxis",
					labels: {
					enabled:            	false
				},
					plotLines: [{
						value:              0,
						color:              '#227066',
						width:              0,
					}],
					lineColor:            	"#227066",
					gridLineColor:        	"#227066",
					allowDecimals:        	false,
					visible:              	true,
					gridLineWidth:        	0,
					lineWidth:            	0,
					min:                  	-30,
					max:                  	30,
				}, {
					title: {
						text:               ""
					},
					id:                   "awayaxis",
					labels: {
						enabled:            false
					},
					plotLines: [{
						value:              0,
						color:              '#227066',
						width:              0,
					}],
					lineColor:            "#227066",
					gridLineColor:        "#227066",
					allowDecimals:        false,
					visible:              true,
					gridLineWidth:        0,
					lineWidth:            0,
					min:                  -30,
					max:                  30,
				}, { // second axis to display minute markers
					title: {
						text:               ""
					},
					id:                   "axis2",
					opposite:             true,
					labels: {
						enabled:            false
					},
					allowDecimals:        false,
					visible:              true,
					gridLineWidth:        0,
					lineWidth:            0,
					min:                  -30,
					max:                  30,
					}],
				plotOptions: {
					series: {
						turboThreshold:     0,
						stickyTracking:     false,
						states: {
						hover: {
							enabled:        false
						}
						},
					}
				},
				credits: {
					enabled:              false
				},
				tooltip: {
					shape:                'rect',
					snap:                 0,
					useHTML:              true,
					borderWidth:          0,
					backgroundColor:      '#e7eff3',
					hideDelay:            0,
					formatter: function() {
						let player = "";
						if (this.point.marker.player) {
							player = '<i class="fas fa-male mr3"></i><strong>' + this.point.marker.player + '</strong><br>';
						}
						return player +
						'<i class="fas fa-stopwatch mr3 color-theme-red"></i>' + this.x + "'";
					}
				},
				legend: {
					enabled:              false
				},
				exporting: {
					enabled:              false
				},
				series: [{
					name:				"HomeData",
					type:				"spline",
					turboThreshold:		0,
					lineWidth:			0,
					data:				home_data
				},{
					name:				"AwayData",
					type:				"spline",
					turboThreshold:		0,
					lineWidth:			0,
					data:				away_data
				},{
					name:                                     "More",
					type:                                     'spline',
					turboThreshold:                           0,
					enableMouseTracking:                      false,
					lineWidth:                                0,
					yAxis:                                    2,
					data: (function() {
						let data_array = [{
							x: -1,
							y: 30,
							id: "home",
						}, {
							x: -1,
							y: 0,
							id: "away",
						}, {
							x: 45,
							y: 0,
							id: "ht",
						}, {
							x: 90,
							y: 0,
							id: "ft"
						}];
						
						let marker = {};

						for (let k = 0; k <= (90 + injury + extraTime); k++) {
							if (k <= minute && k != 90) {
								const obj = {
									enabled: true,
									width: 20,
									height: 5,
									symbol: `url(${ publicPath }img/timeline/green.png)`
								};

								marker = obj;
							} else {

								const obj = {
									enabled: true,
									width: 20,
									height: 5,
									symbol: `url(${ publicPath }img/timeline/gray.png)`
								};
								marker = obj;
							}

							data_array.push({
								x: k,
								y: 0,
								marker: marker
							});
						}

						return data_array;
					}())
				}],
				annotations: [{
					labels: (function() {
						console.log(HomeLogo)
						let data_array = [{
							y: -10,
							x: 0,
							point: "home",
							useHTML: true,
							text: '<img src="' + HomeLogo + '" style="width: 20px; height: 20px">',
							backgroundColor: null,
							borderWidth: 0
						}, {
							y: 0,
							x: 0,
							point: "away",
							useHTML: true,
							text: '<img src="' + AwayLogo + '" style="width: 20px; height: 20px">',
							backgroundColor: null,
							borderWidth: 0
						}, {
							y: 10,
							x: 0,
							point: "ht",
							useHTML: true,
							text: 'HT',
							backgroundColor: "#7b7b7b",
							borderWidth: 1
						}, {
							y: 12,
							x: 0,
							point: "ft",
							useHTML: true,
							text: `<img src="${ publicPath }img/timeline/referee_small.png" style="width: 17px; height: 20px">`,
							backgroundColor: null,
							borderWidth: 0
						}];

						return data_array;
              		}()),
				}]
				// series: [{
				// 	name:                 "Home",
				// 	type:                 'spline',
				// 	turboThreshold:       0,
				// 	enableMouseTracking:  true,
				// 	lineWidth:            0,
				// 	data: (function() {
				// 		/****** Structure for goal *****
				// 		 ****  player_name, ispenalty, type
				// 		***                         ****/

				// 		let data_array = [];
				// 		if (home != null) {
				// 		for (let i = 0; i < data_home.length; i++) {
				// 			let position = 0;

				// 			let tmp = data_home[i];
				// 			if (tmp != null) {
				// 			for (j = 0; j < tmp.length; j++) {
				// 				let data_new = tmp[j];
				// 				let min = Number(data_new.min);
				// 				let tmpobj = Object.keys(data_new);
				// 				let icon = tmpobj[1];
				// 				let name = data_new.player_name;

				// 				if (tmpobj[1] === "goal_count") {
				// 				let player_name = data_new.player_name[0];
				// 				player_name = player_name.split(",");
				// 				name = player_name[0];
				// 				let status = player_name[1];
				// 				icon = player_name[2];
				// 				if (icon === "goal" && status == "true") {
				// 					icon = "own-goal";
				// 				}
				// 				if (icon == "penalty" && status == "false") {
				// 					icon = "missedpenalty";
				// 				}
				// 				position = 10;
				// 				}

				// 				let obj = {
				// 				x: min,
				// 				y: 30 - position,
				// 				marker: {
				// 					enabled: true,
				// 					player: name,
				// 					width: 10,
				// 					symbol: 'url(lib/img/match/' + icon + '.png)'
				// 				}
				// 				};
				// 				data_array.splice(min + 3, 1, obj);
				// 			}
				// 			}

				// 		}
				// 		}
				// 		return data_array;
				// 	}())
				// 	}, {
				// 	name:                             "away",
				// 	type:                             'spline',
				// 	turboThreshold:                   0,
				// 	enableMouseTracking:              true,
				// 	lineWidth:                        0,
				// 	data: (function() {
				// 		let data_array = [];
				// 		if (data_away != null) {
				// 		for (let i = 0; i < data_away.length; i++) {
				// 			let position = 0;
				// 			let tmp = data_away[i];

				// 			if (tmp != null) {
				// 			for (j = 0; j < tmp.length; j++) {
				// 				let data_new = tmp[j];
				// 				let min = Number(data_new.min);
				// 				let tmpobj = Object.keys(data_new);
				// 				let icon = tmpobj[1];
				// 				let name = data_new.player_name;

				// 				if (tmpobj[1] === "goal_count") {
				// 				let player_name = data_new.player_name[0];
				// 				player_name = player_name.split(",");
				// 				name = player_name[0];
				// 				icon = player_name[2];
				// 				let status = player_name[1];
				// 				if (icon === "goal" && status == "true") {
				// 					icon = "own-goal";
				// 				}
				// 				if (icon == "penalty" && status == "false") {
				// 					icon = "missedpenalty";
				// 				}
				// 				position = -10;
				// 				}

				// 				let obj = {
				// 				x: min,
				// 				y: -30 - position,
				// 				marker: {
				// 					enabled: true,
				// 					player: name,
				// 					width: 10,
				// 					symbol: 'url(lib/img/match/' + icon + '.png)'
				// 				}
				// 				};
				// 				data_array.splice(min + 3, 1, obj);
				// 			}
				// 			}
				// 		}
				// 		}
				// 		return data_array;
				// 	}())
				// 	}, { // Game minutes markers
				// 	name:                                     "More",
				// 	type:                                     'spline',
				// 	turboThreshold:                           0,
				// 	enableMouseTracking:                      false,
				// 	lineWidth:                                0,
				// 	yAxis:                                    2,
				// 	data: () => {
				// 		let data_array = [{
				// 		x: -1,
				// 		y: 30,
				// 		id: "home",
				// 		}, {
				// 		x: -1,
				// 		y: 0,
				// 		id: "away",
				// 		}, {
				// 		x: 45,
				// 		y: 0,
				// 		id: "ht",
				// 		/*
				// 		marker: {
				// 			enabled: true,
				// 			width: 29,
				// 			height: 15,
				// 			symbol: "url(lib/img/match/ht.png)"
				// 		}*/
				// 		}, {
				// 		x: 90,
				// 		y: 0,
				// 		id: "ft"
				// 		}];
				// 		for (let k = 0; k <= (90 + this.injury + this.extraTime); k++) {
				// 		if (k <= minute && k != 90) {
				// 			var marker = {
				// 			enabled: true,
				// 			width: 20,
				// 			height: 5,
				// 			symbol: "url(lib/img/match/green.png)"
				// 			};
				// 		} else {

				// 			let marker = {
				// 			enabled: true,
				// 			width: 20,
				// 			height: 5,
				// 			symbol: "url(lib/img/match/gray.png)"
				// 			};

				// 		}
				// 		data_array.push({
				// 			x: k,
				// 			y: 0,
				// 			marker: marker
				// 		});
				// 		}
				// 		return data_array;
				// 	}
				// }],
				// annotations: [{
				// 	labels: (() => {
				// 		let data_array = [{
				// 		y: -10,
				// 		x: 0,
				// 		point: "home",
				// 		useHTML: true,
				// 		text: '<img src="' + this.homeLogo + '" style="width: 20px; height: 20px">',
				// 		backgroundColor: null,
				// 		borderWidth: 0
				// 		}, {
				// 		y: 0,
				// 		x: 0,
				// 		point: "away",
				// 		useHTML: true,
				// 		text: '<img src="' + this.awayLogo + '" style="width: 20px; height: 20px">',
				// 		backgroundColor: null,
				// 		borderWidth: 0
				// 		}, {
				// 		y: 10,
				// 		x: 0,
				// 		point: "ht",
				// 		useHTML: true,
				// 		text: 'HT',
				// 		backgroundColor: "#7b7b7b",
				// 		borderWidth: 1
				// 		}, {
				// 		y: 12,
				// 		x: 0,
				// 		point: "ft",
				// 		useHTML: true,
				// 		text: '<img src="lib/img/match/referee_small.png" style="width: 17px; height: 20px">',
				// 		backgroundColor: null,
				// 		borderWidth: 0
				// 		}];
				// 		return data_array;
				// 	}),
				// }]
			};
			
			this.chartOptions = Object.assign({}, this.chartOptions, data);
		},   

	},
	
	mounted() {
		this.init();
	}
}
</script>

<style lang="scss" scoped>

</style>