import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
          customProperties: true,
        },
      themes: {
        light: {
          primary: '#0f8deb',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#ff6768',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: "#181e23"
        },
        dark: {
          primary: '#ff6768',
          secondary: '#263859',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: "#17223b"
        }
      }
    },
    icons: {
        iconfont: 'fa',
      },
});
