<template>
  <div class="leftsidebar">
    <div class="left-side-bar">
      <div class="brand-logo">
        <router-link to="/">
          <img src="vendors/images/deskapp-logo.svg" alt="" class="dark-logo" />
          <img
            src="vendors/images/deskapp-logo-white.svg"
            alt=""
            class="light-logo"
          />
        </router-link>
        <div class="close-sidebar" data-toggle="left-sidebar-close">
          <i class="ion-close-round"></i>
        </div>
      </div>
      <div class="menu-block customscroll">
        <div class="sidebar-menu icon-list-style-4">
          <ul id="accordion-menu">
            <li class="dropdown">
              <a href="javascript:;" class="dropdown-toggle">
                <span class="micon icon-copy ti-pin2"></span
                ><span class="mtext">Bookings</span>
              </a>
              <ul class="submenu">
                <li>
                  <router-link to="/bookings" exact-active-class="active"
                    >All Bookings</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="javascript:;" class="dropdown-toggle">
                <span class="micon dw dw-calendar1"></span
                ><span class="mtext">Events</span>
              </a>
              <ul class="submenu">
                <li>
                  <router-link to="/events" exact-active-class="active"
                    >All Events</router-link
                  >
                </li>
              </ul>
            </li>

            <!-- <li>
              <router-link to="/users" class="dropdown-toggle no-arrow" exact-active-class="active" active-class="active">
                <i class="micon icon-copy dw dw-user-13"></i><span class="mtext">Users</span>
              </router-link>
            </li> -->

            <li><div class="dropdown-divider"></div></li>

            <li>
              <a
                href="#"
                @click.prevent="logoutUser()"
                class="dropdown-toggle no-arrow"
              >
                <span class="micon icon-copy ti-power-off"></span
                ><span class="mtext">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LeftSidebar",

  data() {
    return {
     
    };
  },

  methods: {
    ...mapActions(["logout"]),

    logoutUser() {
      this.logout();

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>
