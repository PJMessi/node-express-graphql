<template>
  <div class="event">
    <pageHeader :breadcrumbs="Breadcrumbs">
      <slot name="title">Events</slot>
    </pageHeader>
  </div>
</template>

<script>
import pageHeader from "../components/resuable/pages_component/pageHeader";
export default {
  name: "Event",

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
            title: "All Events",
          }, 
        ]
      }
    }
  }
};
</script>
