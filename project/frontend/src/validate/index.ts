import Vue from "vue";
import VeeValidate, {
  ValidationProvider,
  ValidationObserver,
  extend,
  setInteractionMode,
} from "vee-validate";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

import {
  email,
  required,
  min,
  regex,
  confirmed,
  length,
  digits,
} from "vee-validate/dist/rules";

extend("length", {
  ...length,
  message: "Wrong length",
});

extend("email", {
  ...email,
  message: "Insert a valid email",
});

extend("required", {
  ...required,
  message: "This field is required",
});

extend("digits", {
  ...digits,
  message: "Wrong number of digits",
});

extend("confirmed", {
  ...confirmed,
  message: "Password should be equal",
});

// extend("min", {
//   ...min,
//   message: i18n.t("validate.min") as string,
// });
//
//
// extend("number", {
//   ...regex,
//   message: i18n.t("validate.number") as string,
//   validate: (value: string) => (value ? value.match(/[0-9]/g) !== null : true),
// });
//
// extend("uppercase", {
//   ...regex,
//   message: i18n.t("validate.uppercase") as string,
//   validate: (value: string) => (value ? value.match(/[A-Z]/g) !== null : true),
// });
//
// extend("special", {
//   ...regex,
//   message: i18n.t("validate.special") as string,
//   validate: (value: string) => (value ? value.match(/\W|_/g) !== null : true),
// });
//
// const strongPasswordRegex =
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})";
// extend("strong_password", {
//   message: i18n.t("validate.strongPassword") as string,
//   validate: (value: string) => {
//     return new RegExp(strongPasswordRegex).test(value);
//   },
// });
//
// const urlRegex =
//   "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
// extend("url", {
//   message: i18n.t("validate.url") as string,
//   validate: (value: string) => {
//     return new RegExp(urlRegex).test(value);
//   },
// });
//
// const ampmRegex = "^(((0[1-9])|(1[0-2])):([0-5])([0-9])\\s(A|P)M)";
// extend("ampm", {
//   message: i18n.t("validate.ampm") as string,
//   validate: (value: string) => {
//     return new RegExp(ampmRegex).test(value);
//   },
// });