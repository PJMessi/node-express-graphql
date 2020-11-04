<template>
  <div class="event">
    <pageHeader :breadcrumbs="Breadcrumbs">
      <h4 slot="title">All Event</h4>
      <button
        slot="rightSection"
        class="btn btn-primary"
        data-toggle="modal"
        :data-target="`#${addEventModalId}`"
      >
        Add New
      </button>
    </pageHeader>

    <modal :modalId="addEventModalId">
      <h4 slot="header">Add Event</h4>

      <form slot="body" @submit.prevent="createEvent()" id="createEventForm">
        <div class="form-group row">
          <label class="col-sm-12 col-md-2 col-form-label">Title</label>
          <div class="col-sm-12 col-md-10">
            <input
              v-model="newEvent.title"
              class="form-control"
              type="text"
              placeholder="Title here"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-12 col-md-2 col-form-label">Description</label>
          <div class="col-sm-12 col-md-10">
            <textarea
              v-model="newEvent.description"
              class="form-control"
              placeholder="Description here"
              type="search"
            ></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-12 col-md-2 col-form-label">Price</label>
          <div class="col-sm-12 col-md-10">
            <input
              v-model="newEvent.price"
              class="form-control"
              placeholder="Price here"
              type="number"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-12 col-md-2 col-form-label">Date</label>
          <div class="col-sm-12 col-md-10">
            <input
              v-model="newEvent.date"
              class="form-control"
              placeholder="Select date"
              type="date"
            />
          </div>
        </div>
      </form>
      <button slot="footer" class="btn btn-primary" @click="createEvent()">
        Create
      </button>
    </modal>
  </div>
</template>

<script>
import pageHeader from "../components/resuable/pages_component/pageHeader";
import modal from "../components/resuable/modals/modal";

export default {
  name: "Event",

  components: { pageHeader, modal },

  data() {
    return {

      addEventModalId: "addEventModal",

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
        ],
      },

      newEvent: {
        title: "",
        description: "",
        price: "",
        date: "",
      },
    };
  },

  methods: {
    createEvent: function () {
      const requestBody = {
        query: `
          mutation {
            createEvent(eventInput:{
              title: "${this.newEvent.title}", 
              description: "$${this.newEvent.description}", 
              price: ${+this.newEvent.price}, 
              date: "${this.newEvent.date}"}
            ) {
              _id, title, description, price, date
            }
          }
        `,
      };

      this.$axios({
        url: "http://localhost:3000/graphql",
        data: requestBody,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res);
          this.$Toast.fire({
            icon: "success",
            title: 'Event added.',
          });
          this.newEvent = {title: "", description: "", price: "", date: ""}
        })
        .catch((err) => {
          const errorMessage = err.response.data.errors[0].message
          this.$Toast.fire({
            icon: "error",
            title: errorMessage,
          });
        });
    },
  },
};
</script>
