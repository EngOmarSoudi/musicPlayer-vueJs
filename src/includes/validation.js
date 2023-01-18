import {
  Form as veeForm,
  Field as veeFieled,
  defineRule,
  ErrorMessage,
  configure,
  validate,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";
export default {
  install(app) {
    app.component("veeForm", veeForm);
    app.component("veeField", veeFieled);
    app.component("ErrorMessage", ErrorMessage);
    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minVal);
    defineRule("max_value", maxVal);
    defineRule("confirmed", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The ${ctx.field} field is required.`,
          min: `The ${ctx.field} field must be biger than ${ctx.value.length} characters.`,
          max: `The ${ctx.field} field must be less than ${ctx.value.length} characters.`,
          alpha_spaces: `The ${ctx.field} field may only contain alphabetic characters and spaces.`,
          email: `The ${ctx.field} field must be a valid email.`,
          min_value: `The ${ctx.field} field must be biger than ${ctx.value}.`,
          max_value: `The ${ctx.field} field must be less than ${ctx.value}.`,
          confirmed: `The ${ctx.field} field confirmation does not match.`,
          excluded: `The ${ctx.field} field is not a valid value.`,
          country_excluded: `We do not accept users from ${ctx.value} yet.`,
          tos: `You must agree to the terms and conditions.`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The ${ctx.field} field is not valid.`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true,
      
    } );
    

  },
};
