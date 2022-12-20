import { createApp } from 'vue';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import './style.css';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(BootstrapVue3);
app.component('Pagination',Bootstrap5Pagination);

app.mixin({
    methods:{
        capitalEachWord: (word) => {
            word = word.split(" ");

            for (var i = 0, x = word.length; i < x; i++) {
                word[i] = word[i][0].toUpperCase() + word[i].substr(1);
            }

            return word.join(" ");
        },
        formatDate(string){
            const date = new Date(string);
            return date.toLocaleDateString('id-ID', { year: "numeric", month: "long", day: "numeric" });
        }
    }
});

app.mount('#app');
