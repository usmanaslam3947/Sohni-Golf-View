import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router/routes'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(routes)
app.use(VueAxios,axios)
app.mount('#app')


import "bootstrap/dist/js/bootstrap.js"
