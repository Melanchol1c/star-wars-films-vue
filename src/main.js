import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import velocity from 'velocity-animate';
import store from './store/store';
import router from './router';
import App from './App';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'nprogress/nprogress.css';

import firebaseConfig from '../firebase-app.config';
import { dateFilter } from './filters';
import './styles.scss';

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(Notifications, { velocity });
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
