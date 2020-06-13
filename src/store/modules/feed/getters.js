const information = state => state.user;
const banka = state => state.banka;

const listsOver1_5ft = state => state.listsOver1_5ft;
const listsOver0_5ht = state => state.listsOver0_5ht;
const listsOver0_5secondhalf = state => state.listsOver0_5secondhalf;
const topTipsters = state => state.topTipsters;

const livescore = state => state.livescore;
const notStarted = state => state.notStarted;
const liveAndnotStarted = state => {
  return state.livescore.concat(state.notStarted);
}
const finished = state => state.finished;

export default {
  information,
  banka,
  listsOver1_5ft,
  listsOver0_5ht,
  listsOver0_5secondhalf,
  topTipsters,
  livescore,
  notStarted,
  finished,
  liveAndnotStarted
};