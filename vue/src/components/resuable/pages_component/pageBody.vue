<template>
  <div class="resuablePageBody">
    <div class="pd-20 card-box mb-30">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResuablePageBody",

  props: {
    breadcrumbs: Object,
  },
};
</script>