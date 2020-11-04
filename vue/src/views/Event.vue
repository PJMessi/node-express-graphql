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

    <pageBody>
      <div slot="body" class="clearfix mb-20">
        <div class="pull-left">
          <p>List of all events</p>
        </div>
      </div>
      <table slot="body" class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Creator</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in eventsList" :key="event._id">
            <td>{{event._id}}</td>
            <td>{{event.title}}</td>
            <td>{{event.date}}</td>
            <td>Rs. {{event.price}}</td>
            <td>{{event.creator.email}}</td>
          </tr>
        </tbody>
      </table>
    </pageBody>

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
import pageBody from "../components/resuable/pages_component/pageBody";
import modal from "../components/resuable/modals/modal";

export default {
  name: "Event",

  components: { pageHeader, pageBody, modal },

  created() {
    this.fetchEvents();
  },

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

      eventsList: [],

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
              _id, title, description, price, date, creator{_id, email}
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
          this.eventsList.push(res.data.data.createEvent)
          this.$Toast.fire({
            icon: "success",
            title: "Event added.",
          });
          this.newEvent = { title: "", description: "", price: "", date: "" };
        })
        .catch((err) => {
          const errorMessage = err.response.data.errors[0].message;
          this.$Toast.fire({
            icon: "error",
            title: errorMessage,
          });
        });
    },

    fetchEvents: function () {
      const requestBody = {
        query: `
          query {
            events {
              _id, title, price, description, date, creator {_id, email}
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
          this.eventsList = res.data.data.events;
        })
        .catch((err) => {
          const errorMessage = err.response.data.errors[0].message;
          this.$Toast.fire({
            icon: "error",
            title: errorMessage,
          });
        });
    },
  },
};
</script>
