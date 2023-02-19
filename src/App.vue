<template>
  <!-- <div class=""> -->
  <!-- Header -->
  <app-header />
  <!-- MAIN -->
  <router-view></router-view>
  <!-- Player -->
  <app-player />
  <!-- Authintaction -->
  <app-auth   />
  <!-- </div> -->
</template>
<script>
import AppHeader from "./components/AppHeader.vue";
import AppAuth from "./components/AppAuth.vue";
import { mapWritableState } from "pinia";
import useUserStore  from "@/stores/user";
import { auth } from "./includes/firebase";
import appPlayer from "./components/Player.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    appPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created ()
  {
    if ( auth.currentUser )
    {
      this.userLoggedIn = true;
    }
  }
};
</script>
