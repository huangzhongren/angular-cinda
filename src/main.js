import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
Vue.prototype.ajax = axios
Vue.prototype.qs = qs
Vue.prototype.getImgCodeUrl = function(str){
	var str = str.replace(/\?\.+/,'')
	return str+"?"+Math.random().toFixed(3);
}
Vue.prototype.compare = function(property){//定义一个比较器
	return function(object1, object2) {
		var value1 = object1[property];
		var value2 = object2[property];
		if (value2 < value1) {
			return 1;
		}else if (value2 > value1) {
			return -1;
		} else {
			return 0;
		}
    }
}