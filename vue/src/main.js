import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Swal from 'sweetalert2';
import VueProgressBar from 'vue-progressbar';

// Vue progressbar
const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300,
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
};
Vue.use(VueProgressBar, options);

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
