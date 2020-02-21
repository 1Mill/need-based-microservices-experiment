<template>
	<main>
		<h1>Hello world!</h1>
		<v-btn @click="createTodo()">
			Create todo
		</v-btn>
	</main>
</template>

<script>
import io from 'socket.io-client';

const SOCKET = io(process.env.CLIENT_PUB_URL);

export default {
	methods: {
		createTodo() {
			console.log('Creating todo...');
			SOCKET.emit('testing');
		},
	},
}
</script>
