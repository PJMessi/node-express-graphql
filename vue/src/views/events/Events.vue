<template>
    <div class="events">
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
                        <td>{{ event._id }}</td>
                        <td>{{ event.title }}</td>
                        <td>{{ event.date }}</td>
                        <td>Rs. {{ event.price }}</td>
                        <td>{{ event.creator.email }}</td>
                    </tr>
                </tbody>
            </table>
        </pageBody>

        <addEvent
            :addEventModalId="addEventModalId"
            @eventAdded="appendAddedEvent"
        />
    </div>
</template>

<script>
import pageHeader from "../../components/resuable/pages_component/pageHeader";
import pageBody from "../../components/resuable/pages_component/pageBody";
import addEvent from "./AddEvent";

export default {
    name: "Events",

    components: { pageHeader, pageBody, addEvent },

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
        };
    },

    methods: {
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
                const eventsList = res.data.data.events;
                this.eventsList = eventsList;
            })
            .catch((err) => {
                const errorMessage = err.response.data.errors[0].message;

                // generating error message.
                this.$Toast.fire({
                    icon: "error",
                    title: 'Failed to fetch events.',
                });

                console.log(errorMessage)
            });
        },

        appendAddedEvent: function (newEvent) {
            this.eventsList.push(newEvent);
        },
    },
};
</script>
