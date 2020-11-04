<template>
  <div class="resuableModal">
    <div
      class="modal fade"
      :id="modalId"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>

            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResuableModal",

  props: ["modalId"],
};
</script>