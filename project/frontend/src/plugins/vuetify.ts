import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        primary: "#FF3C2A",
        accent: "#FF3C2A",
        secondary: "#C0AFAE",
        success: "#18C967",
        info: "#0C93F4",
        warning: "#F9A718",
        error: "#FF651E"
      },
      light: {
        primary:  {
          darken4: "#022A75",
          darken3: "#033C8D",
          darken2: "#0655AF",
          darken1: "#0872D1",
          base: "#0C93F4",
          lighten1: "#47B8F8",
          lighten2: "#6CD0FB",
          lighten3: "#9DE6FD",
          lighten4: "#CEF5FE",
          lighten5: "#E9FBFF"
        },
        accent: "#0872D1",
        secondary: {
          darken4: "#212121",
          darken3: "#424242",
          darken2: "#616161",
          darken1: "#757575",
          base: "#9E9E9E",
          lighten1: "#BDBDBD",
          lighten2: "#E0E0E0",
          lighten3: "#EEEEEE",
          lighten4: "#F5F5F5",
          lighten5: "#FAFAFA"
        },
        success: {
          darken4: "#03625C",
          darken3: "#057764",
          darken2: "#08946E",
          darken1: "#0BB174",
          base: "#18C967",
          lighten1: "#45E188",
          lighten2: "#6BF097",
          lighten3: "#9DFAB3",
          lighten4: "#CDFCD4",
          lighten5: "#F1FDF7"
        },
        info: {
          darken4: "#022A75",
          darken3: "#033C8D",
          darken2: "#0655AF",
          darken1: "#0872D1",
          base: "#0C93F4",
          lighten1: "#47B8F8",
          lighten2: "#6CD0FB",
          lighten3: "#9DE6FD",
          lighten4: "#CEF5FE",
          lighten5: "#E9FBFF"
        },
        warning: {
          darken4: "#773C04",
          darken3: "#904F07",
          darken2: "#B3690C",
          darken1: "#D68711",
          base: "#F9A718",
          lighten1: "#FBC351",
          lighten2: "#FDD573",
          lighten3: "#FEE7A2",
          lighten4: "#FEF4D0",
          lighten5: "#FFF9E5"
        },
        error: {
          darken4: "#7A0B05",
          darken3: "#931909",
          darken2: "#B72E0F",
          darken1: "#DB4715",
          base: "#FF651E",
          lighten1: "#FF9656",
          lighten2: "#FFB478",
          lighten3: "#FFD3A4",
          lighten4: "#FFECD2",
          lighten5: "#FFF7EC"
        },
        body: "#FAFAFB",
        white: "#FFFFFF"
      }
    }
  },
  icons: {
    iconfont: "mdi" || "fa4" || "md" || "fa"
  }
});
