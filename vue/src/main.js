import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Swal from 'sweetalert2';

// setting up default sweetalert swal and toast configuration.
Vue.prototype.$Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});
Vue.prototype.$Toast = Toast;

// setting up default headers for axios.
Vue.prototype.$axios = axios;
if (localStorage.getItem('token')) {
    Vue.prototype.$axios.defaults.headers.common = {
        Authorization: localStorage.getItem('token'),
    };
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
