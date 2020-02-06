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
        } catch(err) {
                console.error(err)
        }
}

main()