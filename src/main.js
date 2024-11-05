import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

library.add(fas);


const app = createApp(App)

app.use(router)

app.mount('#app')

// Register FontAwesomeIcon as a global component
app.component('font-awesome-icon', FontAwesomeIcon);

