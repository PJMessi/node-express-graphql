<template>
  <div class="home">
    <pageHeader :breadcrumbs="Breadcrumbs">
      <slot name="title">Home</slot>
    </pageHeader>
  </div>
</template>

<script>
import pageHeader from "../components/resuable/pages_component/pageHeader";
export default {
  name: "Home",

  components: { pageHeader },

  data() {
    return {
      Breadcrumbs: {
        items: [
          {
            isActive: true,
            route: null,
            title: "Home",
          },
        ],
      },
    };
  },
};
</script>
