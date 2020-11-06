<template>
    <div class="bookings">
        <pageHeader :breadcrumbs="Breadcrumbs">
            <h4 slot="title">All Bookings</h4>
            <button slot="rightSection" class="btn btn-primary" @click="$router.push('/events')">Book event</button>
        </pageHeader>

        <pageBody>
            <div slot="body" class="clearfix mb-20">
                <div class="pull-left">
                    <p>List of all of your bookings.</p>
                </div>
            </div>
            <table slot="body" class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Event</th>
                        <th scope="col">Booked At</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-if="bookingsList.length > 0">
                    <tr v-for="booking in bookingsList" :key="booking._id">
                        <td>{{ booking._id }}</td>
                        <td>{{ booking.event.title }}</td>
                        <td>{{ booking.createdAt }}</td>
                        <td>
                            <button class="btn btn-danger" @click="cancelBooking(booking)">Cancel</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" style="text-align: center">No bookings found.</td>
                    </tr>
                </tbody>
            </table>
        </pageBody>

    </div>
</template>

<script>
import pageHeader from "../../components/resuable/pages_component/pageHeader";
import pageBody from "../../components/resuable/pages_component/pageBody";

export default {
    name: "Bookings",

    components: { pageHeader, pageBody },

    created() {
        this.fetchBookings();
    },

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
                ],
            },

            bookingsList: [],

            isLoading: false,
        };
    },

    methods: {
        fetchBookings: function () {
            const requestBody = {
                query: `
                  query {
                    bookings {
                      _id, event {title}, createdAt, updatedAt
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
                    const bookingsList = res.data.data.bookings;
                    this.bookingsList = bookingsList;
                })
                .catch((err) => {
                    const errorMessage = err.response.data.errors[0].message;

                    // generating error message.
                    this.$Toast.fire({
                        icon: "error",
                        title: "Failed to fetch your bookings.",
                    });

                    console.log(errorMessage);
                });
        },

        cancelBooking: function(booking) {
            this.isLoading = true;

            const requestBody = {
                query: `
                    mutation {
                        cancelBooking (bookingId: "${booking._id}") {
                            _id
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
                .then(() => {
                    // removing booking from the list
                    var bookingIndex = this.bookingsList.findIndex((item) => { return item._id == booking._id })
                    if (bookingIndex !== -1) this.bookingsList.splice(bookingIndex, 1);
                    
                    // generating success message.
                    this.$Toast.fire({
                        icon: "success",
                        title: "Booking cancelled.",
                    });

                    this.isLoading = false
                })
                .catch((err) => {
                    const errorMessage = err.response.data.errors[0].message;

                    // generating error message.
                    this.$Toast.fire({
                        icon: "error",
                        title: "Failed to cancel booking.",
                    });

                    console.log(errorMessage);
                    this.isLoading = false
                });
        }
    },
};
</script>
