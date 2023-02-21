<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        {{ $t("header.music") }}
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->

        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">
              {{ $t("header.about") }}
            </router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a @click.prevent="toggleAuthModal" class="px-2 text-white" href="#"
              >{{ $t("header.login") }} / {{ $t("header.register") }}</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">{{
                $t("header.manage")
              }}</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="logout">{{
                $t("header.logout")
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto flex">
          <label for="locale" class="text-white mr-5 mt-2">Langage</label>
          <select
            @click="changeLocale"
            v-model="currentloca"
            class="bg-gray-800 border border-gray-900 text-white text-sm rounded-lg focus:ring-blue-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option  value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="fr">Franch</option>
            <option value="sp">Spanish</option>
          </select>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
export default {
  name: "AppHeader",
  props: {
    // currentLocale: String,
  },
  data() {
    return {
      currentloca: [],
    };
  },
  computed: {
    ...mapStores(useModalStore, useUserStore),
    
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      
    },
    async logout() {
      await this.userStore.sinOut();
      // window.location.reload();
      // console.log(this.$route)
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      
      if (this.currentloca === "en") {
        this.$i18n.locale = "en";
      }
      if (this.currentloca === "ar") {
        this.$i18n.locale = "ar";
      }
      if (this.currentloca === "fr") {
        this.$i18n.locale = "fr";
      }
      if (this.currentloca === "sp") {
        this.$i18n.locale = "sp";
      }
    },
  },
};
</script>
