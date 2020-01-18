const { Kafka } = require('kafkajs')

const run = async () => {
        try {
                const kafka = new Kafka({
                        brokers: ['core_rapids:29092'],
                        clientId: 'my-example-app',
                })
                const consumer = kafka.consumer({ groupId: 'test-group' })
                await consumer.connect()

                await consumer.subscribe({
                        topic: 'users',
                        fromBeginning: true, // * Read everything new that has not yet been processes
                })

                await consumer.run({
                        eachMessage: async ({ topic, partition, message }) => {
                                console.log("Recieved message ", `${message.value}`, " on partition ", partition)
                        }
                })
        } catch (err) {
                console.error(err)
        } finally {
                
        }
}

run();