import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
        options: {
          customProperties: true,
        },
      themes: {
        light: {
            primary:    		"#fff",
            dark:               "#363D44",
            dark_subtitle:      "#727c86",
            dark_border:        "#2b3339",
            secondary:  		"#181e23",
            accent:     		"#2c343a",
            error:      		"#e91b2e",
            info:       		"#5F86A3",
            success:    		"#4bb288",
            warning:    		"#A24E3D",
            background: 		"#181e23",
		    sidebar:    		"#16191c",
            yellowWarning:	    "#f9f871",
            orange:             "#A24E3D"
        },
        dark: {
          primary: "#ff6768",
          secondary: "#263859",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background: "#17223b"
        }
      }
    },
    icons: {
        iconfont: "fa",
      },
});
