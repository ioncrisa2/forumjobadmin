import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

const app = createApp(App);
app.use(router);
app.use(store);

app.mixin({
    methods:{
        capitalEachWord: (word) => {
            word = word.split(" ");

            for (var i = 0, x = word.length; i < x; i++) {
                word[i] = word[i][0].toUpperCase() + word[i].substr(1);
            }

            return word.join(" ");
        }
    }
});

app.mount('#app');
