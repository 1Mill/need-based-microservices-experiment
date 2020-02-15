<template>
	<main>
		<h1>Hello world!</h1>
		<v-btn @click="createTodo()">
			Create todo
		</v-btn>
	</main>
</template>

<script>
export default {
	methods: {
		async createTodo() {
			console.log("Creating...")
		},
	},
}
</script>
