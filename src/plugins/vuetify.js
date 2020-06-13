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
          primary:    '#2196F3',
          secondary:  '#2c343a',
          accent:     '#5F86A3',
          error:      '#aa2e38',
          info:       '#2196F3',
          success:    '#4bb288',
          warning:    '#A24E3D',
          background: "#181e23",
          sidebar:    "#16191c"
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
