import { Form as veeForm, Field as veeFieled,defineRule,ErrorMessage } from "vee-validate";
import {required} from "@vee-validate/rules";
export default {
    install ( app )
    {
        app.component( "veeForm", veeForm );
        app.component( "veeField", veeFieled );
        app.component( "ErrorMessage", ErrorMessage );
        defineRule( "required", required );
  },
};
