const listsOver1_5ft = state => state.listsOver1_5ft;
const listsOver0_5ht = state => state.listsOver0_5ht;
const listsOver0_5secondhalf = state => state.listsOver0_5secondhalf;
const topTipsters = state => state.topTipsters;

const livescore = state => state.livescore;
const notStarted = state => state.notStarted;
const liveAndnotStarted = state => {

    const feed = state.livescore.concat(state.notStarted);
    const filters = state.filter_feed;
    
    if ( filters.length > 0 ) {
        let results = [];

        feed.forEach(elem => {
            filters.forEach(filter => {
                if ( elem.filters[filter] ) {
                    results.push(elem);
                }
            });
        });

        return results;
    }
    
    return feed;
}
const finished = state => state.finished;

const allGames = state => {
  return state.livescore.concat(state.finished).concat(state.notStarted);
};


export default {
    allGames,
    finished,
    listsOver1_5ft,
    listsOver0_5ht,
    listsOver0_5secondhalf,
    livescore,
    liveAndnotStarted,
    notStarted,
    topTipsters
};