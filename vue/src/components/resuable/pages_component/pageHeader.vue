<template>
  <div class="resuablePageHeader">
    <div class="page-header">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="title">
            <slot name="title"></slot>
          </div>

          <nav aria-label="breadcrumb" role="navigation">
            <ol class="breadcrumb">
              <li
                v-for="item in breadcrumbs.items"
                v-bind:key="item.title"
                class="breadcrumb-item"
                :class="{ active: item.isActive }"
                :aria-current="{ page: item.isActive }"
              >
                <router-link v-if="!item.isActive" :to="item.route">{{
                  item.title
                }}</router-link>
                <span v-else>{{ item.title }}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div class="col-md-6 col-sm-12 text-right">
          <slot name="rightSection">
            <button type="button" class="btn btn-primary">Some button</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResuablePageHeader",

  props: {
    breadcrumbs: Object,
  },
};
</script>