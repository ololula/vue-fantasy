import Vue from 'vue';
import Players from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
import { globalVue } from './services/global';

Vue.config.productionTip = false;
Vue.use(VueToast);

// Global Vue mixin
Vue.mixin(globalVue());

new Vue({
	router,
	store,
	vuetify,
	render: h => h(Players)
}).$mount('#app');
