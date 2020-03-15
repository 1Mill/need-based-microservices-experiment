<template>
	<main>
		<h1>Hello world!</h1>
		<v-btn @click="ask">
			Ask a question
		</v-btn>
	</main>
</template>

<script>
import { ask } from '@/lib/ask';

export default {
	methods: {
		async ask() {
			console.log('Asking a question...');
			const address = await ask('contact.address');
			console.log(address);
		},
	},
};
</script>
