import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';

import './assets/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Quasar, {
  config: {},
});

app.mount('#app');
