<template>
	<main>
		<h1>Hello world!</h1>
		<v-btn @click="createTodo()">
			Create todo
		</v-btn>
	</main>
</template>

<script>
import { Ask } from '@/lib/events';

export default {
	methods: {
		createTodo() {
			console.log('Creating todo...');
			Ask('testing');
		},
	},
}
</script>
