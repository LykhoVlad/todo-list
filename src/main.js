import Vue from 'vue'
import App from './App.vue'
import {store} from './store'
import { MdField, MdCheckbox, MdIcon, MdTabs, MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.config.productionTip = false;

Vue.use(MdField);
Vue.use(MdCheckbox);
Vue.use(MdIcon);
Vue.use(MdTabs);
Vue.use(MdButton);

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
