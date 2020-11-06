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
        </modal>
    </div>
</template>

<script>
import modal from "../../components/resuable/modals/modal";
export default {
    name: "EventItem",

    props: ["showEventModalId", "event"],

    components: { modal },
};
</script>

