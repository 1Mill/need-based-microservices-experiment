const { Kafka } = require('kafkajs')
const { TOPICS } = require('./lib/topics')

const main = async () => {
        try {
                const kafka = new Kafka({
                        brokers: [ 'core_rapids:29092' ],
                })
                const admin = kafka.admin()
                await admin.connect()
                await admin.createTopics({ topics: TOPICS })
                await admin.disconnect()

                const consumer = kafka.consumer({ groupId: 'example-service' })
                await consumer.connect()
                const subscriberTopics = TOPICS.map(topic => ({ fromBeginning: true, topic }))
                await consumer.subscribe(subscriberTopics)
                await consumer.run({
                        eachMessage: async ({ topic, partition, message }) => {
                                const content = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                                console.log(content)
                        }
                })
        } catch(err) {
                console.error(err)
        }
}

main()
