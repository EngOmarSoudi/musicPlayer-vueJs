<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="bg-gray-700 shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex space-x-7">
            <div>
              <!-- Website Logo -->
              <router-link
                :to="{ name: 'home' }"
                exact-active-class="no-active"
                class="flex items-center py-4 px-2 ml-5"
              >
                <!-- <img src="logo.png" alt="Logo" class="" /> -->
                <span class="h-8 w-8 mr-2 font-semibold text-white text-lg">{{
                  $t("header.music")
                }}</span>
              </router-link>
            </div>
            <!-- Primary Navbar items -->
            <div class="hidden md:flex items-center space-x-1">
              <router-link
                :to="{ name: 'about' }"
                class="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
              >
                {{ $t("header.about") }}</router-link
              >
              <templeta v-if="userStore.userLoggedIn">
                <router-link
                  :to="{ name: 'manage' }"
                  class="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
                  >{{ $t("header.manage") }}</router-link
                >
              </templeta>
            </div>
          </div>
          <!-- Secondary Navbar items -->
          <div class="hidden md:flex items-center space-x-3">
            <!-- <label for="locale" class="text-white mr-5 mt-2">Langage</label> -->

            <div v-if="userStore.userLoggedIn">
              <a
                href="#"
                class="py-4 px-2 text-green-400 font-semibold hover:text-green-500 transition duration-300"
                @click.prevent="logout"
                >{{ $t("header.logout") }}</a
              >
            </div>
            <div v-if="!userStore.userLoggedIn">
              <!-- <a
                href=""
                class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                @click.prevent="toggleAuthModal"
                > </a
              > -->
              <a
                href=""
                class="py-2 px-2 fit font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                @click.prevent="toggleAuthModal"
                > {{ $t("header.login") }}/{{ $t("header.register") }}</a
              >
            </div>
            <select
              @click="changeLocale"
              v-model="currentloca"
              class="bg-gray-800 border border-gray-900 text-white text-sm rounded-lg focus:ring-blue-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="fr">Franch</option>
              <option value="sp">Spanish</option>
            </select>
          </div>
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <div v-if="userStore.userLoggedIn">
              <a
                href="#"
                class="py-4 px-2 text-green-400 font-semibold hover:text-green-500 transition duration-300"
                @click.prevent="logout"
                >{{ $t("header.logout") }}</a
              >
            </div>
            <div v-if="!userStore.userLoggedIn">
              <!-- <a
                href=""
                class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                @click.prevent="toggleAuthModal"
                > </a
              > -->
              <a
                href=""
                class="py-2 px-2 fit font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                @click.prevent="toggleAuthModal"
                > {{ $t("header.login") }}/{{ $t("header.register") }}</a
              >
            </div>
            <button @click.prevent="s" class="outline-none mobile-menu-button">
              <svg
                class="w-6 h-6 text-gray-500 hover:text-green-500"
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- mobile menu -->
      <div class="hidden mobile-menu">
        <ul class="">
          <!-- <li class="active"> -->
            <!-- <router-link
              :to="{ name: 'home' }"
              exact-active-class="no-active"
              class="block text-sm px-2 py-4 text-white font-semibold"
              >{{ $t("header.music") }}</router-link
            > -->
          <!-- </li> -->
          <li>
            <router-link
            :to="{ name: 'about' }"
            @click.prevent="s"
              class="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300"
              > {{ $t("header.about") }}</router-link
            >
          </li>
          <li v-if="userStore.userLoggedIn">
            <router-link
            @click.prevent="s"
            :to="{ name: 'manage' }"
              class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
              >{{
                $t("header.manage")
              }}</router-link
            >
          </li>
          <li>
            
            <select
              @click="changeLocale"
              v-model="currentloca"
              class="bg-gray-800 border border-gray-900 text-white text-sm rounded-lg focus:ring-blue-900 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose Language</option>
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="fr">Franch</option>
              <option value="sp">Spanish</option>
            </select>
          </li>
          
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
    s() {
      // const btn = document.querySelector( "button.mobile-menu-button" );
      const menu = document.querySelector(".mobile-menu");
      // addEventListener("click", () => {
      menu.classList.toggle("hidden");
      // });
    },

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
