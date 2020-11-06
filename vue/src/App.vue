<template>
  <div id="app" :class="{ 'login-page': (getCurrentRoute() == 'Login' && getCurrentRoute() == 'Register') }">
    <vue-progress-bar></vue-progress-bar>

    <Preloader v-if="false" />

    <Header v-show="(getCurrentRoute() != 'Login' && getCurrentRoute() != 'Register')" />

    <RightSidebar v-show="(getCurrentRoute() != 'Login' && getCurrentRoute() != 'Register')" />

    <LeftSidebar v-show="(getCurrentRoute() != 'Login' && getCurrentRoute() != 'Register')" />

    <div
      v-show="(getCurrentRoute() != 'Login' && getCurrentRoute() != 'Register')"
      class="mobile-menu-overlay"
    ></div>

    <div v-if="(getCurrentRoute() != 'Login' && getCurrentRoute() != 'Register')" class="main-container">
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

  created() {
    this.interceptAxios401()
  },

  methods: {
    getCurrentRoute() {
      return this.$route.name;
    },

    interceptAxios401() {
      let store = this.$store
      let router = this.$router

      // Intercepting axios request.
      this.$axios.interceptors.request.use(config => {
          this.$Progress.start(); // Starting progressbar.
          return config;
      });

      // Intercepting axios response.
      this.$axios.interceptors.response.use(

        // intercepting success response.
        (response) => {
          this.$Progress.finish(); // Finishing progressbar.
          return Promise.resolve(response);
        },

        // intercepting failed response.
        (error) => {
          this.$Progress.fail() // Failing Progressbar.

          // if authentication error, resetting auth tokend and redirecting to login page.
          if (401 === error.response.status) {
            store.dispatch('reset')
            router.push('/login')

          } else {
            return Promise.reject(error);
          }
        }  
      );

    }
  }
};
</script>

<style>
</style>
