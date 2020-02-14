import Vue from 'vue'

const createApp = (context) => {
	return new Vue({
		data: { url: context.url },
		template: `<div>The visisted URL is: {{ url }}</div>`,
	})
}

export default createApp
