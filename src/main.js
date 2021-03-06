import Vue from 'vue';
import App from './App';
import store from './store';

import './main.less';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});
