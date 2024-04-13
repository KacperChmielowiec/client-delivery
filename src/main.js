import './assets/main.css'
import axios from "axios";
import VueAxios from "vue-axios";
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(VueAxios, axios);
app.axios.defaults.baseURL = import.meta.env.VITE_APP_DELIVERY_API_BASE;


app.mount('#app')
