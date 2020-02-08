<template>
	<article>
		<h1>Hello world!</h1>
		<br/>
		<v-btn @click="produceTopic">
			Produce topic
		</v-btn>
	</article>
</template>

<script>
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
	brokers: ['core_rapids:29092'],
	clientId: 'client_web',
})

export default {
	methods: {
		async produceTopic() {
			const producer = kafka.producer()
			await producer.connect()
			await producer.send({
				topic: 'db.todo.created'
			})
			await producer.disconnect()
		},
	},
}
</script>
