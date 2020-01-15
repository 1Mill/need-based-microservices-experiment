const { Kafka } = require('kafkajs')

const kafka = new Kafka({
        brokers: [ 'rapids:29092' ],
        clientId: 'my-consumer-app-name',
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
        setTimeout(() => {}, 1000)

        console.info('connecting...')
        await consumer.connect()
        console.info('connected')

        console.info('topic receiving...')
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
        console.info('topic received')

        console.info('starting logic...')
        await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                        console.log({
                                offset: message.offset,
                                partition,
                                topic,
                                value: message.value.toString(),
                        })
                },
        })
        console.info('finished logic')
}

run()
        .catch(err => console.error(err))
        .finally(() => { 
                console.log('closing')
                process.exit(0)
        })