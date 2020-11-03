<template>
  <div class="event">
    <pageHeader :breadcrumbs="Breadcrumbs">
      <h4 slot="title">All Bookings</h4>
    </pageHeader>
  </div>
</template>

<script>
import pageHeader from "../components/resuable/pages_component/pageHeader";
export default {
  name: "Booking",

  components: { pageHeader },

  data() {
    return {
      Breadcrumbs: {
        items: [
          {
            isActive: false,
            route: "/",
            title: "Home",
          }, 
          {
            isActive: true,
            route: null,
            title: "All Bookings",
          }, 
        ]
      }
    }
  }
};
</script>
