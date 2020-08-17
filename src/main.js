import Vue from 'vue';
import App from './App.vue';
import { string1, string2 } from './file1';
import alertFunc from './file2';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertFunc(string1);
alertFunc(string2);
