<template>
  <div id="app" :class="{ 'login-page': getCurrentRoute() == 'Login' }">
    <Preloader v-if="false" />

    <Header v-show="getCurrentRoute() != 'Login'" />

    <RightSidebar v-show="getCurrentRoute() != 'Login'" />

    <LeftSidebar v-show="getCurrentRoute() != 'Login'" />

    <div
      v-show="getCurrentRoute() != 'Login'"
      class="mobile-menu-overlay"
    ></div>

    <div v-if="getCurrentRoute() != 'Login'" class="main-container">
      <div class="pd-ltr-20">
        <router-view />
        <Footer v-if="false" />
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import Footer from "@/components/Footer.vue";
import Preloader from "@/components/Preloader";

export default {
  components: {
    Header,
    LeftSidebar,
    RightSidebar,
    Footer,
    Preloader,
  },

  methods: {
    getCurrentRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style>
</style>
