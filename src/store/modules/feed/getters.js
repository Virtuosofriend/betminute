const listsOver1_5ft = state => state.listsOver1_5ft;
const listsOver0_5ht = state => state.listsOver0_5ht;
const listsOver0_5secondhalf = state => state.listsOver0_5secondhalf;
const topTipsters = state => state.topTipsters;

const livescore = state => state.livescore;
const notStarted = state => state.notStarted;
const liveAndnotStarted = state => {

    let feed = state.livescore.concat(state.notStarted);
    const filter = state.filter_feed;
    const fav_games = state.favorite_games_ids;

    if ( fav_games.length > 0 ) {
        feed.filter(elem => {
            elem.favorite = false;

            fav_games.forEach(favorite => {
                if ( favorite == elem.id ) {
                    elem.favorite = true;
                }
            });
        });
    }

    if ( filter != "" ) {
        let results = [];

        results = feed.filter(elem => elem.filters[filter]);

        return results;
    }
    
    return feed;
}
const finished = state => state.finished;

const LiveUpcomingUnfiltered = state => {
  return state.livescore.concat(state.notStarted);
};

const favoriteFeed = state => {
    const feed = state.livescore.concat(state.notStarted);
    const fav_games = state.favorite_games_ids || [];

    let results = [];
    if ( fav_games.length > 0 ) {
        feed.filter(elem => {
            fav_games.forEach(games => {
                if ( elem.id == games ) {
                    results.push(elem);
                }
            })
        });
    }

    return results;
}

export default {
    favoriteFeed,
    finished,
    listsOver1_5ft,
    listsOver0_5ht,
    listsOver0_5secondhalf,
    livescore,
    liveAndnotStarted,
    LiveUpcomingUnfiltered,
    notStarted,
    topTipsters
};