<template>
    <div class="addEvent">
        <modal :modalId="addEventModalId">
            <h4 slot="header">Add Event</h4>

            <form
                slot="body"
                @submit.prevent="createEvent()"
                id="createEventForm"
            >
                <div class="form-group row">
                    <label class="col-sm-12 col-md-2 col-form-label"
                        >Title</label
                    >
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
                    <label class="col-sm-12 col-md-2 col-form-label"
                        >Description</label
                    >
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
                    <label class="col-sm-12 col-md-2 col-form-label"
                        >Price</label
                    >
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
                    <label class="col-sm-12 col-md-2 col-form-label"
                        >Date</label
                    >
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
            <button
                slot="footer"
                class="btn btn-primary"
                @click="createEvent()"
            >
                Create
            </button>
        </modal>
    </div>
</template>


<script>
import modal from "../../components/resuable/modals/modal";
export default {
    name: "AddEvent",

    props: ["addEventModalId"],

    components: { modal },

    data() {
        return {
            newEvent: {
                title: "",
                description: "",
                price: "",
                date: "",
            },
        };
    },

    methods: {
        resetForm: function () {
            this.newEvent.title = "";
            this.newEvent.description = "";
            this.newEvent.price = "";
            this.newEvent.date = "";
        },

        createEvent: function () {
            const requestUrl = "http://localhost:3000/graphql";
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
                url: requestUrl,
                data: requestBody,
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                const addedEvent = res.data.data.createEvent;

                // emitting the newely added event.
                this.$emit("eventAdded", addedEvent);

                // generating success notification.
                this.$Toast.fire({
                    icon: "success",
                    title: "Event added.",
                });

                this.resetForm();
            })
            .catch((err) => {
                const errorMessage = err.response.data.errors[0].message;

                // generating error notification.
                this.$Toast.fire({
                    icon: "error",
                    title: "Event could not be added.",
                });
                
                console.log(errorMessage);
            });
        },
    },
};
</script>

