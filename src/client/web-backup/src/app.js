import Vue from 'vue'
import App from './app.vue'

const createApp = () => {
	return new Vue({
		render: h => h(App),
	})
}

export default createApp
