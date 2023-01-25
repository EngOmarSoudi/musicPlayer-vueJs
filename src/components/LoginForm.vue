<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="LoginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-400" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-400" />
    </div>
    <button
        :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user';
export default {
  name: "LoginForm",
  data() {
    return {
      LoginSchema: {
        // LoginSchema is used to validate the login form
        email: "required|email", // email is required and should be a valid email
        password: "required", // password is required and should be between 10 to 30 characters
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: "bg-green-500",
      login_alert_msg: "please wait...",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["loginAuthintication"]),
    // login method is used to login the user
    async login(value) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = "bg-green-500";
      this.login_alert_msg = "please wait...";
      try {
        await this.loginAuthintication(value);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-red-500";
        this.login_alert_msg = 'Invalid login ' + error.message;
        return;
      }
      this.login_alert_msg = "login Successful";
      this.login_alert_variant = "bg-green-500";
      window.location.reload();
      //   this.modalVisibility = false;// modalVisibility is used to hide the modal
    },
  },
};
</script>
