import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupCalendar } from '@angelblanco/v-calendar';
import './index.css'

const pinia = createPinia()
const app = createApp(App);

app.use(setupCalendar, {});
app.use(pinia);
app.mount('#app');