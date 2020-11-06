import Vue from 'vue';
import moment from 'moment'

Vue.filter('formatISOString', (value) => {
    if (!value) {
        return value
    }
  
    return moment(value).format('MMMM Do, YYYY @ h:mm a')
});
