import { createApp } from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery'

const app = createApp(App);
app.use($)
app.use(router)
app.mount('#app');
