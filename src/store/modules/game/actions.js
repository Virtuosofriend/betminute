import Socket from '../../../plugins/socket'
import ApiService from "../../../commons/api.service";

const gameInfo = async ({ commit }, payload) => {    
    try {

        const odds = (payload.status == "LIVE" || payload.status == "HT" ) ? "livegame_odds" : "pregame_odds";

        const message = `{
            "fetchdata":{
                "matchview": {
                    "id": ${payload.gameID},
                    "data": ["bm_pregame_data", "bm_static_data", "match_stats", "bm_live_data", "livescore_lineup", "${odds}", "textbot"]
                } 
            }
        }`;     
        
        Socket.send(message);       

    } catch(e) {
        return false;
    }
};

const fetch_h2h = async( {commit }, payload) => {
    try {
        const response = (await ApiService.bet_minute().post(`FetchBetMinNode.php?bm_h2h_id=${payload}`)).data;
        // Mapping of the response, until the backend fixes it
        const home_response = {
            home: {
                number_of_matches:          response.home.home.nohomegames,
                for_against: {
                    first_half_for:             response.home.home.hfhfor,
                    first_half_against:         response.home.home.hfhagainst,
                    second_half_for:            response.home.home.hshfor,
                    second_half_against:        response.home.home.hshagainst,
                    total_for:                  response.home.home.hhfor,
                    total_against:              response.home.home.hhagainst,
                },
                goals_pie: {
                    goals_0_1: {
                        matches:            response.home.home.hhgsum1,
                        percentage:         response.home.home.hhgsum1p * 100,
                        label:              "0-1"
                    },
                    goals_2_3: {
                        matches:            response.home.home.hhgsum2,
                        percentage:         response.home.home.hhgsum2p * 100,
                        label:              "2-3"
                    },
                    goals_4_6: {
                        matches:            response.home.home.hhgsum3,
                        percentage:         response.home.home.hhgsum3p * 100,
                        label:              "4-6"
                    },
                    goals_7: {
                        matches:            response.home.home.hhgsum4,
                        percentage:         response.home.home.hhgsum4p * 100,
                        label:              "7+"
                    }
                },
                bet_specific: {
                    total_goal_goal:            response.home.home.hbothteamsscoredp * 100,
                    first_half_goal_goal:       response.home.home.hhgs_gg_ahtcountp * 100,
                    second_half_goal_goal:      response.home.home.hhgs_gg_bhtcountp * 100,
                    true_goal_goal:             response.home.home.hhgs_trueggp * 100,
                    over_15_home:               response.home.home.hh15goalsforp * 100,
                    over_15_away:               response.home.home.hh15goalsagainstp * 100,
                    over_25_goal_goal:          response.home.home.hover_ggp * 100,
                    over_25_contribution:       response.home.home.hhgs_overcontribution * 100
                },
                scored_failedtoscore: {
                    first_half_for:             Math.floor(response.home.home.hscorefhalfp * 100),
                    first_half_against:         Math.floor(response.home.home.hhgsfailed_ahtp * 100),
                    second_half_for:            Math.floor(response.home.home.hscoreshalfp * 100),
                    second_half_against:        Math.floor(response.home.home.hhgsfailed_bhtp * 100),
                    total_for:                  Math.floor(response.home.home.hbothhalfsscoredp * 100),
                    total_against:              Math.floor(response.home.home.hfailedp * 100),
                },
                cleanSheet_condeded: {
                    first_half_for:             Math.floor(response.home.home.hfhcleanp * 100),
                    first_half_against:         Math.floor(response.home.home.hconcedefhalfp * 100),
                    second_half_for:            Math.floor(response.home.home.hshcleanp * 100),
                    second_half_against:        Math.floor(response.home.home.hconcedeshalfp * 100),
                    total_for:                  Math.floor(response.home.home.hftcleanp * 100),
                    total_against:              Math.floor(response.home.home.hbothhalfsconcededp * 100),
                },
                winLossDraw: {
                    half_time: {
                        win:                    Math.floor(response.home.results.homeht_winr * 100),
                        loss:                   Math.floor(response.home.results.homeht_loser * 100),
                        draw:                   Math.floor(response.home.results.homeht_squarer * 100),
                        draw_result:            Math.floor(response.home.home.hhfh00p * 100)
                    },
                    full_time: {
                        win:                    Math.floor(response.home.results.homeft_winr * 100),
                        loss:                   Math.floor(response.home.results.homeft_loser * 100),
                        draw:                   Math.floor(response.home.results.homeft_squarer * 100),
                        draw_result:            Math.floor(response.home.home.hhft00p * 100)
                    }
                },
                extraWinLossDraw: {
                    clean_sheet_win:            response.home.home.hhwontonil,
                    scoreless_defeat:           response.home.home.hhlosttonil
                }
            },
            away: {
                number_of_matches:          response.home.away.noawaygames,
                for_against: {
                    first_half_for:             response.home.away.afhfor,
                    first_half_against:         response.home.away.afhagainst,
                    second_half_for:            response.home.away.ashfor,
                    second_half_against:        response.home.away.ashagainst,
                    total_for:                  response.home.away.ahfor,
                    total_against:              response.home.away.ahagainst,
                },
                goals_pie: {
                    goals_0_1: {
                        matches:            response.home.away.hasum1,
                        percentage:         response.home.away.hasum1p * 100,
                        label:              "0-1"
                    },
                    goals_2_3: {
                        matches:            response.home.away.hasum2,
                        percentage:         response.home.away.hasum2p * 100,
                        label:              "2-3"
                    },
                    goals_4_6: {
                        matches:            response.home.away.hasum3,
                        percentage:         response.home.away.hasum3p * 100,
                        label:              "4-6"
                    },
                    goals_7: {
                        matches:            response.home.away.hasum4,
                        percentage:         response.home.away.hasum4p * 100,
                        label:              "7+"
                    }
                },
                bet_specific: {
                    total_goal_goal:        response.home.away.abothteamsscoredp * 100,
                    first_half_goal_goal:   response.home.away.haggg_ahalfp * 100,
                    second_half_goal_goal:  response.home.away.haggg_bhalfp * 100,
                    true_goal_goal:         response.home.away.hagstrueggp * 100,
                    over_15_home:           response.home.away.ha15goalsforp * 100,
                    over_15_away:           response.home.away.ha15goalsagainstp * 100,
                    over_25_goal_goal:      response.home.away.aover_ggp * 100,
                    over_25_contribution:   response.home.away.hags_overcontribution * 100
                },
                scored_failedtoscore: {
                    first_half_for:             Math.floor(response.home.away.ascorefhalfp * 100),
                    first_half_against:         Math.floor(response.home.away.afailed_fhp * 100),
                    second_half_for:            Math.floor(response.home.away.ascoreshalfp * 100),
                    second_half_against:        Math.floor(response.home.away.afailed_shp * 100),
                    total_for:                  Math.floor(response.home.away.abothhalfsscoredp * 100),
                    total_against:              Math.floor(response.home.away.afailedp * 100),
                },
                cleanSheet_condeded: {
                    first_half_for:             Math.floor(response.home.away.afhcleanp * 100),
                    first_half_against:         Math.floor(response.home.away.aconcedefhalfp * 100),
                    second_half_for:            Math.floor(response.home.away.ashcleanp * 100),
                    second_half_against:        Math.floor(response.home.away.aconcedeshalfp * 100),
                    total_for:                  Math.floor(response.home.away.aftcleanp * 100),
                    total_against:              Math.floor(response.home.away.abothhalfsconcededp * 100),
                },
                winLossDraw: {
                    half_time: {
                        win:                    Math.floor(response.home.results.awayht_winr * 100),
                        loss:                   Math.floor(response.home.results.awayht_loser * 100),
                        draw:                   Math.floor(response.home.results.awayht_squarer * 100),
                        draw_result:            Math.floor(response.home.away.hafh00p * 100)
                    },
                    full_time: {
                        win:                    Math.floor(response.home.results.awayft_winr * 100),
                        loss:                   Math.floor(response.home.results.awayft_loser * 100),
                        draw:                   Math.floor(response.home.results.awayft_squarer * 100),
                        draw_result:            Math.floor(response.home.away.haft00p * 100)
                    }
                },
                extraWinLossDraw: {
                    clean_sheet_win:            response.home.away.hawontonil,
                    scoreless_defeat:           response.home.away.halosttonil
                }
            },
            sum: {
                number_of_matches:          response.home.total.totalgames,
                for_against: {
                    first_half_for:             response.home.total.tfhfor,
                    first_half_against:         response.home.total.tfhagainst,
                    second_half_for:            response.home.total.tshfor,
                    second_half_against:        response.home.total.tshagainst,
                    total_for:                  response.home.total.tfor,
                    total_against:              response.home.total.tagainst,
                },
                goals_pie: {
                    goals_0_1: {
                        matches:            response.home.total.tsum1,
                        percentage:         response.home.total.tsum1p * 100,
                        label:              "0-1"
                    },
                    goals_2_3: {
                        matches:            response.home.total.tsum2,
                        percentage:         response.home.total.tsum2p * 100,
                        label:              "2-3"
                    },
                    goals_4_6: {
                        matches:            response.home.total.tsum3,
                        percentage:         response.home.total.tsum3p * 100,
                        label:              "4-6"
                    },
                    goals_7: {
                        matches:            response.home.total.tsum4,
                        percentage:         response.home.total.tsum4p * 100,
                        label:              "7+"
                    }
                },
                bet_specific: {
                    total_goal_goal:        response.home.total.tggp * 100,
                    first_half_goal_goal:   response.home.total.tggahtp * 100,
                    second_half_goal_goal:  response.home.total.tggbhtp * 100,
                    true_goal_goal:         response.home.total.ttrueggp * 100,
                    over_15_home:           response.home.total.t15goalsforp * 100,
                    over_15_away:           response.home.total.t15goalsagainstp * 100,
                    over_25_goal_goal:      response.home.total.tover_ggp * 100,
                    over_25_contribution:   response.home.total.tovercontribution * 100
                },
                scored_failedtoscore: {
                    first_half_for:             Math.floor(response.home.total.tscorefhalfp * 100),
                    first_half_against:         Math.floor(response.home.total.tfailed_fhp * 100),
                    second_half_for:            Math.floor(response.home.total.tscoreshalfp * 100),
                    second_half_against:        Math.floor(response.home.total.tfailed_shp * 100),
                    total_for:                  Math.floor(response.home.total.tbothhalfsscoredp * 100),
                    total_against:              Math.floor(response.home.total.tfailedp * 100),
                },
                cleanSheet_condeded: {
                    first_half_for:             Math.floor(response.home.total.tfhcleanp * 100),
                    first_half_against:         Math.floor(response.home.total.tconcedefhalfp * 100),
                    second_half_for:            Math.floor(response.home.total.tshcleanp * 100),
                    second_half_against:        Math.floor(response.home.total.tconcedeshalfp * 100),
                    total_for:                  Math.floor(response.home.total.tftcleanp * 100),
                    total_against:              Math.floor(response.home.total.tbothhalfsconcededp * 100),
                },
                winLossDraw: {
                    half_time: {
                        win:                    Math.floor(response.home.results.totalhtwinp * 100 ),
                        loss:                   Math.floor(response.home.results.totalhtlosep * 100 ),
                        draw:                   Math.floor(response.home.results.totalhtsquarep * 100 ),
                        draw_result:            Math.floor(response.home.total.tfh00p * 100)
                    },
                    full_time: {
                        win:                    Math.floor(response.home.results.totalftwinp * 100 ),
                        loss:                   Math.floor(response.home.results.totalftlosep * 100 ),
                        draw:                   Math.floor(response.home.results.totalftsquarep * 100 ),
                        draw_result:            Math.floor(response.home.total.tft00p * 100)
                    }
                },
                extraWinLossDraw: {
                    clean_sheet_win:            response.home.total.twontonil,
                    scoreless_defeat:           response.home.total.tlosttonil
                }
            }
        };

        const away_response = {
            home: {
                number_of_matches:              response.away.home.nohomegames,
                for_against: {
                    first_half_for:             response.away.home.hfhfor,
                    first_half_against:         response.away.home.hfhagainst,
                    second_half_for:            response.away.home.hshfor,
                    second_half_against:        response.away.home.hshagainst,
                    total_for:                  response.away.home.hhfor,
                    total_against:              response.away.home.hhagainst,
                },
                goals_pie: {
                    goals_0_1: {
                        matches:            response.away.home.hhgsum1,
                        percentage:         response.away.home.hhgsum1p * 100,
                        label:              "0-1"
                    },
                    goals_2_3: {
                        matches:            response.away.home.hhgsum2,
                        percentage:         response.away.home.hhgsum2p * 100,
                        label:              "2-3"
                    },
                    goals_4_6: {
                        matches:            response.away.home.hhgsum3,
                        percentage:         response.away.home.hhgsum3p * 100,
                        label:              "4-6"
                    },
                    goals_7: {
                        matches:            response.away.home.hhgsum4,
                        percentage:         response.away.home.hhgsum4p * 100,
                        label:              "7+"
                    }
                },
                bet_specific: {
                    total_goal_goal:            response.away.home.hbothteamsscoredp * 100,
                    first_half_goal_goal:       response.away.home.hhgs_gg_ahtcountp * 100,
                    second_half_goal_goal:      response.away.home.hhgs_gg_bhtcountp * 100,
                    true_goal_goal:             response.away.home.hhgs_trueggp * 100,
                    over_15_home:               response.away.home.hh15goalsforp * 100,
                    over_15_away:               response.away.home.hh15goalsagainstp * 100,
                    over_25_goal_goal:          response.away.home.hover_ggp * 100,
                    over_25_contribution:       response.away.home.hhgs_overcontribution * 100
                },
                scored_failedtoscore: {
                    first_half_for:             Math.floor(response.away.home.hscorefhalfp * 100),
                    first_half_against:         Math.floor(response.away.home.hhgsfailed_ahtp * 100),
                    second_half_for:            Math.floor(response.away.home.hscoreshalfp * 100),
                    second_half_against:        Math.floor(response.away.home.hhgsfailed_bhtp * 100),
                    total_for:                  Math.floor(response.away.home.hbothhalfsscoredp * 100),
                    total_against:              Math.floor(response.away.home.hfailedp * 100),
                },
                cleanSheet_condeded: {
                    first_half_for:             Math.floor(response.away.home.hfhcleanp * 100),
                    first_half_against:         Math.floor(response.away.home.hconcedefhalfp * 100),
                    second_half_for:            Math.floor(response.away.home.hshcleanp * 100),
                    second_half_against:        Math.floor(response.away.home.hconcedeshalfp * 100),
                    total_for:                  Math.floor(response.away.home.hftcleanp * 100),
                    total_against:              Math.floor(response.away.home.hbothhalfsconcededp * 100),
                },
                winLossDraw: {
                    half_time: {
                        win:                    Math.floor(response.away.results.homeht_winr * 100),
                        loss:                   Math.floor(response.away.results.homeht_loser * 100),
                        draw:                   Math.floor(response.away.results.homeht_squarer * 100),
                        draw_result:            Math.floor(response.away.home.hhfh00p * 100)
                    },
                    full_time: {
                        win:                    Math.floor(response.away.results.homeft_winr * 100),
                        loss:                   Math.floor(response.away.results.homeft_loser * 100),
                        draw:                   Math.floor(response.away.results.homeft_squarer * 100),
                        draw_result:            Math.floor(response.away.home.hhft00p * 100)
                    }
                },
                extraWinLossDraw: {
                    clean_sheet_win:            response.away.home.hhwontonil,
                    scoreless_defeat:           response.away.home.hhlosttonil
                }
            },
            away: {
                number_of_matches:              response.away.away.noawaygames,
                for_against: {
                    first_half_for:             response.away.away.afhfor,
                    first_half_against:         response.away.away.afhagainst,
                    second_half_for:            response.away.away.ashfor,
                    second_half_against:        response.away.away.ashagainst,
                    total_for:                  response.away.away.ahfor,
                    total_against:              response.away.away.ahagainst,
                },
                goals_pie: {
                    goals_0_1: {
                        matches:            response.away.away.hasum1,
                        percentage:         response.away.away.hasum1p * 100,
                        label:              "0-1"
                    },
                    goals_2_3: {
                        matches:            response.away.away.hasum2,
                        percentage:         response.away.away.hasum2p * 100,
                        label:              "2-3"
                    },
                    goals_4_6: {
                        matches:            response.away.away.hasum3,
                        percentage:         response.away.away.hasum3p * 100,
                        label:              "4-6"
                    },
                    goals_7: {
                        matches:            response.away.away.hasum4,
                        percentage:         response.away.away.hasum4p * 100,
                        label:              "7+"
                    }
                },
                bet_specific: {
                    total_goal_goal:        response.away.away.abothteamsscoredp * 100,
                    first_half_goal_goal:   response.away.away.haggg_ahalfp * 100,
                    second_half_goal_goal:  response.away.away.haggg_bhalfp * 100,
                    true_goal_goal:         response.away.away.hagstrueggp * 100,
                    over_15_home:           response.away.away.ha15goalsforp * 100,
                    over_15_away:           response.away.away.ha15goalsagainstp * 100,
                    over_25_goal_goal:      response.away.away.aover_ggp * 100,
                    over_25_contribution:   response.away.away.hags_overcontribution * 100
                },
                scored_failedtoscore: {
                    first_half_for:             Math.floor(response.away.away.ascorefhalfp * 100),
                    first_half_against:         Math.floor(response.away.away.afailed_fhp * 100),
                    second_half_for:            Math.floor(response.away.away.ascoreshalfp * 100),
                    second_half_against:        Math.floor(response.away.away.afailed_shp * 100),
                    total_for:                  Math.floor(response.away.away.abothhalfsscoredp * 100),
                    total_against:              Math.floor(response.away.away.afailedp * 100),
                },
                cleanSheet_condeded: {
                    first_half_for:             Math.floor(response.away.away.afhcleanp * 100),
                    first_half_against:         Math.floor(response.away.away.aconcedefhalfp * 100),
                    second_half_for:            Math.floor(response.away.away.ashcleanp * 100),
                    second_half_against:        Math.floor(response.away.away.aconcedeshalfp * 100),
                    total_for:                  Math.floor(response.away.away.aftcleanp * 100),
                    total_against:              Math.floor(response.away.away.abothhalfsconcededp * 100),
                },
                winLossDraw: {
                    half_time: {
                        win:                    Math.floor(response.away.results.awayht_winr * 100),
                        loss:                   Math.floor(response.away.results.awayht_loser * 100),
                        draw:                   Math.floor(response.away.results.awayht_squarer * 100),
                        draw_result:            Math.floor(response.away.away.hafh00p * 100)
                    },
                    full_time: {
                        win:                    Math.floor(response.away.results.awayft_winr * 100),
                        loss:                   Math.floor(response.away.results.awayft_loser * 100),
                        draw:                   Math.floor(response.away.results.awayft_squarer * 100),
                        draw_result:            Math.floor(response.away.away.haft00p * 100)
                    }
                },
                extraWinLossDraw: {
                    clean_sheet_win:            response.away.away.hawontonil,
                    scoreless_defeat:           response.away.away.halosttonil
                }
            },
            sum: {
                number_of_matches:              response.away.total.totalgames,
                for_against: {
                    first_half_for:             response.away.total.tfhfor,
                    first_half_against:         response.away.total.tfhagainst,
                    second_half_for:            response.away.total.tshfor,
                    second_half_against:        response.away.total.tshagainst,
                    total_for:                  response.away.total.tfor,
                    total_against:              response.away.total.tagainst,
                },
                goals_pie: {
                    goals_0_1: {
                        matches:            response.away.total.tsum1,
                        percentage:         response.away.total.tsum1p * 100,
                        label:              "0-1"
                    },
                    goals_2_3: {
                        matches:            response.away.total.tsum2,
                        percentage:         response.away.total.tsum2p * 100,
                        label:              "2-3"
                    },
                    goals_4_6: {
                        matches:            response.away.total.tsum3,
                        percentage:         response.away.total.tsum3p * 100,
                        label:              "4-6"
                    },
                    goals_7: {
                        matches:            response.away.total.tsum4,
                        percentage:         response.away.total.tsum4p * 100,
                        label:              "7+"
                    }
                },
                bet_specific: {
                    total_goal_goal:        response.away.total.tggp * 100,
                    first_half_goal_goal:   response.away.total.tggahtp * 100,
                    second_half_goal_goal:  response.away.total.tggbhtp * 100,
                    true_goal_goal:         response.away.total.ttrueggp * 100,
                    over_15_home:           response.away.total.t15goalsforp * 100,
                    over_15_away:           response.away.total.t15goalsagainstp * 100,
                    over_25_goal_goal:      response.away.total.tover_ggp * 100,
                    over_25_contribution:   response.away.total.tovercontribution * 100
                },
                scored_failedtoscore: {
                    first_half_for:             Math.floor(response.away.total.tscorefhalfp * 100),
                    first_half_against:         Math.floor(response.away.total.tfailed_fhp * 100),
                    second_half_for:            Math.floor(response.away.total.tscoreshalfp * 100),
                    second_half_against:        Math.floor(response.away.total.tfailed_shp * 100),
                    total_for:                  Math.floor(response.away.total.tbothhalfsscoredp * 100),
                    total_against:              Math.floor(response.away.total.tfailedp * 100),
                },
                cleanSheet_condeded: {
                    first_half_for:             Math.floor(response.away.total.tfhcleanp * 100),
                    first_half_against:         Math.floor(response.away.total.tconcedefhalfp * 100),
                    second_half_for:            Math.floor(response.away.total.tshcleanp * 100),
                    second_half_against:        Math.floor(response.away.total.tconcedeshalfp * 100),
                    total_for:                  Math.floor(response.away.total.tftcleanp * 100),
                    total_against:              Math.floor(response.away.total.tbothhalfsconcededp * 100),
                },
                winLossDraw: {
                    half_time: {
                        win:                    Math.floor(response.away.results.totalhtwinp * 100 ),
                        loss:                   Math.floor(response.away.results.totalhtlosep * 100 ),
                        draw:                   Math.floor(response.away.results.totalhtsquarep * 100 ),
                        draw_result:            Math.floor(response.away.total.tfh00p * 100)
                    },
                    full_time: {
                        win:                    Math.floor(response.away.results.totalftwinp * 100 ),
                        loss:                   Math.floor(response.away.results.totalftlosep * 100 ),
                        draw:                   Math.floor(response.away.results.totalftsquarep * 100 ),
                        draw_result:            Math.floor(response.away.total.tft00p * 100)
                    }
                },
                extraWinLossDraw: {
                    clean_sheet_win:            response.away.total.twontonil,
                    scoreless_defeat:           response.away.total.tlosttonil
                }
            }
        };
        const result = {
            home:   home_response,
            away:   away_response
        };
        commit("saveH2H", result);
    } catch(e) {
        commit("saveH2H", null);
    }
};

const sendGameTip = async ({ commit, dispatch }, payload) => {    
    try {
        const message = `{
            "pushslip":
                ${JSON.stringify(payload)}
            
        }`;
 
        setTimeout(() =>{
            Socket.send(message);
            dispatch("user/fetchUserBank", "", { root:true });
        }, 500);
        

    } catch(e) {
       return false;        
    }
};

export default {
    gameInfo,
    fetch_h2h,
    sendGameTip,
};

