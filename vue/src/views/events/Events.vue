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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-if="eventsList.length > 0">
                    <tr v-for="event in eventsList" :key="event._id" :class="{'table-info': authUser._id == event.creator._id}">
                        <td>
                            <i v-if="authUser._id == event.creator._id" class="icon-copy fi-star mr-2"></i>
                            {{ event._id }}
                        </td>
                        <td>{{ event.title }}</td>
                        <td>{{ event.date | formatISOString }}</td>
                        <td>Rs. {{ event.price }}</td>
                        <td>{{ event.creator.email }}</td>
                        <td>
                            <button 
                                class="btn btn-info"                 
                                data-toggle="modal"
                                :data-target="`#${showEventModalId}`"
                                @click="focusedEvent = event"
                            >   
                                Show
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" style="text-align: center">No events found.</td>
                    </tr>
                </tbody>
            </table>
        </pageBody>

        <addEvent
            :addEventModalId="addEventModalId"
            @eventAdded="appendAddedEvent"
        />
        <eventItem
            :showEventModalId="showEventModalId"
            :event="focusedEvent"
            @eventDeleted="removeDeletedEvent"
        />
    </div>
</template>

<script>
import pageHeader from "../../components/resuable/pages_component/pageHeader";
import pageBody from "../../components/resuable/pages_component/pageBody";
import addEvent from "./AddEvent";
import eventItem from "./EventItem";
import { mapGetters } from 'vuex'

export default {
    name: "Events",

    components: { pageHeader, pageBody, addEvent, eventItem },

    created() {
        this.fetchEvents();
    },

    computed: {
        ...mapGetters(['authUser'])
    },

    data() {
        return {
            addEventModalId: "addEventModal",
            showEventModalId: "showEventModal",

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

            focusedEvent: {
                _id: '',
                title: '',
                price: '',
                date: '',
                description: '',
                creator: {
                    _id: '',
                    email: ''
                }

            }
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

        removeDeletedEvent: function(deletedEvent) {
            console.log(11111111111111)
            // removing booking from the list
            var eventIndex = this.eventsList.findIndex((item) => { return item._id == deletedEvent._id })
            if (eventIndex !== -1) this.eventsList.splice(eventIndex, 1);
        }
    },
};
</script>
