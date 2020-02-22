const { Kafka } = require('kafkajs')
const { TOPICS } = require('./lib/topics')

const main = async () => {
	try {
		const kafka = new Kafka({
			brokers: [ 'core_rapids:29092' ],
			clientId: 'exmaple-service-hydrator',
		})
		const admin = kafka.admin()
		await admin.connect()
		await admin.createTopics({ topics: [ { topic: 'db.todo.created' } ] })
		await admin.disconnect()

		const consumer = kafka.consumer({ groupId: 'example-service' })
		await consumer.connect()
		await consumer.subscribe({
			fromBeginning: true,
			topic: 'db.todo.created',
		})
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const content = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
				console.log(content)
			}
		})
	} catch(err) {
		console.log("ERROR");
		console.error(err)
	}
}

main()
