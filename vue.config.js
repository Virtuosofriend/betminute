process.env.VUE_APP_VERSION = require("./package.json").version;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = {
    configureWebpack: smp.wrap({
        plugins: []
    }),
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
        .plugin("html")
        .tap(args => {
            args[0].title = "BetMinute - Live betting service";
            return args;
        })
  }
}