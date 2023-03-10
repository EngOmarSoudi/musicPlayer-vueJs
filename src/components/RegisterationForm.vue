<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    @submit="register"
    :validation-schema="schema"
    :initial-values="userDate"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.username") }}</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage name="name" class="text-red-400" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.email") }}</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-400" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.age") }}</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="age" class="text-red-400" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.password") }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          name="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>

      <!-- <ErrorMessage name="password" class="text-red-400" /> -->
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.password_confirmation") }}</label>
      <vee-field
        type="password"
        name="password_confirmation"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="password_confirmation" class="text-red-400" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.country") }}</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <ErrorMessage name="country" class="text-red-400" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t class="inline-block" keypath="register.accept_tos" tag="label"
      >
    <a href="#">{{ $t("register.tos") }}</a>
    </i18n-t>
      <ErrorMessage name="tos" class="text-red-400 block" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
    {{ $t("register.submit") }}
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
export default {
  name: "RegisterationForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:20|alpha_spaces",
        email: "required|email",
        age: "required|min_value:18|max_value:130",
        password: "required|min:5|max:30|excluded:password",
        password_confirmation: "required|confirmed:@password",
        country: "required|country_excluded:Antartica",
        tos: "tos",
      },
      userDate: {
        name: "",
        email: "",
        age: "",
        password: "",
        password_confirmation: "",
        country: "USA",
        tos: "",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-green-500",
      reg_alert_msg: "please wait...",
    };
  },
  methods: {
    // register method is used to register the user
    ...mapActions(useUserStore, { createUser: "register" }),
    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = "please wait...";
      // let userCred = null;

      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg = "an unexpected error occured. " + error.message;
        return;
      }
      
      this.reg_alert_msg = "Registration Successful";
      this.reg_alert_variant = "bg-green-500";
      window.location.reload();
    },
  },
};
</script>
