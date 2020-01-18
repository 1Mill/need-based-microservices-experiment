const { Kafka } = require('kafkajs')

const run = async () => {
        try {
                const kafka = new Kafka({
                        brokers: ['core_rapids:29092'],
                        clientId: 'my-example-app',
                })
                const admin = kafka.admin()
                await admin.connect()                
                await admin.createTopics({
                        topics: [
                                { topic: 'users', numPartitions: 2 },
                        ],
                })
                await admin.disconnect()
        } catch (err) {
                console.error(err)
        } finally {
                process.exit(0);
        }
}

run();