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
		await admin.createTopics({ topics: TOPICS.map(topic => ({ topic })) })
		await admin.disconnect()

		const consumer = kafka.consumer({ groupId: 'example-serivce' })
		await consumer.connect()
		TOPICS.forEach(async (topic) => {
			await consumer.subscribe({
				fromBeginning: true,
				topic,
			})
		})
		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const content = `${topic}[${partition} | ${message.offset}] / ${message.timestamp} - from ${message.headers.socketId}`
				console.log(content)
			}
		})
	} catch(err) {
		console.error(err)
	}
}

main()
