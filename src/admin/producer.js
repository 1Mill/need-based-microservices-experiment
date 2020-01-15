const { Kafka } = require('kafkajs')

const value = process.argv[2] // * node producer.js this-name-will-be-used
const partition = value[0] < 'N' ? 0 : 1

const run = async () => {
        try {
                const kafka = new Kafka({
                        brokers: ['rapids:29092'],
                        clientId: 'my-example-app',
                })
                const producer = kafka.producer()
                await producer.connect()

                const response = await producer.send({
                        topic: 'users',
                        messages: [
                                { partition, value },
                        ],
                })
                console.log('Created successfully: ', response)
                
                await producer.disconnect()
        } catch (err) {
                console.error(err)
        } finally {
                process.exit(0);
        }
}

run();