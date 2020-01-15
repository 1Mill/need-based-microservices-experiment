const { Kafka } = require('kafkajs');

const kafka = new Kafka({
        brokers: [ 'rapids:29092' ],
        clientId: 'my-producer-app-name',
});

const producer = kafka.producer();

const run = async () => {
        console.info('connecting...');
        await producer.connect()
        console.info('connected');

        console.info('topic sending...');
        await producer.send({
                topic: 'test-topic',
                messages: [
                        { value: 'Hello KafkaJS user!' },
                ],
        });
        console.info('topic sent');
}

run()
        .catch(err => console.error(err))
        .finally(() => { 
                console.log('closing');
                process.exit(0);
        });