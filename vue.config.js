process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
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