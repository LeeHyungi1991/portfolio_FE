import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import './assets/style.css';

import VueSimpleMarkdown from 'vue-simple-markdown';
import 'vue-simple-markdown/dist/vue-simple-markdown.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueLayers from 'vuelayers';
import {SelectInteraction} from 'vuelayers';
import 'vuelayers/dist/vuelayers.css'
import caxios from "@/common/common";
import vuetimeline from "@growthbunker/vuetimeline"

Vue.use(vuetimeline)
Vue.use(caxios);
Vue.use(SelectInteraction);
Vue.use(VueLayers);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleMarkdown);
library.add(faLongArrowAltRight);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
