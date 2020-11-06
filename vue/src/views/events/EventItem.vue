<template>
    <div class="eventItem">
        <modal :modalId="showEventModalId">
            <h4 slot="header">Event Details</h4>

            <div slot="body" class="pd-20 card-box height-100-p">

                <div class="profile-info">                    
                    <ul>
                        <li>
                            <span>Title</span>
                            {{event.title}}
                        </li>
                        <li>
                            <span>Description</span>
                            {{event.description}}
                        </li>
                        <li>
                            <span>Price</span>
                            Rs. {{event.price}}
                        </li>
                        <li>
                            <span>Date</span>
                            {{event.date}}
                        </li>
                        <li>
                            <span>Creator</span>
                            {{event.creator.email}}
                        </li>
                    </ul>
                </div>
                
            </div>

            <button v-if="event.creator._id != authUser._id"  @click="bookEvent" :disabled="isLoading" slot="footer" class="btn btn-primary">Book</button>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import modal from "../../components/resuable/modals/modal";
export default {
    name: "EventItem",

    props: ["showEventModalId", "event"],

    components: { modal },

    computed: {
        ...mapGetters(['authUser'])
    },

    data() {
        return {
            isLoading: false
        }
    },

    methods: {
        bookEvent() {
            this.isLoading = true

            const requestUrl = "http://localhost:3000/graphql";
            const requestBody = {
                query: `
                    mutation {
                        bookEvent(eventId: "${this.event._id}") {
                            _id
                        }
                    }
                `,
            };

            this.$axios({
                url: requestUrl,
                data: requestBody,
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                // emitting the newely added event.
                const booking = res.data.data.bookEvent
                console.log(booking)

                // generating success notification.
                this.$Toast.fire({
                    icon: "success",
                    title: "Event bookied.",
                });

                this.isLoading = false
            })
            .catch((err) => {
                const errorMessage = err.response.data.errors[0].message;

                // generating error notification.
                this.$Toast.fire({
                    icon: "error",
                    title: "Event could not be booked.",
                });
                
                console.log(errorMessage);

                this.isLoading = false
            });
        }
    }
};
</script>

