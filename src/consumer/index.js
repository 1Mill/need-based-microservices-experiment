const { Kafka } = require('kafkajs')

const kafka = new Kafka({
        brokers: [ 'rapids:29092' ],
        clientId: 'my-producer-app-name',
})

const producer = kafka.producer({ groupId: 'test-group' })

const run = async () => {
        console.info('connecting...')
        await producer.connect()
        console.info('connected')

        console.info('topic receiving...')
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
        console.info('topic received')
}

run()
        .catch(err => console.error(err))
        .finally(() => { 
                console.log('closing')
                process.exit(0)
        })